package com.docmanagement.service.impl;

import com.docmanagement.dto.DocumentDto;
import com.docmanagement.entity.Document;
import com.docmanagement.entity.Document.DocumentStatus;
import com.docmanagement.entity.Notification;
import com.docmanagement.entity.Notification.NotificationType;
import com.docmanagement.repository.DocumentRepository;
import com.docmanagement.repository.NotificationRepository;
import com.docmanagement.service.DocumentService;
import com.docmanagement.service.NotificationPublisherService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final NotificationRepository notificationRepository;
    private final NotificationPublisherService notificationPublisher;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    public DocumentServiceImpl(DocumentRepository documentRepository,
                               NotificationRepository notificationRepository,
                               NotificationPublisherService notificationPublisher) {
        this.documentRepository = documentRepository;
        this.notificationRepository = notificationRepository;
        this.notificationPublisher = notificationPublisher;
    }

    @Override
    public List<DocumentDto> getAllDocuments() {
        return documentRepository.findAll().stream().map(this::toDto).toList();
    }

    @Override
    public DocumentDto getDocumentById(Long id) {
        return toDto(findById(id));
    }

    @Override
    public DocumentDto updateDocumentStatus(Long id, DocumentStatus status) {
        Document document = findById(id);
        document.setStatus(status);
        return toDto(documentRepository.save(document));
    }

    @Override
    public void deleteDocument(Long id) {
        Document document = findById(id);
        documentRepository.deleteById(id);
        saveNotification("Document deleted: " + document.getFileName(), NotificationType.INFO);
    }

    @Override
    public DocumentDto uploadDocument(MultipartFile file) {
        validatePdf(file);
        DocumentDto dto = toDto(saveFile(file));
        saveNotification("Document uploaded: " + dto.getFileName(), NotificationType.SUCCESS);
        return dto;
    }

    @Override
    public List<DocumentDto> uploadMultipleDocuments(List<MultipartFile> files) {
        files.forEach(this::validatePdf);
        List<DocumentDto> uploaded = files.stream().map(this::saveFile).map(this::toDto).toList();
        saveNotification(uploaded.size() + " document(s) uploaded successfully", NotificationType.SUCCESS);
        return uploaded;
    }

    @Override
    public Resource downloadDocument(Long id) {
        Document document = findById(id);
        try {
            Path filePath = Paths.get(document.getFilePath()).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new EntityNotFoundException("File not found for document id: " + id);
            }
            return resource;
        } catch (IOException e) {
            throw new RuntimeException("Could not read file for document id: " + id, e);
        }
    }

    private void saveNotification(String message, NotificationType type) {
        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setType(type);
        notification.setTimestamp(LocalDateTime.now());
        notification.setReadStatus(false);
        notificationRepository.save(notification);
        notificationPublisher.publish(message, type);
    }

    private void validatePdf(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        String contentType = file.getContentType();
        if (contentType == null || !contentType.equals("application/pdf")) {
            throw new IllegalArgumentException("Only PDF files are allowed");
        }
    }

    private Document saveFile(MultipartFile file) {
        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            String originalName = Paths.get(file.getOriginalFilename()).getFileName().toString();
            String storedName = UUID.randomUUID() + "_" + originalName;
            Path filePath = uploadPath.resolve(storedName).normalize();
            if (!filePath.startsWith(uploadPath)) {
                throw new IllegalArgumentException("Invalid file path");
            }
            Files.copy(file.getInputStream(), filePath);

            Document doc = new Document();
            doc.setFileName(file.getOriginalFilename());
            doc.setFileSize(file.getSize());
            doc.setFileType(file.getContentType());
            doc.setUploadDate(LocalDateTime.now());
            doc.setStatus(DocumentStatus.PENDING);
            doc.setFilePath(filePath.toString());
            return documentRepository.save(doc);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + file.getOriginalFilename(), e);
        }
    }

    private Document findById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Document not found with id: " + id));
    }

    private DocumentDto toDto(Document doc) {
        DocumentDto dto = new DocumentDto();
        dto.setId(doc.getId());
        dto.setFileName(doc.getFileName());
        dto.setFileSize(doc.getFileSize());
        dto.setFileType(doc.getFileType());
        dto.setUploadDate(doc.getUploadDate());
        dto.setStatus(doc.getStatus());
        dto.setFilePath(doc.getFilePath());
        return dto;
    }
}

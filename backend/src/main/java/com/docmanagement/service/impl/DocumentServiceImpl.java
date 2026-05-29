package com.docmanagement.service.impl;

import com.docmanagement.dto.DocumentDto;
import com.docmanagement.entity.Document;
import com.docmanagement.entity.Document.DocumentStatus;
import com.docmanagement.repository.DocumentRepository;
import com.docmanagement.service.DocumentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
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

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

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
        documentRepository.deleteById(id);
    }

    @Override
    public DocumentDto uploadDocument(MultipartFile file) {
        validatePdf(file);
        return toDto(saveFile(file));
    }

    @Override
    public List<DocumentDto> uploadMultipleDocuments(List<MultipartFile> files) {
        files.forEach(this::validatePdf);
        return files.stream().map(this::saveFile).map(this::toDto).toList();
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
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            String storedName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(storedName);
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

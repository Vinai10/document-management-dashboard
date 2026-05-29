package com.docmanagement.service.impl;

import com.docmanagement.dto.DocumentDto;
import com.docmanagement.entity.Document;
import com.docmanagement.entity.Document.DocumentStatus;
import com.docmanagement.repository.DocumentRepository;
import com.docmanagement.service.DocumentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;

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

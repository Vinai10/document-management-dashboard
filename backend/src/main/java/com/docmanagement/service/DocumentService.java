package com.docmanagement.service;

import com.docmanagement.dto.DocumentDto;
import com.docmanagement.entity.Document.DocumentStatus;
import java.util.List;

public interface DocumentService {
    List<DocumentDto> getAllDocuments();
    DocumentDto getDocumentById(Long id);
    DocumentDto updateDocumentStatus(Long id, DocumentStatus status);
    void deleteDocument(Long id);
}

package com.docmanagement.repository;

import com.docmanagement.entity.Document;
import com.docmanagement.entity.Document.DocumentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByStatus(DocumentStatus status);
    List<Document> findByFileType(String fileType);
}

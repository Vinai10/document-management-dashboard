package com.docmanagement.repository;

import com.docmanagement.entity.Document;
import com.docmanagement.entity.Document.DocumentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByStatus(DocumentStatus status);
    List<Document> findByFileType(String fileType);
    long countByStatus(DocumentStatus status);

    @Query(value = "SELECT DATE_FORMAT(upload_date, '%b') AS month, COUNT(*) AS uploads " +
                    "FROM documents " +
                    "WHERE upload_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH) " +
                    "GROUP BY DATE_FORMAT(upload_date, '%Y-%m'), DATE_FORMAT(upload_date, '%b') " +
                    "ORDER BY MIN(upload_date)",
           nativeQuery = true)
    List<Object[]> countByYearMonth();
}

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

    @Query("SELECT FUNCTION('YEAR', d.uploadDate), FUNCTION('MONTH', d.uploadDate), COUNT(d) " +
           "FROM Document d GROUP BY FUNCTION('YEAR', d.uploadDate), FUNCTION('MONTH', d.uploadDate) " +
           "ORDER BY FUNCTION('YEAR', d.uploadDate), FUNCTION('MONTH', d.uploadDate)")
    List<Object[]> countByYearMonth();
}

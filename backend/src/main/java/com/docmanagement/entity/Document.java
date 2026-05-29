package com.docmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Data
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fileName;

    private Long fileSize;

    private String fileType;

    @Column(nullable = false)
    private LocalDateTime uploadDate;

    @Enumerated(EnumType.STRING)
    private DocumentStatus status;

    private String filePath;

    public enum DocumentStatus {
        PENDING, APPROVED, REJECTED, ARCHIVED
    }
}

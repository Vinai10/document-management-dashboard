package com.docmanagement.dto;

import com.docmanagement.entity.Document.DocumentStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DocumentDto {
    private Long id;
    private String fileName;
    private Long fileSize;
    private String fileType;
    private LocalDateTime uploadDate;
    private DocumentStatus status;
    private String filePath;
}

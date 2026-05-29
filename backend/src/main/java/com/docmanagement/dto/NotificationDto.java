package com.docmanagement.dto;

import com.docmanagement.entity.Notification.NotificationType;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NotificationDto {
    private Long id;
    private String message;
    private NotificationType type;
    private LocalDateTime timestamp;
    private boolean readStatus;
}

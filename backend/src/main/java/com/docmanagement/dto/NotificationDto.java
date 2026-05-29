package com.docmanagement.dto;

import com.docmanagement.entity.Notification.NotificationType;
import java.time.LocalDateTime;

public class NotificationDto {
    private Long id;
    private String message;
    private NotificationType type;
    private LocalDateTime timestamp;
    private boolean readStatus;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public NotificationType getType() { return type; }
    public void setType(NotificationType type) { this.type = type; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public boolean isReadStatus() { return readStatus; }
    public void setReadStatus(boolean readStatus) { this.readStatus = readStatus; }
}

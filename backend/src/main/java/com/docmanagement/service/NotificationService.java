package com.docmanagement.service;

import com.docmanagement.dto.NotificationDto;
import java.util.List;

public interface NotificationService {
    List<NotificationDto> getAllNotifications();
    List<NotificationDto> getUnreadNotifications();
    NotificationDto markAsRead(Long id);
    void markAllAsRead();
    void createNotification(String message, com.docmanagement.entity.Notification.NotificationType type);
}

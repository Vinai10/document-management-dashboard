package com.docmanagement.service;

import com.docmanagement.dto.NotificationDto;
import java.util.List;

public interface NotificationService {
    List<NotificationDto> getAllNotifications();
    List<NotificationDto> getUnreadNotifications();
    NotificationDto markAsRead(Long id);
    void markAllAsRead();
}

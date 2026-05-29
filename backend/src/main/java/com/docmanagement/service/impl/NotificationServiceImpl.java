package com.docmanagement.service.impl;

import com.docmanagement.dto.NotificationDto;
import com.docmanagement.entity.Notification;
import com.docmanagement.repository.NotificationRepository;
import com.docmanagement.service.NotificationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public List<NotificationDto> getAllNotifications() {
        return notificationRepository.findAll().stream().map(this::toDto).toList();
    }

    @Override
    public List<NotificationDto> getUnreadNotifications() {
        return notificationRepository.findByReadStatus(false).stream().map(this::toDto).toList();
    }

    @Override
    public NotificationDto markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found with id: " + id));
        notification.setReadStatus(true);
        return toDto(notificationRepository.save(notification));
    }

    @Override
    public void markAllAsRead() {
        List<Notification> unread = notificationRepository.findByReadStatus(false);
        unread.forEach(n -> n.setReadStatus(true));
        notificationRepository.saveAll(unread);
    }

    private NotificationDto toDto(Notification n) {
        NotificationDto dto = new NotificationDto();
        dto.setId(n.getId());
        dto.setMessage(n.getMessage());
        dto.setType(n.getType());
        dto.setTimestamp(n.getTimestamp());
        dto.setReadStatus(n.isReadStatus());
        return dto;
    }
}

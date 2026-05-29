package com.docmanagement.service;

import com.docmanagement.dto.NotificationDto;
import com.docmanagement.entity.Notification.NotificationType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class NotificationPublisherService {

    private static final String TOPIC = "/topic/notifications";

    private final SimpMessagingTemplate messagingTemplate;

    public NotificationPublisherService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void publish(String message, NotificationType type) {
        NotificationDto dto = new NotificationDto();
        dto.setMessage(message);
        dto.setType(type);
        dto.setTimestamp(LocalDateTime.now());
        dto.setReadStatus(false);
        messagingTemplate.convertAndSend(TOPIC, dto);
    }
}

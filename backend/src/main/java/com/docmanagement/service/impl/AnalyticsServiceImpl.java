package com.docmanagement.service.impl;

import com.docmanagement.dto.AnalyticsDto;
import com.docmanagement.dto.AnalyticsDto.MonthlyUploadDto;
import com.docmanagement.dto.AnalyticsDto.StatusCountDto;
import com.docmanagement.entity.Document.DocumentStatus;
import com.docmanagement.repository.DocumentRepository;
import com.docmanagement.repository.NotificationRepository;
import com.docmanagement.service.AnalyticsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Service
@Transactional(readOnly = true)
public class AnalyticsServiceImpl implements AnalyticsService {

    private final DocumentRepository documentRepository;
    private final NotificationRepository notificationRepository;

    public AnalyticsServiceImpl(DocumentRepository documentRepository,
                                NotificationRepository notificationRepository) {
        this.documentRepository = documentRepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public AnalyticsDto getAnalytics() {
        AnalyticsDto dto = new AnalyticsDto();

        dto.setTotalDocuments(documentRepository.count());
        dto.setApprovedDocuments(documentRepository.countByStatus(DocumentStatus.APPROVED));
        dto.setPendingDocuments(documentRepository.countByStatus(DocumentStatus.PENDING));
        dto.setRejectedDocuments(documentRepository.countByStatus(DocumentStatus.REJECTED));
        dto.setArchivedDocuments(documentRepository.countByStatus(DocumentStatus.ARCHIVED));
        dto.setTotalNotifications(notificationRepository.count());

        // Monthly uploads — native query returns [String month, Long uploads]
        List<Object[]> rows = documentRepository.countByYearMonth();
        List<MonthlyUploadDto> monthly = rows.stream().map(row -> {
            String monthName = (String) row[0];
            long count = ((Number) row[1]).longValue();
            return new MonthlyUploadDto(monthName, count);
        }).toList();
        dto.setMonthlyUploads(monthly);

        // Status distribution
        List<StatusCountDto> distribution = Arrays.stream(DocumentStatus.values()).map(status ->
            new StatusCountDto(status.name(), documentRepository.countByStatus(status))
        ).toList();
        dto.setStatusDistribution(distribution);

        return dto;
    }
}

package com.docmanagement.dto;

import java.util.List;
import java.util.Map;

public class AnalyticsDto {

    private long totalDocuments;
    private long approvedDocuments;
    private long pendingDocuments;
    private long rejectedDocuments;
    private long archivedDocuments;
    private long totalNotifications;
    private List<MonthlyUploadDto> monthlyUploads;
    private List<StatusCountDto> statusDistribution;

    public long getTotalDocuments() { return totalDocuments; }
    public void setTotalDocuments(long totalDocuments) { this.totalDocuments = totalDocuments; }
    public long getApprovedDocuments() { return approvedDocuments; }
    public void setApprovedDocuments(long approvedDocuments) { this.approvedDocuments = approvedDocuments; }
    public long getPendingDocuments() { return pendingDocuments; }
    public void setPendingDocuments(long pendingDocuments) { this.pendingDocuments = pendingDocuments; }
    public long getRejectedDocuments() { return rejectedDocuments; }
    public void setRejectedDocuments(long rejectedDocuments) { this.rejectedDocuments = rejectedDocuments; }
    public long getArchivedDocuments() { return archivedDocuments; }
    public void setArchivedDocuments(long archivedDocuments) { this.archivedDocuments = archivedDocuments; }
    public long getTotalNotifications() { return totalNotifications; }
    public void setTotalNotifications(long totalNotifications) { this.totalNotifications = totalNotifications; }
    public List<MonthlyUploadDto> getMonthlyUploads() { return monthlyUploads; }
    public void setMonthlyUploads(List<MonthlyUploadDto> monthlyUploads) { this.monthlyUploads = monthlyUploads; }
    public List<StatusCountDto> getStatusDistribution() { return statusDistribution; }
    public void setStatusDistribution(List<StatusCountDto> statusDistribution) { this.statusDistribution = statusDistribution; }

    public static class MonthlyUploadDto {
        private String month;
        private long uploads;
        public MonthlyUploadDto(String month, long uploads) { this.month = month; this.uploads = uploads; }
        public String getMonth() { return month; }
        public long getUploads() { return uploads; }
    }

    public static class StatusCountDto {
        private String status;
        private long count;
        public StatusCountDto(String status, long count) { this.status = status; this.count = count; }
        public String getStatus() { return status; }
        public long getCount() { return count; }
    }
}

export const mockDocuments = [
  { id: 1, fileName: 'Q4_Financial_Report.pdf', fileSize: 2048000, fileType: 'application/pdf', uploadDate: '2024-11-01T09:00:00', status: 'APPROVED' },
  { id: 2, fileName: 'Employee_Handbook_2024.pdf', fileSize: 1536000, fileType: 'application/pdf', uploadDate: '2024-11-03T11:30:00', status: 'PENDING' },
  { id: 3, fileName: 'Project_Proposal_Alpha.pdf', fileSize: 3072000, fileType: 'application/pdf', uploadDate: '2024-11-05T14:00:00', status: 'APPROVED' },
  { id: 4, fileName: 'Legal_Contract_NDA.pdf', fileSize: 512000, fileType: 'application/pdf', uploadDate: '2024-11-07T08:45:00', status: 'REJECTED' },
  { id: 5, fileName: 'Marketing_Strategy_2025.pdf', fileSize: 4096000, fileType: 'application/pdf', uploadDate: '2024-11-10T16:20:00', status: 'PENDING' },
  { id: 6, fileName: 'IT_Infrastructure_Plan.pdf', fileSize: 2560000, fileType: 'application/pdf', uploadDate: '2024-11-12T10:00:00', status: 'APPROVED' },
  { id: 7, fileName: 'Compliance_Audit_2024.pdf', fileSize: 1024000, fileType: 'application/pdf', uploadDate: '2024-11-14T13:15:00', status: 'ARCHIVED' },
  { id: 8, fileName: 'Board_Meeting_Minutes.pdf', fileSize: 768000, fileType: 'application/pdf', uploadDate: '2024-11-15T09:30:00', status: 'APPROVED' },
];

export const mockNotifications = [
  { id: 1, message: 'Document "Q4_Financial_Report.pdf" uploaded successfully', type: 'SUCCESS', timestamp: '2024-11-15T09:05:00', readStatus: false },
  { id: 2, message: 'Document "Legal_Contract_NDA.pdf" was rejected', type: 'ERROR', timestamp: '2024-11-14T14:00:00', readStatus: false },
  { id: 3, message: '3 documents uploaded successfully', type: 'SUCCESS', timestamp: '2024-11-13T11:00:00', readStatus: true },
  { id: 4, message: 'Document "Compliance_Audit_2024.pdf" archived', type: 'INFO', timestamp: '2024-11-12T16:30:00', readStatus: true },
  { id: 5, message: 'Document "Marketing_Strategy_2025.pdf" is pending review', type: 'WARNING', timestamp: '2024-11-10T16:25:00', readStatus: false },
];

export const mockUploadTrend = [
  { month: 'Jun', uploads: 12 },
  { month: 'Jul', uploads: 19 },
  { month: 'Aug', uploads: 15 },
  { month: 'Sep', uploads: 27 },
  { month: 'Oct', uploads: 23 },
  { month: 'Nov', uploads: 31 },
];

export const mockStats = {
  total: 8,
  approved: 4,
  pending: 2,
  rejected: 1,
  archived: 1,
  unreadNotifications: 3,
};

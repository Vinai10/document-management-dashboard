import { useState } from 'react';
import { Box, Typography, Alert, Snackbar } from '@mui/material';
import DocumentTable from '../../components/DocumentTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import { mockDocuments } from '../../services/mockData';

export default function Documents() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const handleDelete = (doc) => setDeleteTarget(doc);

  const confirmDelete = () => {
    setDocuments((prev) => prev.filter((d) => d.id !== deleteTarget.id));
    setSnackbar({ severity: 'success', message: `"${deleteTarget.fileName}" deleted.` });
    setDeleteTarget(null);
  };

  const handleDownload = (doc) => {
    // Mock download — will be replaced with real API call
    setSnackbar({ severity: 'info', message: `Downloading "${doc.fileName}"...` });
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5">Documents</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Manage and review all uploaded documents.
        </Typography>
      </Box>

      <DocumentTable documents={documents} onDelete={handleDelete} onDownload={handleDownload} />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Document"
        message={`Are you sure you want to delete "${deleteTarget?.fileName}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={4000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar?.severity} onClose={() => setSnackbar(null)} sx={{ borderRadius: 2 }}>
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

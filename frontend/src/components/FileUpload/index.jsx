import { useCallback, useState } from 'react';
import { Box, Typography, LinearProgress, Alert, List, ListItem,
  ListItemIcon, ListItemText, IconButton, Button, Paper } from '@mui/material';
import { CloudUpload, PictureAsPdf, Close, CheckCircle } from '@mui/icons-material';
import { formatFileSize } from '../../utils/dateUtils';

export default function FileUpload({ onUpload, multiple = false }) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const addFiles = (incoming) => {
    const pdfs = Array.from(incoming).filter((f) => f.type === 'application/pdf');
    if (pdfs.length !== incoming.length) {
      setResult({ type: 'error', message: 'Only PDF files are accepted.' });
    }
    setFiles((prev) => (multiple ? [...prev, ...pdfs] : pdfs.slice(0, 1)));
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }, [multiple]);

  const removeFile = (index) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true);
    setProgress(0);
    setResult(null);
    try {
      // Simulate progress for mock mode
      for (let i = 10; i <= 90; i += 20) {
        await new Promise((r) => setTimeout(r, 200));
        setProgress(i);
      }
      await onUpload?.(multiple ? files : files[0]);
      setProgress(100);
      setResult({ type: 'success', message: `${files.length} file(s) uploaded successfully.` });
      setFiles([]);
    } catch (err) {
      setResult({ type: 'error', message: err.message || 'Upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      {/* Drop Zone */}
      <Paper
        variant="outlined"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        sx={{
          border: '2px dashed',
          borderColor: dragging ? 'primary.main' : 'divider',
          borderRadius: 3,
          p: 5,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: dragging ? 'action.hover' : 'background.default',
          transition: 'all 0.2s',
        }}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          accept="application/pdf"
          multiple={multiple}
          hidden
          onChange={(e) => addFiles(e.target.files)}
        />
        <CloudUpload sx={{ fontSize: 52, color: 'primary.main', mb: 1.5 }} />
        <Typography variant="h6" fontWeight={600}>
          {dragging ? 'Drop files here' : 'Drag & drop PDF files here'}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          or click to browse — PDF only
        </Typography>
      </Paper>

      {/* File List */}
      {files.length > 0 && (
        <List dense sx={{ mt: 2 }}>
          {files.map((f, i) => (
            <ListItem
              key={i}
              secondaryAction={
                <IconButton edge="end" size="small" onClick={() => removeFile(i)}>
                  <Close fontSize="small" />
                </IconButton>
              }
              sx={{ bgcolor: 'action.hover', borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <PictureAsPdf color="error" fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={f.name}
                secondary={formatFileSize(f.size)}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 500, noWrap: true }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Progress */}
      {uploading && (
        <Box mt={2}>
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Typography variant="caption" color="text.secondary">Uploading...</Typography>
            <Typography variant="caption" color="text.secondary">{progress}%</Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: 1 }} />
        </Box>
      )}

      {/* Result */}
      {result && (
        <Alert
          severity={result.type}
          icon={result.type === 'success' ? <CheckCircle /> : undefined}
          sx={{ mt: 2, borderRadius: 2 }}
          onClose={() => setResult(null)}
        >
          {result.message}
        </Alert>
      )}

      {/* Upload Button */}
      <Button
        variant="contained"
        size="large"
        fullWidth
        disabled={!files.length || uploading}
        onClick={handleUpload}
        sx={{ mt: 2, py: 1.5 }}
        disableElevation
      >
        {uploading ? 'Uploading...' : `Upload ${files.length > 0 ? `(${files.length})` : ''}`}
      </Button>
    </Box>
  );
}

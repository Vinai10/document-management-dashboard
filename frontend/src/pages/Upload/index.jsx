import { Box, Typography, Grid, Card, CardContent, Divider } from '@mui/material';
import { CloudUpload, LibraryAdd } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';

export default function Upload() {
  const handleSingleUpload = async (file) => {
    // Simulate async upload — replace with documentApi.upload(file)
    await new Promise((r) => setTimeout(r, 800));
    console.log('Uploading single:', file.name);
  };

  const handleMultipleUpload = async (files) => {
    // Simulate async upload — replace with documentApi.uploadMultiple(files)
    await new Promise((r) => setTimeout(r, 1000));
    console.log('Uploading multiple:', files.map((f) => f.name));
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5">Upload Documents</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Upload single or multiple PDF documents to the system.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                <CloudUpload color="primary" />
                <Box>
                  <Typography variant="h6">Single Upload</Typography>
                  <Typography variant="caption" color="text.secondary">Upload one PDF at a time</Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <FileUpload onUpload={handleSingleUpload} multiple={false} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                <LibraryAdd color="secondary" />
                <Box>
                  <Typography variant="h6">Bulk Upload</Typography>
                  <Typography variant="caption" color="text.secondary">Upload multiple PDFs at once</Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <FileUpload onUpload={handleMultipleUpload} multiple={true} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

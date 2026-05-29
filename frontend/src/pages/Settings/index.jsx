import { useState } from 'react';
import { Box, Typography, Card, CardContent, Divider, List, ListItem,
  ListItemText, ListItemSecondaryAction, Switch, Select, MenuItem,
  FormControl, Button, Alert, Stack } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';

export default function Settings() {
  const { mode, toggleTheme } = useThemeContext();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [language, setLanguage] = useState('en');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box maxWidth={720}>
      <Box mb={3}>
        <Typography variant="h5">Settings</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Manage your application preferences.
        </Typography>
      </Box>

      <Stack spacing={3}>
        {/* Appearance */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>Appearance</Typography>
            <Divider sx={{ mb: 2 }} />
            <List disablePadding>
              <ListItem disablePadding sx={{ py: 1 }}>
                <ListItemText
                  primary="Dark Mode"
                  secondary="Switch between light and dark theme"
                />
                <ListItemSecondaryAction>
                  <Switch checked={mode === 'dark'} onChange={toggleTheme} color="primary" />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem disablePadding sx={{ py: 1.5 }}>
                <ListItemText primary="Language" secondary="Select display language" />
                <ListItemSecondaryAction>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>Notifications</Typography>
            <Divider sx={{ mb: 2 }} />
            <List disablePadding>
              <ListItem disablePadding sx={{ py: 1 }}>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Receive email alerts for document events"
                />
                <ListItemSecondaryAction>
                  <Switch checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} color="primary" />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Document */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>Document Management</Typography>
            <Divider sx={{ mb: 2 }} />
            <List disablePadding>
              <ListItem disablePadding sx={{ py: 1 }}>
                <ListItemText
                  primary="Auto-Approve Uploads"
                  secondary="Automatically approve documents upon upload"
                />
                <ListItemSecondaryAction>
                  <Switch checked={autoApprove} onChange={(e) => setAutoApprove(e.target.checked)} color="primary" />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {saved && <Alert severity="success" sx={{ borderRadius: 2 }}>Settings saved successfully.</Alert>}

        <Button variant="contained" size="large" onClick={handleSave} disableElevation sx={{ alignSelf: 'flex-start', px: 4 }}>
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
}

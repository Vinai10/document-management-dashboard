import { useState } from 'react';
import { IconButton, Badge, Popover, Box, Typography, List, ListItem,
  ListItemText, Divider, Button, Chip } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNotifications } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from '../../utils/dateUtils';

const TYPE_COLORS = { SUCCESS: 'success', ERROR: 'error', WARNING: 'warning', INFO: 'info' };

export default function NotificationBell() {
  const [anchor, setAnchor] = useState(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const recent = notifications.slice(0, 5);

  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)} size="large">
        <Badge badgeContent={unreadCount} color="error" max={99}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { width: 380, borderRadius: 2, mt: 1 } }}
      >
        <Box px={2} py={1.5} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Notifications</Typography>
          {unreadCount > 0 && (
            <Button size="small" onClick={markAllAsRead} sx={{ fontSize: 12 }}>
              Mark all read
            </Button>
          )}
        </Box>
        <Divider />
        <List disablePadding sx={{ maxHeight: 320, overflow: 'auto' }}>
          {recent.length === 0 ? (
            <ListItem><ListItemText primary="No notifications" /></ListItem>
          ) : (
            recent.map((n) => (
              <ListItem
                key={n.id}
                onClick={() => markAsRead(n.id)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: n.readStatus ? 'transparent' : 'action.hover',
                  '&:hover': { bgcolor: 'action.selected' },
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                <Box flex={1}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip label={n.type} size="small" color={TYPE_COLORS[n.type] || 'default'} sx={{ height: 20, fontSize: 10 }} />
                    <Typography variant="caption" color="text.secondary">
                      {formatDistanceToNow(n.timestamp)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" mt={0.5} fontWeight={n.readStatus ? 400 : 600}>
                    {n.message}
                  </Typography>
                </Box>
              </ListItem>
            ))
          )}
        </List>
        <Divider />
        <Box p={1}>
          <Button fullWidth size="small" onClick={() => { setAnchor(null); navigate('/notifications'); }}>
            View all notifications
          </Button>
        </Box>
      </Popover>
    </>
  );
}

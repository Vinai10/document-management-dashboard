import { Box, Typography, Button, Card, CardContent, Chip, Divider,
  List, ListItem, ListItemText, IconButton, Tooltip, Stack } from '@mui/material';
import { DoneAll, Circle } from '@mui/icons-material';
import { useNotifications } from '../../context/NotificationContext';
import { formatDistanceToNow } from '../../utils/dateUtils';

const TYPE_COLORS = { SUCCESS: 'success', ERROR: 'error', WARNING: 'warning', INFO: 'info' };

export default function Notifications() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h5">Notifications</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </Typography>
        </Box>
        {unreadCount > 0 && (
          <Button variant="outlined" startIcon={<DoneAll />} onClick={markAllAsRead} size="small">
            Mark all as read
          </Button>
        )}
      </Box>

      <Card>
        <List disablePadding>
          {notifications.length === 0 ? (
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <Typography color="text.secondary">No notifications yet.</Typography>
            </CardContent>
          ) : (
            notifications.map((n, i) => (
              <Box key={n.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    px: 3, py: 2,
                    bgcolor: n.readStatus ? 'transparent' : 'action.hover',
                    cursor: n.readStatus ? 'default' : 'pointer',
                    '&:hover': { bgcolor: 'action.selected' },
                  }}
                  onClick={() => !n.readStatus && markAsRead(n.id)}
                  secondaryAction={
                    !n.readStatus && (
                      <Tooltip title="Mark as read">
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}>
                          <Circle sx={{ fontSize: 10, color: 'primary.main' }} />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                >
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                        <Chip
                          label={n.type}
                          size="small"
                          color={TYPE_COLORS[n.type] || 'default'}
                          sx={{ height: 20, fontSize: 10 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {formatDistanceToNow(n.timestamp)}
                        </Typography>
                      </Stack>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.primary"
                        fontWeight={n.readStatus ? 400 : 600}
                      >
                        {n.message}
                      </Typography>
                    }
                  />
                </ListItem>
                {i < notifications.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </List>
      </Card>
    </Box>
  );
}

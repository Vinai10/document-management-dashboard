import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, Divider, Avatar, Tooltip, IconButton,
} from '@mui/material';
import {
  Dashboard, Description, CloudUpload, Notifications,
  Settings, ChevronLeft, ChevronRight, FolderSpecial,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNotifications } from '../../context/NotificationContext';
import { Badge } from '@mui/material';

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 72;

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/' },
  { label: 'Documents', icon: <Description />, path: '/documents' },
  { label: 'Upload', icon: <CloudUpload />, path: '/upload' },
  { label: 'Notifications', icon: <Notifications />, path: '/notifications', badge: true },
  { label: 'Settings', icon: <Settings />, path: '/settings' },
];

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { unreadCount } = useNotifications();
  const width = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  const drawerContent = (
    <Box display="flex" flexDirection="column" height="100%">
      {/* Logo */}
      <Box
        display="flex" alignItems="center" justifyContent={collapsed ? 'center' : 'space-between'}
        px={collapsed ? 1 : 2.5} py={2.5}
      >
        {!collapsed && (
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 34, height: 34 }}>
              <FolderSpecial sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography variant="h6" fontWeight={700} color="primary.main" noWrap>
              DocVault
            </Typography>
          </Box>
        )}
        {collapsed && (
          <Avatar sx={{ bgcolor: 'primary.main', width: 34, height: 34 }}>
            <FolderSpecial sx={{ fontSize: 18 }} />
          </Avatar>
        )}
        <IconButton size="small" onClick={() => setCollapsed((p) => !p)} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {collapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
        </IconButton>
      </Box>

      <Divider />

      {/* Nav */}
      <List sx={{ px: 1, py: 1.5, flex: 1 }}>
        {NAV_ITEMS.map(({ label, icon, path, badge }) => {
          const active = location.pathname === path;
          const iconEl = badge && unreadCount > 0
            ? <Badge badgeContent={unreadCount} color="error" max={99}>{icon}</Badge>
            : icon;

          return (
            <Tooltip key={path} title={collapsed ? label : ''} placement="right">
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => { navigate(path); onMobileClose?.(); }}
                  sx={{
                    borderRadius: 2,
                    minHeight: 44,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    px: collapsed ? 1.5 : 2,
                    bgcolor: active ? 'primary.main' : 'transparent',
                    color: active ? 'primary.contrastText' : 'text.secondary',
                    '&:hover': {
                      bgcolor: active ? 'primary.dark' : 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{
                    minWidth: collapsed ? 0 : 36,
                    color: 'inherit',
                    justifyContent: 'center',
                  }}>
                    {iconEl}
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 600 : 500 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>

      <Divider />

      {/* User */}
      <Box px={collapsed ? 1 : 2} py={2} display="flex" alignItems="center" gap={1.5}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main', fontSize: 14 }}>AD</Avatar>
        {!collapsed && (
          <Box overflow="hidden">
            <Typography variant="body2" fontWeight={600} noWrap>Admin User</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>admin@docvault.com</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box component="nav">
      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

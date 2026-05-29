import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/documents': 'Documents',
  '/upload': 'Upload',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
};

const DRAWER_WIDTH = 260;

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || 'DocVault';

  return (
    <Box display="flex" minHeight="100vh" bgcolor="background.default">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          ml: { md: `${DRAWER_WIDTH}px` },
          minWidth: 0,
        }}
      >
        <Header onMenuClick={() => setMobileOpen(true)} title={title} />
        <Box flex={1} p={{ xs: 2, sm: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

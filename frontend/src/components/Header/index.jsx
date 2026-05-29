import { AppBar, Toolbar, IconButton, Typography, Box, Tooltip } from '@mui/material';
import { Menu as MenuIcon, LightMode, DarkMode } from '@mui/icons-material';
import { useThemeContext } from '../../context/ThemeContext';
import NotificationBell from '../NotificationBell';

export default function Header({ onMenuClick, title }) {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <IconButton edge="start" onClick={onMenuClick} sx={{ display: { md: 'none' } }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" fontWeight={600} sx={{ flex: 1 }}>
          {title}
        </Typography>

        <Box display="flex" alignItems="center" gap={0.5}>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={toggleTheme} size="large">
              {mode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>
          <NotificationBell />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

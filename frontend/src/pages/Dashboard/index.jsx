import { Grid, Box, Typography, Card, CardContent, Divider, List,
  ListItem, ListItemText, ListItemIcon, Chip, Avatar } from '@mui/material';
import { Description, CheckCircle, HourglassEmpty, Notifications,
  PictureAsPdf } from '@mui/icons-material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer } from 'recharts';
import StatsCard from '../../components/StatsCard';
import { mockStats, mockUploadTrend, mockDocuments } from '../../services/mockData';
import { formatDate, formatFileSize } from '../../utils/dateUtils';
import { useTheme } from '@mui/material/styles';
import { useNotifications } from '../../context/NotificationContext';

const STATUS_COLORS = { APPROVED: 'success', PENDING: 'warning', REJECTED: 'error', ARCHIVED: 'default' };

export default function Dashboard() {
  const theme = useTheme();
  const { unreadCount } = useNotifications();
  const recent = [...mockDocuments].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)).slice(0, 5);

  return (
    <Box>
      {/* Welcome */}
      <Box mb={3}>
        <Typography variant="h5">Welcome back, Admin 👋</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Here's what's happening with your documents today.
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard title="Total Documents" value={mockStats.total} icon={<Description />}
            color="primary" trend="up" trendValue="+12%" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard title="Approved" value={mockStats.approved} icon={<CheckCircle />}
            color="success" trend="up" trendValue="+8%" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard title="Pending Review" value={mockStats.pending} icon={<HourglassEmpty />}
            color="warning" trend="down" trendValue="-3%" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard title="Unread Notifications" value={unreadCount} icon={<Notifications />}
            color="error" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Upload Trend Chart */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" mb={0.5}>Upload Trend</Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Monthly document uploads over the last 6 months
              </Typography>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={mockUploadTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="uploadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke={theme.palette.divider} />
                  <YAxis tick={{ fontSize: 12 }} stroke={theme.palette.divider} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 8,
                    }}
                  />
                  <Area type="monotone" dataKey="uploads" stroke={theme.palette.primary.main}
                    strokeWidth={2.5} fill="url(#uploadGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Status Breakdown */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>Status Breakdown</Typography>
              {[
                { label: 'Approved', value: mockStats.approved, color: '#22c55e' },
                { label: 'Pending', value: mockStats.pending, color: '#f59e0b' },
                { label: 'Rejected', value: mockStats.rejected, color: '#ef4444' },
                { label: 'Archived', value: mockStats.archived, color: '#94a3b8' },
              ].map(({ label, value, color }) => (
                <Box key={label} mb={2}>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2" fontWeight={500}>{label}</Typography>
                    <Typography variant="body2" color="text.secondary">{value}</Typography>
                  </Box>
                  <Box bgcolor="action.hover" borderRadius={1} height={6} overflow="hidden">
                    <Box
                      height="100%"
                      borderRadius={1}
                      bgcolor={color}
                      width={`${(value / mockStats.total) * 100}%`}
                    />
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>Recent Activity</Typography>
              <List disablePadding>
                {recent.map((doc, i) => (
                  <Box key={doc.id}>
                    <ListItem disablePadding sx={{ py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 44 }}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: 'error.light' }}>
                          <PictureAsPdf sx={{ fontSize: 18, color: 'error.main' }} />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={doc.fileName}
                        secondary={`${formatFileSize(doc.fileSize)} · ${formatDate(doc.uploadDate)}`}
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                      <Chip label={doc.status} size="small"
                        color={STATUS_COLORS[doc.status] || 'default'} variant="outlined" />
                    </ListItem>
                    {i < recent.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

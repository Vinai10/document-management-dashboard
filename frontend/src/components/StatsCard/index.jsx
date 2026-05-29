import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

export default function StatsCard({ title, value, icon, color, trend, trendValue }) {
  const isPositive = trend === 'up';
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700} color="text.primary">
              {value}
            </Typography>
            {trendValue && (
              <Box display="flex" alignItems="center" gap={0.5} mt={1}>
                {isPositive
                  ? <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                  : <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />}
                <Typography variant="caption" color={isPositive ? 'success.main' : 'error.main'} fontWeight={600}>
                  {trendValue}
                </Typography>
                <Typography variant="caption" color="text.secondary">vs last month</Typography>
              </Box>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main`, width: 52, height: 52 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

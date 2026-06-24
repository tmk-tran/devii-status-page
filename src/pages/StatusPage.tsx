import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { StatusMetaDataRow, StatusMetricCard } from "../components";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

function StatusPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
        <Typography variant="h4" component="h1">
          Status
        </Typography>
      </Stack>

      {/* Metadata text */}
      <StatusMetaDataRow
        icon={ApiOutlinedIcon}
        label="Production"
        value={
          <>
            {" • "}
            API: {apiUrl}
          </>
        }
        mb={0.5}
      />

      <StatusMetaDataRow
        icon={AccessTimeOutlinedIcon}
        label="Last updated:"
        value="2 minutes ago"
        variant="caption"
        mb={5}
      />

      {/* Metrics */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatusMetricCard title="System Status">
            <Chip color="success" label="Operational" size="medium" />
          </StatusMetricCard>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatusMetricCard title="Active Events" value="0" />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatusMetricCard title="Average Load" value="24%" />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatusMetricCard title="Response Time" value="132 ms" />
        </Grid>
      </Grid>

      {/* Scheduled Maintenance */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Scheduled Maintenance
          </Typography>

          <Typography color="text.secondary">
            No scheduled maintenance.
          </Typography>
        </CardContent>
      </Card>

      {/* Active Events */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Active Events
          </Typography>

          <Typography color="text.secondary">
            No active incidents or service disruptions.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default StatusPage;

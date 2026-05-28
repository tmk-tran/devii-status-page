import { Box, Typography } from "@mui/material";

function SettingsPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Settings
      </Typography>
      <Typography color="text.secondary">
        Manage status page preferences and notification settings here.
      </Typography>
    </Box>
  );
}

export default SettingsPage;

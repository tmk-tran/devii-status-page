import { Box, Typography } from "@mui/material";

function TenantsPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Tenants
      </Typography>
      <Typography color="text.secondary">
        Review tenant environments and their current status here.
      </Typography>
    </Box>
  );
}

export default TenantsPage;

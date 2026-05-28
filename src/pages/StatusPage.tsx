import { Box, Chip, Stack, Typography } from "@mui/material";

function StatusPage() {
  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
        <Typography variant="h4" component="h1">
          Status
        </Typography>
        <Chip color="success" label="Operational" size="small" />
      </Stack>
      <Typography color="text.secondary">
        Monitor service health and recent incidents from this page.
      </Typography>
    </Box>
  );
}

export default StatusPage;

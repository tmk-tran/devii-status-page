import type { ReactNode } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

type StatusMetricCardProps = {
  title: string;
  value?: string | number;
  subtitle?: string;
  children?: ReactNode; // custom content
};

const StatusMetricCard = ({
  title,
  value,
  subtitle,
  children,
}: StatusMetricCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Box
          sx={{
            minHeight: 48, // matches roughly h4 height
            display: "flex",
            alignItems: "center",
          }}
        >
          {children ?? (
            <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
              {value}
            </Typography>
          )}
        </Box>

        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusMetricCard;

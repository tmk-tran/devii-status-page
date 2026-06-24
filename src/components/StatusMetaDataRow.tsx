import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { TypographyProps } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

type StatusMetadataRowProps = {
  icon: SvgIconComponent; // icon component type on the left
  label: string; // bold label
  value: ReactNode; // metadata value
  variant?: TypographyProps["variant"]; // typography variant
  mb?: number; // bottom margin
};

const StatusMetadataRow = ({
  icon,
  label,
  value,
  variant = "body2",
  mb = 0,
}: StatusMetadataRowProps) => {
  const Icon = icon;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: "center",
        mb,
      }}
    >
      <Icon
        aria-hidden // decorative icon; ignore for screen readers
        fontSize="small"
        sx={{
          fontSize: 16,
          color: "text.secondary",
          opacity: 0.7,
        }}
      />

      <Typography variant={variant} color="text.secondary">
        <Box component="span" sx={{ fontWeight: 600 }}>
          {label}
        </Box>{" "}
        {value}
      </Typography>
    </Stack>
  );
};

export default StatusMetadataRow;

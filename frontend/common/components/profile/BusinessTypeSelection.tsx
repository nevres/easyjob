import { Stack } from "@mui/material";
import { Business, Person } from "@mui/icons-material";

export default function BusinessTypeSelection() {
  return (
    <Stack direction="row">
      <Business />
      <Person />
    </Stack>
  );
}

import classes from "./SoftLaunchBanner.module.scss";
import { Box } from "@mantine/core";

export default function SoftLaunchBanner() {
  return (
    <Box className={classes["soft-launch-wrapper"]}>
      🎉 Welcome to the soft launch of Palaviajeros — discover your next
      adventure with us!
    </Box>
  );
}

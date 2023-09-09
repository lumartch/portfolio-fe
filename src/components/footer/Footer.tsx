import { DEVELOPER_GIT_USER, DEVELOPER_NAME } from "@/const";
import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box>
      <Typography style={{ textAlign: "center", fontWeight: "700" }}>Made by {DEVELOPER_NAME}@{DEVELOPER_GIT_USER}:~$ ./{DEVELOPER_GIT_USER}.sh</Typography>
    </Box>
  );
}
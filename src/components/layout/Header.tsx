import { FC, ReactNode } from "react";
import { Avatar, Box, Button } from "@mui/material";

type IHeader = {
  src?: string;
  title: string;
  children?: ReactNode;
};

export const Header: FC<IHeader> = ({ src, title, children }) => {
  return (
    <header>
      <Button
        startIcon={<Avatar alt="logo" src={src} />}
        sx={{
          fontSize: "1.1rem",
          bgcolor: 'background.default', color: 'text.primary' 
        }}
      >
        {title}
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          bgcolor: 'background.default', color: 'text.primary' 
        }}
      >
        {children}
      </Box>
    </header>
  );
};

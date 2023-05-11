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
          color: "black",
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
        }}
      >
        {children}
      </Box>
    </header>
  );
};

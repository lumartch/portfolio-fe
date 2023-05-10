import { Avatar, Box, Button } from "@mui/material";
import { FC, ReactNode } from "react";

const Header: FC<IHeader> = ({ src, title, children }) => {
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

type IHeader = {
  src?: string;
  title: string;
  children?: ReactNode;
};

export default Header;

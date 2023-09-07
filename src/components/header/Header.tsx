import { FC, ReactNode, useContext } from "react";
import { Avatar, Box, Button, Grid, IconButton, Typography, useTheme } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from "../theme/ColorModeContext";
import { LINKEDIN_URI } from "@/const";

type IHeader = {
  src?: string;
  title: string;
  children?: ReactNode;
};

export const Header: FC<IHeader> = ({ src, title, children }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Grid item container xs={12} sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", textTransform: "uppercase"}}>
      <Grid item sx={{ display: "flex", alignItems: "center" }}>
        <Button href={LINKEDIN_URI} startIcon={<Avatar alt="logo" src={src} />} sx={{ fontSize: "1.1rem", color: 'text.primary' }}>
          {title}
        </Button>
      </Grid>
      <Grid item>
        <Grid container item sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
          <Box>{children}</Box>
          <Typography color={theme.palette.mode}>{theme.palette.mode} mode</Typography>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

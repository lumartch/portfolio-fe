import { FC, useContext } from "react";
import { Avatar, Button, Grid, IconButton, Typography, useTheme } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from "../theme/ColorModeContext";
import { LINKEDIN_URI, EPaths } from "@/const";
import Link from "next/link";

import layoutStyle from './Header.module.css';

type IHeader = {
  src?: string;
  title: string;
};

export const Header: FC<IHeader> = ({ src, title }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const paths: typeof EPaths = EPaths; 
  const linkTheme = theme.palette.mode === 'dark' ? `${layoutStyle.link} ${layoutStyle.white}` : `${layoutStyle.link}`;
  return (
    <Grid item container xs={12} sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", textTransform: "uppercase"}}>
      <Grid item sx={{ display: "flex", alignItems: "center" }}>
        <Button href={LINKEDIN_URI} startIcon={<Avatar alt="logo" src={src} />} sx={{ fontSize: "1.1rem", color: 'text.primary' }}>
          {title}
        </Button>
      </Grid>
      <Grid item sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}> </Grid>
      { Object.entries(paths).map((path: string[], index: number) => (
        <Grid item key={index} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Link className={linkTheme} href={path[1]}>{path[0]}</Link>
        </Grid> 
      ))}
      <Grid item sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}> </Grid>
      <Grid item>
        <Grid container item sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Typography color={theme.palette.mode}>{theme.palette.mode} mode</Typography>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

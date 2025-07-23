import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import LogoImage from "../atoms/LogoImage";
import SearchBox from "../molecules/SearchBox";
import NavbarActions from "../molecules/NavbarActions";
import CategoryMenu from "../molecules/CategoryMenu";

const Navbar: React.FC = () => {
  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <LogoImage />
          </Box>
          <SearchBox />
          <NavbarActions />
        </Toolbar>
      </AppBar>
      <CategoryMenu />
    </>
  );
};

export default Navbar;

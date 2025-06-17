import { useBreakpoint } from "@/config";
import { NavbarMobile, Navbar, Footer } from "..";
import { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Layout({ children }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {isSmallScreen ? <NavbarMobile /> : <Navbar />}
      <main className="px-2 py-4 mt-24">{children}</main>
      <div className="w-full">
        <Footer></Footer>
      </div>
    </>
  );
}

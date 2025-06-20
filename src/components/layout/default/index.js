import { useBreakpoint } from "@/config";
import { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import NavMobile from "@/components/navMobile";
import Nav from "@/components/nav";
import Footer from "@/components/footer";


export default function Layout({ children }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {isSmallScreen ? <NavMobile /> : <Nav />}
      <main className="px-2 py-4 mt-24">{children}</main>
      <div className="w-full">
        <Footer></Footer>
      </div>
    </>
  );
}

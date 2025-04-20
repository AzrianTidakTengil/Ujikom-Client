import Navbar from "../nav";
import Footer from "../footer";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export default function BlankLayout({children}) {
    return (
        <>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Link href="/" style={{textDecoration: 'none', color: '#fff'}}><Typography variant='h4' fontSize={'1.25rem'} fontWeight={800}>Popping</Typography></Link>
                </Toolbar>
            </AppBar>
            <main style={{
                marginTop: '4.5rem',
                padding: '1rem 0.5rem'
            }}>
                <Box
                    sx={{
                        minHeight: '60vh'
                    }}
                >
                    {children}
                </Box>
            </main>
            <div style={{
                width: '100%'
            }}>
                <Footer></Footer>
            </div>
        </>
    )
}
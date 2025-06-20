import Footer from "@/components/footer";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Box, ThemeProvider, createTheme } from "@mui/material";
import { palleteV1 } from "@/assets/css/template";

const theme = createTheme({
    palette: {
        ...palleteV1.palette
    }
})

export default function BlankLayout({children}) {
    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    )
}
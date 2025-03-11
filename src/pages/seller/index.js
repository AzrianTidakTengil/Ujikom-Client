import { palleteV1 } from "@/assets/css/template";
import { SellerLayout } from "@/components";
import { Favorite, ShoppingCart, TravelExplore, Visibility, VisibilityOff } from "@mui/icons-material";
import { Container, createTheme, Paper, ThemeProvider, Grid2 as Grid, Typography, Box, IconButton, Stack, Divider, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Component } from "react";

const theme = createTheme()

class Seller extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showBalance: false
        }
    }

    renderBalance = () => {
        const {showBalance} = this.state

        return (
            <Paper
                sx={{
                    p: 2,
                    height: '8rem'
                }}
            >
                <Typography variant="h5" fontWeight={500}>Saldo toko</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        marginY: 2
                    }}
                >
                    <Typography variant="h6" fontWeight={600} sx={{marginRight: 2}}>
                    {
                        showBalance ? 
                        new Intl.NumberFormat('id-ID', {
                            style: "currency",
                            currency: "IDR"
                        }).format(100000) 
                        :
                        `Rp ********`
                    }
                    </Typography>
                    <IconButton
                        onClick={() => {this.setState({showBalance: !showBalance})}}
                    >
                        {
                            showBalance ?
                            <Visibility/> :
                            <VisibilityOff/>
                        }
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}
                >
                    <Stack
                        direction="row"
                        divider={<Divider flexItem orientation="vertical"/>}
                        spacing={2}
                    >
                        <Button
                            variant="text"
                        >
                            Tarik Saldo
                        </Button>
                        <Button
                            variant="text"
                        >
                            Riwayat
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        )
    }

    renderAnalysisShop = () => {
        return (
            <Paper
                sx={{
                    p: 2,
                    height: '8rem'
                }}
            >
                <Stack
                    direction="row"
                    divider={<Divider flexItem orientation="vertical"/>}
                    spacing={2}
                    justifyContent={'space-around'}
                >
                    <Box>
                        <Typography variant="h5" fontWeight={500}>Dalam keranjang</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginY: 2
                            }}
                        >
                            <ShoppingCart sx={{marginRight: 2}}/>
                            <Typography variant="h6" fontWeight={600}>{`100`}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h5" fontWeight={500}>Disukai</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginY: 2
                            }}
                        >
                            <Favorite sx={{marginRight: 2}}/>
                            <Typography variant="h6" fontWeight={600}>{`100`}</Typography>
                        </Box>
                    </Box>
                </Stack>
                {/* <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}
                >
                    <Stack
                        direction="row"
                        divider={<Divider flexItem orientation="vertical"/>}
                        spacing={2}
                    >
                        <Button
                            variant="text"
                        >
                            Riwayat
                        </Button>
                    </Stack>
                </Box> */}
            </Paper>
        )
    }

    renderMision = () => {
        return (
            <Paper
                sx={{
                    p: 2
                }}
            >
                <Typography variant="h6" fontWeight={600}>Misi untuk menjadi terbaik</Typography>
            </Paper>
        )
    }

    renderTren = () => {
        const dummy_product = [
            {
                name: 'Ayam goreng',
                category: 'Dapur, Bahan makan'
            },
            {
                name: 'Pemutih',
                category: 'Pembersih, alat rumah tangga'
            },
            {
                name: 'Beras Premium',
                category: 'Dapur, Bahan makan'
            },
            {
                name: 'Sabun Cuci Piring',
                category: 'Pembersih, alat rumah tangga'
            },
            {
                name: 'Minyak Goreng',
                category: 'Dapur, Bahan makan'
            },
            {
                name: 'Sikat WC',
                category: 'Pembersih, alat rumah tangga'
            },
            {
                name: 'Kopi Bubuk',
                category: 'Minuman, Dapur'
            },
            {
                name: 'Pasta Gigi',
                category: 'Perawatan diri'
            },
            {
                name: 'Shampoo',
                category: 'Perawatan diri'
            },
            {
                name: 'Detergen Bubuk',
                category: 'Pembersih, alat rumah tangga'
            }
        ];

        return (
            <Paper
                sx={{
                    p: 2
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={600}
                >
                    Produk teramai
                </Typography>
                <TableContainer component={Paper} sx={{marginY: 2}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">No.</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Nama</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Kategori</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Aksi</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dummy_product.map((val, index) => (
                                    <TableRow key={val.name}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {val.name}
                                        </TableCell>
                                        <TableCell>
                                            {val.category}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={() => alert(`Visiting products in Tier ${val.name}`)} size="small">
                                                <TravelExplore/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}
                >
                    <Button variant="text">
                        Lihat selengkapnya
                    </Button>
                </Box>
            </Paper>
        )
    }

    render() {
        return(
            <ThemeProvider theme={theme}>
                <Container sx={{marginY: 2}}>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            {this.renderBalance()}
                        </Grid>
                        <Grid size={6}>
                            {this.renderAnalysisShop()}
                        </Grid>
                    </Grid>
                </Container>
                <Container sx={{marginY: 2}}>
                    {this.renderMision()}
                </Container>
                <Container sx={{marginY: 2}}>
                    {this.renderTren()}
                </Container>
            </ThemeProvider>
        )
    }
}

Seller.getLayout = (page) => {
    return (
        <SellerLayout>
            {page}
        </SellerLayout>
    )
}

export default Seller
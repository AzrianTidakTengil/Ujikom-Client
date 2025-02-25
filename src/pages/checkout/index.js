import { palleteV1 } from "@/assets/css/template";
import { Close, LocationOn } from "@mui/icons-material";
import { Container, createTheme, ThemeProvider, Box, Typography, Stack, Paper, Grid2 as Grid, Button, Modal, IconButton, Divider, Avatar, AppBar, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, {Component} from "react";

class CheckOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [
                {
                    id: 0,
                    name: 'Makanan Bayi',
                    shop: 'Bintang Jaya Sempurna',
                    quantity: 1,
                    price: 10000,
                    variant: [
                        'anggur',
                        '10ml'
                    ],
                    image: null
                },
                {
                    id: 1,
                    name: 'Kopi enak',
                    shop: 'Luwak',
                    quantity: 10,
                    price: 5000,
                    variant: null,
                    image: null
                },
                {
                    id: 2,
                    name: 'Celana super elastis',
                    shop: 'Raja Bahan',
                    quantity: 1,
                    price: 900000,
                    variant: [
                        'M',
                        'Biru'
                    ],
                    image: null
                }
            ],
            address: [
                {
                    id: 0,
                    label: 'Rumah',
                    city: 'Bandung', 
                    detail: 'Jln Pasirluyu no 7',
                    postalCode: '421024',
                    moreInformation: 'Gerbang Warna merah/jingga'
                },
                {
                    id: 2,
                    label: 'Kantor',
                    city: 'Bandung', 
                    detail: 'Jln Bekerja no 7',
                    postalCode: '421024',
                    moreInformation: 'Deket'
                },
                {
                    id: 3,
                    label: 'Kakek',
                    city: 'Bandung', 
                    detail: 'Jln Hari Tua no 7',
                    postalCode: '421024',
                    moreInformation: null
                }
            ],
            activateAddress: 0,
            isOpenModalChangeAddress: false,
            methodPayment: ''
        }
    }

    theme = () => createTheme({
        palette: {
            ...palleteV1.palette
        }
    })

    renderAddress = () => {
        const {address, activateAddress} = this.state

        const {label, city, detail, moreInformation, postalCode} = address[activateAddress]

        return(
            <Box>
                <Paper sx={{p: 2}}>
                <Typography variant="h6" fontWeight={600} sx={{marginBottom: 2}}>Alamat pengiriman</Typography>
                    <Stack direction={'row'} spacing={1} sx={{marginBottom: 2}}>
                        <LocationOn color="success"/>
                        <Typography variant="subtitle1">{label}</Typography>
                        <Typography variant="subtitle1">|</Typography>
                        <Typography variant="subtitle1">Azrian</Typography>
                    </Stack>
                    <Grid container>
                        <Grid size={11}>
                            <Typography variant="subtitle2">
                                {`${detail}${moreInformation ? ` (${moreInformation})` : ''}, ${city}, ${postalCode}`}
                            </Typography>
                        </Grid>
                        <Grid size={1}>
                            <Button variant="outlined" onClick={this.handleChangeModalAddress}>
                                Ganti
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        )
    }

    handleChangeModalAddress = () => {
        this.setState({
            isOpenModalChangeAddress: !this.state.isOpenModalChangeAddress
        })
    }

    renderModalChangeAddress = () => {
        const {isOpenModalChangeAddress, address, activateAddress} = this.state

        return(
            <Modal
                open={isOpenModalChangeAddress}
                onClose={this.handleChangeModalAddress}
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Container 
                    maxWidth="md"
                    sx={{
                        position: 'absolute',
                        top: '10%',
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: 2,
                            border: '1px solid #ababab',
                            bgcolor: '#fff',
                            p: 2
                        }}
                    >
                        <Grid container sx={{marginBottom: 1}}>
                            <Grid size={1}></Grid>
                            <Grid size={10} sx={{display:'flex', justifyContent: 'center'}}>
                                <Typography variant="h5">
                                    Daftar Alamat
                                </Typography>
                            </Grid>
                            <Grid size={1}>
                                <IconButton onClick={this.handleChangeModalAddress}>
                                    <Close/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Divider sx={{marginBottom: 2}}/>
                        <Button variant="contained" fullWidth sx={{marginBottom: 1}}>Tambah Alamat Baru</Button>
                        <Box>
                            {address.map((val) => (
                                <Paper 
                                    key={val.id}
                                    sx={{
                                        p: 2,
                                        marginY: 2
                                    }}
                                >
                                    <Grid container>
                                        <Grid size={10}>
                                            <Stack direction={'row'} spacing={1} sx={{marginBottom: 2}}>
                                                <LocationOn color="success"/>
                                                <Typography variant="subtitle1">{val.label}</Typography>
                                                <Typography variant="subtitle1">|</Typography>
                                                <Typography variant="subtitle1">Azrian</Typography>
                                            </Stack>
                                            <Typography variant="subtitle2">
                                                {`${val.detail}${val.moreInformation ? ` (${val.moreInformation})` : ''}, ${val.city}, ${val.postalCode}`}
                                            </Typography>
                                        </Grid>
                                        <Grid 
                                            size={2}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Button color="success" variant={'outlined'} disabled={activateAddress === val.id ? true : false}>
                                                Pilih
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Modal>
        )
    }

    renderItemCheckout = (data, index = 0) => {
        const {id, name, shop, quantity, price, variant, image} = data

        return (
            <Box>
                <Paper sx={{p: 2}}>
                    <Typography variant="h5">Produk {index + 1}</Typography>
                    <Divider sx={{marginY: 1}}/>
                    <Typography variant="h6" fontWeight={600} sx={{marginY: 1}}>{shop}</Typography>
                    <Grid container spacing={4}>
                        <Grid size={1.5}>
                            <Paper>No Image</Paper>
                        </Grid>
                        <Grid size={10.5} sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Box>
                                <Typography variant="subtitle1">{name}</Typography>
                                <Typography variant="subtitle1">{variant}</Typography>
                            </Box>
                            <Typography variant="subtitl1" fontWeight={600}>
                                {`${quantity} x ${
                                    new Intl.NumberFormat('id-ID', {
                                        style: "currency",
                                        currency: "IDR"
                                    }).format(price)
                                }`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        )
    }

    renderFinishCheckout = () => {
        const {methodPayment, products} = this.state

        return (
            <Box>
                <Paper sx={{p: 2}}>
                    <Stack direction={'row'} justifyContent={'space-around'} divider={<Divider orientation="vertical" flexItem/>}>
                        <Box width={'auto'}>
                            <Typography variant="h6">Metode Pembayaran</Typography>
                            <FormControl>
                                <RadioGroup
                                    onChange={this.handleChangeMethodPayment}
                                >
                                    <FormControlLabel value="qris" control={<Radio />} label="Qris"/>
                                    <FormControlLabel value="bank_transfer" control={<Radio />} label="Transfer Bank"/>
                                    <FormControlLabel value="cstore" control={<Radio />} label="Mitra Agen"/>
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        {
                            methodPayment === 'bank_transfer' ? (
                                <Box>
                                    <Typography variant="h6">Pilih Bank</Typography>
                                    <FormControl>
                                        <RadioGroup
                                            // onChange={this.handleChangeMethodPayment}
                                        >
                                            <FormControlLabel value="permata" control={<Radio />} label="Permata Virtual Account"/>
                                            <FormControlLabel value="bca" control={<Radio />} label="BCA Virtual Account"/>
                                            <FormControlLabel value="bri" control={<Radio />} label="BRI Virtual Account"/>
                                            <FormControlLabel value="bni" control={<Radio />} label="BNI Virtual Account"/>
                                            <FormControlLabel value="echannel" control={<Radio />} label="Mandiri Bill Payment"/>
                                            <FormControlLabel value="cimb" control={<Radio />} label="CIMB Virtual Account"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            ) : methodPayment === 'cstore' ? (
                                <Box>
                                    <Typography variant="h6">Pilih Mitra Agen</Typography>
                                    <FormControl>
                                        <RadioGroup
                                            // onChange={this.handleChangeMethodPayment}
                                        >
                                            <FormControlLabel value="alfamart" control={<Radio />} label="Alfamart"/>
                                            <FormControlLabel value="indomaret" control={<Radio />} label="Indomaret"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            ) : (
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Typography variant="h6">Tidak Ada Pilihan</Typography>
                                </Box>
                            )
                        }
                    </Stack>
                    <Divider/>
                    <Box
                        sx={{
                            width: 450,
                            justifySelf: 'end',
                            marginY: 2
                        }}
                    >
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 1}}>
                            <Typography variant="subtitle1">Subtotal produk:</Typography>
                            <Typography variant="subtitle1">{
                                new Intl.NumberFormat('id-ID', {
                                    style: "currency",
                                    currency: "IDR"
                                }).format(products.reduce((acc, val) => acc + (val.price * val.quantity), 0))
                            }</Typography>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 1}}>
                            <Typography variant="subtitle1">Subtotal pengiriman:</Typography>
                            <Typography variant="subtitle1">{
                                new Intl.NumberFormat('id-ID', {
                                    style: "currency",
                                    currency: "IDR"
                                }).format(products.reduce((acc, val) => acc + (val.price * val.quantity * 0.01), 0))
                            }</Typography>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 1}}>
                            <Typography variant="subtitle1">Biaya jasa aplikasi:</Typography>
                            <Typography variant="subtitle1">{
                                new Intl.NumberFormat('id-ID', {
                                    style: "currency",
                                    currency: "IDR"
                                }).format(2000)
                            }</Typography>
                        </Box>
                        <Paper sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 1, p: 2}}>
                            <Typography variant="h6" fontWeight={600}>Total Harga:</Typography>
                            <Typography variant="h6" fontWeight={600}>{
                                new Intl.NumberFormat('id-ID', {
                                    style: "currency",
                                    currency: "IDR"
                                }).format(971600)
                            }</Typography>
                        </Paper>
                        <Box sx={{display: 'flex', justifyContent: 'end', marginTop: 2}}>
                            <Button variant="contained" color="success" disabled={!methodPayment}>Konfirmasi</Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        )
    }

    handleChangeMethodPayment = (event) => {
        const {value} = event.target

        this.setState({
            methodPayment: value
        })
    }

    render() {
        const {products} = this.state

        return (
            <ThemeProvider theme={this.theme}>
                <Container
                    sx={{
                        marginBottom: 4
                    }}
                >
                    <Typography variant="h4" gutterBottom>CheckOut</Typography>
                </Container>
                <Container>
                    {this.renderAddress()}
                </Container>
                {products.map((val, index) => (
                    <Container key={index} sx={{marginY: 2}}>
                        {this.renderItemCheckout(val, index)}
                    </Container>
                ))}
                <Container>
                    {this.renderFinishCheckout()}
                </Container>
                {this.renderModalChangeAddress()}
            </ThemeProvider>
        )
    }
}

export default CheckOut
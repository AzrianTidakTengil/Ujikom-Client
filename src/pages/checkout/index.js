import { palleteV1 } from "@/assets/css/template";
import { Close, LocationOn } from "@mui/icons-material";
import { Container, createTheme, ThemeProvider, Box, Typography, Stack, Paper, Grid2 as Grid, Button, Modal, IconButton, Divider, Avatar, AppBar, FormControl, RadioGroup, FormControlLabel, Radio, TextField, InputAdornment, CircularProgress, Chip } from "@mui/material";
import { withRouter } from "next/router";
import React, {Component} from "react";
import { connect } from "react-redux";
import { findTrolley, clearItemsCheckout } from "@/store/trolley";
import { createTransaction } from "@/store/transaction";
import CryptoJS from "crypto-js";
import { Transaction } from "@/services";
import { getAll as getAllAddress, find, getOne } from "@/store/address";
import { SearchOutlined } from "@mui/icons-material";

class CheckOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            addresses: [],
            address: {},
            activateAddress: 0,
            isOpenModalChangeAddress: false,
            methodPayment: '',
            subtype: {
                bank: '',
                store: ''
            }
        }
    }

    theme = () => createTheme({
        palette: {
            ...palleteV1.palette
        }
    })

    UNSAFE_componentWillMount() {
        const {router, trolley} = this.props
        this.props.getOne()

        if (trolley.itemsCheckout) {
            this.props.findTrolley({
                id: trolley.itemsCheckout
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {trolley, transaction, router, address} = this.props

        if (trolley.isSuccess) {
            const cart = []
            trolley.checkout.map((val) => {
                cart.push({
                    id: val.id,
                    quantity: val.items,
                    product: {
                        id: val.trolleyToProduct.id,
                        name: val.trolleyToProduct.name,
                        price: val.trolleyToProduct.price,
                        stock: val.trolleyToProduct.stock
                    },
                    store: {
                        id: val.trolleyToProduct.productToOwner.ownerToStore.id,
                        name: val.trolleyToProduct.productToOwner.ownerToStore.name
                    }
                })
            })
            this.setState({
                products: cart
            })
        }

        if (address.isSuccess) {
            this.setState({
                addresses: address.list.data,
                address: address.address.data
            })
        }
    }

    renderAddress = () => {
        const {address, activateAddress} = this.state

        // const {label, city, detail, moreInformation, postalCode} = address[activateAddress]

        return(
            <Box>
                <Paper sx={{p: 2}}>
                <Typography variant="h6" fontWeight={600} sx={{marginBottom: 2}}>Alamat pengiriman</Typography>
                    <Stack direction={'row'} spacing={1} sx={{marginBottom: 2}}>
                        <LocationOn color="success"/>
                        <Typography variant="subtitle1">{address.name}</Typography>
                        <Typography variant="subtitle1">|</Typography>
                        <Typography variant="subtitle1">{address.receiver}</Typography>
                    </Stack>
                    <Grid container>
                        <Grid size={11}>
                            <Typography variant="subtitle2">
                            {`${address.address}, ${address.district}, ${address.city}, ${address.province}, ${address.postal_code} ${address.notes ? `(${address.notes})` : ''}`}
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
        const {isOpenModalChangeAddress} = this.state

        if (!isOpenModalChangeAddress) {
            this.props.getAllAddress()
        }

        this.setState({
            isOpenModalChangeAddress: !this.state.isOpenModalChangeAddress
        })
    }

    renderModalChangeAddress = () => {
        const {isOpenModalChangeAddress, addresses, activateAddress} = this.state
        const {address} = this.props

        return(
            <Modal
                open={isOpenModalChangeAddress}
                onClose={this.handleChangeModalAddress}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Container 
                    maxWidth="md"
                >
                    <Box
                        sx={{
                            borderRadius: 2,
                            border: '1px solid #ababab',
                            bgcolor: '#fff',
                            p: 2,
                            height: 500
                            // height: '75vh',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid size={9}>
                            <TextField
                                fullWidth
                                size="small"
                                hiddenLabel
                                slotProps={{ input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <SearchOutlined/>
                                    </InputAdornment>
                                )
                                }}}
                                onChange={this.handleChangeSearchAddress}
                            />
                            </Grid>
                            <Grid 
                            size={3}
                            sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            >
                            <Button variant="contained" fullWidth>
                                Tambah Alamat
                            </Button>
                            </Grid>
                        </Grid>
                        <Divider sx={{marginY: 2}}/>
                        <Box
                            sx={{
                                height: 400,
                                overflow: 'auto'
                            }}
                        >
                        {
                            address.isLoading ? (
                                <CircularProgress sx={{marginTop: 2}}/>
                            ) : addresses.map((val) => (
                                <Paper
                                key={val.id}
                                sx={{
                                    marginY: 2,
                                    p: 2
                                }}
                                >
                                <Grid container>
                                    <Grid size={10}>
                                    <Stack
                                        sx={{marginY: 2}}
                                        direction="row"
                                        alignItems={'center'}
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={2} 
                                    >
                                        <Typography variant="body1" fontWeight={600}>{val.receiver}</Typography>
                                        <Typography variant="body1">{val.name}</Typography>
                                        {
                                        val.selectedAddressUser ? (
                                            <Chip label="Dipilih" color="success"/>
                                        ) : ''
                                        }
                                        {
                                        val.defaultAddressUser ? (
                                            <Chip label="Utama" />
                                        ) : ''
                                        }
                                    </Stack>
                                    <Typography variant="body1" sx={{marginY: 2}} textAlign={'left'}>{val.telephone}</Typography>
                                    <Typography variant="body1" sx={{marginY: 2}} textAlign={'left'}>{`${val.address}, ${val.district}, ${val.city}, ${val.province}, ${val.postal_code} ${val.notes ? `(${val.notes})` : ''}`}</Typography>
                                    </Grid>
                                    <Grid 
                                    size={2}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexDirection: 'column'
                                    }}
                                    >
                                    {
                                        !val.selectedAddressUser ? (
                                        <Button variant="contained" color="success">
                                            Pilih
                                        </Button>
                                        ) : ''
                                    }
                                    {
                                        !val.defaultAddressUser ? (
                                        <Button variant="outlined" color="success" sx={{marginTop: 2}}>
                                            Jadikan Utama
                                        </Button>
                                        ) : ''
                                    }
                                    <Button variant="outlined" color="success" sx={{marginTop: 2}}>
                                        Edit
                                    </Button>
                                    </Grid>
                                </Grid>
                                </Paper>
                            ))
                        }
                        </Box>
                    </Box>
                </Container>
            </Modal>
        )
    }

    renderItemCheckout = (data, index = 0) => {
        const {id, product, store, quantity,} = data

        return (
            <Box>
                <Paper sx={{p: 2}}>
                    <Typography variant="h5" color="gray">Produk {index + 1}</Typography>
                    <Divider sx={{marginY: 1}}/>
                    <Typography variant="h6" fontWeight={600} sx={{marginY: 1}}>{store.name}</Typography>
                    <Grid container spacing={4}>
                        <Grid size={1.5}>
                            <Paper>No Image</Paper>
                        </Grid>
                        <Grid size={10.5} sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Box>
                                <Typography variant="subtitle1">{product.name}</Typography>
                                <Typography variant="subtitle1"></Typography>
                            </Box>
                            <Typography variant="subtitl1" fontWeight={600}>
                                {`${quantity} x ${
                                    new Intl.NumberFormat('id-ID', {
                                        style: "currency",
                                        currency: "IDR"
                                    }).format(product.price * quantity)
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

        const subTotalProduct = products.reduce((acc, val) => acc + (val.product.price * val.quantity), 0)
        const subTotalShipment = products.reduce((acc, val) => acc + (val.product.price * val.quantity * 0.01), 0)
        const total = subTotalProduct + subTotalShipment + 2000

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
                                    <FormControlLabel value="qris" control={<Radio />} label="Qris" disabled={total > 2000000 ? true : false}/>
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
                                            onChange={this.handeleChangeSubtype}
                                            name="bank"
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
                                            onChange={this.handeleChangeSubtype}
                                            name="store"
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
                                }).format(subTotalProduct)
                            }</Typography>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 1}}>
                            <Typography variant="subtitle1">Subtotal pengiriman:</Typography>
                            <Typography variant="subtitle1">{
                                new Intl.NumberFormat('id-ID', {
                                    style: "currency",
                                    currency: "IDR"
                                }).format(subTotalShipment)
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
                                }).format(total)
                            }</Typography>
                        </Paper>
                        <Box sx={{display: 'flex', justifyContent: 'end', marginTop: 2}}>
                            <Button variant="contained" color="success" disabled={!methodPayment} onClick={this.handleSubmitCreateTransaction} loading={this.props.transaction.isLoading}>Konfirmasi</Button>
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

    handeleChangeSubtype = (event) => {
        const {value, name} = event.target

        if (name === 'bank') {
            this.setState({
                subtype: {
                    ...this.state.subtype,
                    bank: value
                }
            })
        } else if (name === 'store') {
            this.setState({
                subtype: {
                    ...this.state.subtype,
                    store: value
                }
            })
        }
    }

    handleSubmitCreateTransaction = () => {
        const {products, methodPayment, subtype} = this.state
        const {transaction} = this.props

        const type = subtype.bank ? {bank: subtype.bank} : subtype.store ? {store: subtype.store} : {}

        if (subtype.bank === 'echannel') {
            Transaction.create({
                label: '1',
                items: products.map((val) => val.id),
                coupon_payment: 0,
                coupon_fare: 0,
                insurance: 0,
                method_payment: subtype.bank,
            }).then(({data}) => {
                this.props.router.push({
                    pathname: `/t/${data.data.transaction.id}`
                })
                this.props.clearItemsCheckout()
            })
        } else {
            Transaction.create({
                label: '1',
                items: products.map((val) => val.id),
                coupon_payment: 0,
                coupon_fare: 0,
                insurance: 0,
                method_payment: methodPayment,
                ...type
            }).then(({data}) => {
                this.props.router.push({
                    pathname: `/t/${data.data.transaction.id}`
                })
                this.props.clearItemsCheckout()
            })
        }
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
                    <Container key={val.id} sx={{marginY: 2}}>
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

const mapStateToProps = (state) => ({
    trolley: {
        isSuccess: state.trolley.isSucces,
        isLoading: state.trolley.isLoading,
        checkout: state.trolley.checkout,
        itemsCheckout: state.trolley.itemsCheckout
    },
    transaction: {
        isLoading: state.transaction.isLoading,
        isSuccess: state.transaction.isSuccess,
        data: state.transaction.data
    },
    address: {
        isLoading: state.address.isLoading,
        isSuccess: state.address.isSuccess,
        list: state.address.list,
        address: state.address.address,
        error: state.address.list,
      }
})

const mapDispatchToProps = {
    findTrolley,
    createTransaction,
    clearItemsCheckout,
    getAllAddress,
    find,
    getOne
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(CheckOut))

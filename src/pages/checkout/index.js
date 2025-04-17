import { palleteV1 } from "@/assets/css/template";
import { Close, LocationOn } from "@mui/icons-material";
import { Container, createTheme, ThemeProvider, Box, Typography, Stack, Paper, Grid2 as Grid, Button, Modal, IconButton, Divider, Avatar, AppBar, FormControl, RadioGroup, FormControlLabel, Radio, TextField, InputAdornment, CircularProgress, Chip, Autocomplete, Backdrop } from "@mui/material";
import { withRouter } from "next/router";
import React, {Component} from "react";
import { connect } from "react-redux";
import { findTrolley, clearItemsCheckout } from "@/store/trolley";
import { createTransaction } from "@/store/transaction";
import CryptoJS from "crypto-js";
import { Transaction } from "@/services";
import { getAll as getAllAddress, find, getOne, create } from "@/store/address";
import { SearchOutlined } from "@mui/icons-material";
import AddressMessage from '@/store/address/message'
import { clearMessageRegion, GetCities, GetDistrict, GetProvinces } from "@/store/region";
import { clearMessageShop } from "@/store/shop";
import RegionMessage from '@/store/region/message'
import { City, District } from "@/services/region";
import { NumericFormat } from "react-number-format";
import { Cld } from "@/config";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";


class CheckOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            addresses: [],
            address: {},
            activateAddress: null,
            isOpenModalChangeAddress: false,
            methodPayment: '',
            subtype: {
                bank: '',
                store: ''
            },
            form: {
                name: null,
                receiver: null,
                postal_code: null,
                telephone: null,
                country: null,
                notes: null,
                address: null,
                province: null,
                city: null,
                district: null,
            },
            provinces: [],
            cities: [],
            districts: [],
            selectAddres: {
                province: '',
                city: '',
                district: ''
            },
            isOpenCreateAddress: false
        }
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            }
        })
    }

    componentDidMount() {
        const { trolley } = this.props;
        this.props.getOne();
        this.props.getAllAddress();

        if (trolley.itemsCheckout.length != 0) {
            this.props.findTrolley({
            id: trolley.itemsCheckout
            });
        } else {
            this.props.router.push({
                pathname: '/trolley'
            })
        }
    }

    componentDidUpdate(prevProps) {
    const { trolley, address, region } = this.props;

    // Trolley update
    if (trolley !== prevProps.trolley && trolley.isSuccess) {
        const cart = trolley.checkout.map(val => ({
            id: val.id,
            quantity: val.items,
            product: {
                id: val.trolleyToProduct.id,
                name: val.trolleyToProduct.name,
                price: val.trolleyToProduct.price + val.trolleyToProduct.productToProductVariant.reduce((total, currVal) => total + currVal.price, 0),
                stock: val.trolleyToProduct.stock + val.trolleyToProduct.productToProductVariant.reduce((total, currVal) => total + currVal.stock, 0),
                image: val.trolleyToProduct.productToImage.length !== 0 ? val.trolleyToProduct.productToImage[0].public_id : null
            },
            store: {
                id: val.trolleyToProduct.productToOwner.ownerToStore.id,
                name: val.trolleyToProduct.productToOwner.ownerToStore.name
            }
        }));
        this.setState({ products: cart });
    }

    // Address updates
    if (address !== prevProps.address && address.isSuccess) {
        if (address.message === AddressMessage.ADDRESS.ALL) {
            this.setState({ addresses: address.list.data });
        } else if (address.message === AddressMessage.ADDRESS.CREATE) {
            this.setState({
                isOpenCreateAddress: false,
                isOpenModalChangeAddress: false
            });
        } else {
            this.setState({ address: address.address.data });
        }
    }

    // Region updates
    if (region !== prevProps.region && region.isSuccess) {
        if (region.message === RegionMessage.REGION.PROVINCES) {
            this.setState({ provinces: region.provinces });
        } else if (region.message === RegionMessage.REGION.CITIES) {
            this.setState({ cities: region.cities });
        } else if (region.message === RegionMessage.REGION.DISTRICT) {
            this.setState({ districts: region.districts });
        }
    }
    }

    renderAddress = () => {
        const {address, activateAddress} = this.state

        return(
            <Box>
                {
                    address ? (
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
                    ) : (
                        <Paper
                            sx={{
                                p: 2,
                                borderStyle: 'dashed',
                                borderWidth: 0.5
                            }}
                            elevation={0}
                        >
                            <Typography variant="h5" textAlign={'center'} fontWeight={600}>Anda Tidak Memiliki Alamat Pengiriman Aktif</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <Button sx={{marginY: 2, textTransform: 'capitalize'}} variant="contained" color="info" onClick={this.handleChangeModalCreateAddress}>Buat Alamat Pengiriman</Button>
                            </Box>
                        </Paper>
                    )
                }
            </Box>
        )
    }

    handleChangeModalAddress = () => {
        const {isOpenModalChangeAddress} = this.state

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
                            <Button variant="contained" fullWidth onClick={this.handleChangeModalCreateAddress}>
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
                            !address.isLoading ? 
                                addresses && Boolean(addresses[0]) ? addresses.map((val) => (
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
                                )) :
                                <Box
                                    sx={{
                                        marginX: 'auto',
                                        marginY: 2,
                                    }}
                                >
                                    <Typography variant="h6" textTransform={'capitalize'} textAlign={'center'} fontWeight={400}>Tidak memiliki alamat</Typography>
                                </Box>
                            : 
                                <CircularProgress sx={{marginTop: 2}}/>
                        }
                        </Box>
                    </Box>
                </Container>
            </Modal>
        )
    }

    renderItemCheckout = (data, index = 0) => {
        const {id, product, store, quantity} = data

        console.log(data)

        return (
            <Box>
                <Paper sx={{p: 2}}>
                    <Typography variant="h5" color="gray">Produk {index + 1}</Typography>
                    <Divider sx={{marginY: 1}}/>
                    <Typography variant="h6" fontWeight={600} sx={{marginY: 1}}>{store.name}</Typography>
                    <Grid container spacing={4}>
                        <Grid size={3}>
                            <img
                                style={{
                                    width: '100%',
                                    height: 160,
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    border: '1px solid #a5a5a5'
                                }} 
                                src={Cld.image(product.image ? product.image : 'product-not-found').resize(thumbnail().width(160).height(160)).toURL()}
                                alt={product.name}
                            />
                        </Grid>
                        <Grid size={9} sx={{display: 'flex', justifyContent: 'space-between'}}>
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
        const {methodPayment, products, address, subtype} = this.state

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
                            <Button variant="contained" color="success" disabled={!address ? true : !methodPayment ? methodPayment !== 'qris' ? !subtype.bank || !subtype.store ? true : false : false : false} onClick={this.handleSubmitCreateTransaction} loading={this.props.transaction.isLoading}>Konfirmasi</Button>
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
                    pathname: `/t`,
                    query: {
                        id: data.data.transaction.id
                    }
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
                    pathname: `/t`,
                    query: {
                        id: data.data.transaction.id
                    }
                })
                this.props.clearItemsCheckout()
            })
        }
    }

    renderModalLocation = () => {
        const {provinces, cities, districts, selectAddres, isOpenCreateAddress} = this.state
        const {address, province, city, district} = this.state.form

        return (
            <Modal
                open={isOpenCreateAddress}
                onClose={this.handleChangeModalCreateAddress}
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
                        }}
                    >
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Typography variant="h5" fontWeight={600}>Buat Alamat Pengiriman</Typography>
                            <IconButton onClick={this.handleChangeModalCreateAddress}>
                                <Close/>
                            </IconButton>
                        </Stack>
                        <Divider sx={{marginY: 2}}/>
                        <form onSubmit={this.handleSubmitCreateAddress}>
                            <Box
                                sx={{
                                    height: 400,
                                    overflowY: 'auto'
                                }}
                            >
                                <Box
                                    sx={{
                                        marginY: 2
                                    }}
                                >
                                    <Typography variant='body1'>Nama Alamat</Typography>
                                    <TextField 
                                        name="name"
                                        variant='outlined'
                                        size="small"
                                        fullWidth
                                        sx={{
                                            marginY: 1
                                        }}
                                        onChange={this.handleChangeAddress}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        marginY: 2
                                    }}
                                >
                                    <Typography variant='body1'>Nama Penerima</Typography>
                                    <TextField 
                                        name="receiver"
                                        variant='outlined'
                                        size="small"
                                        fullWidth
                                        sx={{
                                            marginY: 1
                                        }}
                                        onChange={this.handleChangeAddress}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        marginY: 2
                                    }}
                                >
                                    <Typography variant='body1'>Detail Alamat</Typography>
                                    <TextField 
                                        name="address"
                                        variant='outlined'
                                        size="small"
                                        fullWidth
                                        sx={{
                                            marginY: 1
                                        }}
                                        onChange={this.handleChangeAddress}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        marginY: 2
                                    }}
                                >
                                    <Typography variant='body1'>Kode Pos</Typography>
                                    <NumericFormat
                                        customInput={TextField} 
                                        name="postal_code"
                                        variant='outlined'
                                        size="small"
                                        fullWidth
                                        sx={{
                                            marginY: 1
                                        }}
                                        onChange={this.handleChangeAddress}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        marginY: 2
                                    }}
                                >
                                    <Typography variant='body1'>Nomer Telephone</Typography>
                                    <NumericFormat
                                        customInput={TextField} 
                                        name="telephone"
                                        variant='outlined'
                                        size="small"
                                        fullWidth
                                        sx={{
                                            marginY: 1
                                        }}
                                        slotProps={{
                                            input: {
                                                startAdornment: <InputAdornment position="start">+62</InputAdornment>
                                            }
                                        }}
                                        onChange={this.handleChangeAddress}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        marginY: 2
                                    }}
                                >
                                    <Typography variant='body1'>Provinsi</Typography>
                                    <Autocomplete
                                        name="province"
                                        disableClearable
                                        freeSolo
                                        options={provinces}
                                        getOptionLabel={(province) => province.name}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    slotProps={{
                                                        input: {
                                                            ...params.InputProps,
                                                            type: 'search',
                                                        },
                                                    }}
                                                />
                                            )
                                        }}
                                        sx={{
                                            marginY: 1,
                                            textTransform: 'capitalize'
                                        }}
                                        onChange={this.handleSelectProvince}
                                        onOpen={() => {this.props.GetProvinces()}}
                                        loading={this.props.region.isLoading}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        marginY: 2
                                    }}
                                >
                                    <Typography variant='body1'>Kota / Kabupaten</Typography>
                                    <Autocomplete 
                                        name="city"
                                        disableClearable
                                        freeSolo
                                        options={cities}
                                        getOptionLabel={(city) => city.name}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    slotProps={{
                                                        input: {
                                                            ...params.InputProps,
                                                            type: 'search',
                                                        },
                                                    }}
                                                />
                                            )
                                        }}
                                        sx={{
                                            marginY: 1
                                        }}
                                        disabled={!selectAddres.province && !cities ? true : false}
                                        loading={!cities}
                                        onChange={this.handleSelectCity}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        marginY: 2
                                    }}
                                >
                                    <Typography variant='body1'>Kecamatan</Typography>
                                    <Autocomplete
                                        name="district"
                                        disableClearable
                                        freeSolo
                                        options={districts}
                                        getOptionLabel={(district) => district.name}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    slotProps={{
                                                        input: {
                                                            ...params.InputProps,
                                                            type: 'search',
                                                        },
                                                    }}
                                                />
                                            )
                                        }}
                                        sx={{
                                            marginY: 1
                                        }}
                                        disabled={!selectAddres.province && !selectAddres.city && !districts ? true: false}
                                        onChange={this.handleSelectDistrict}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        marginY: 2
                                    }}
                                >
                                    <Typography variant='body1'>Catatan</Typography>
                                    <TextField 
                                        name="notes"
                                        variant='outlined'
                                        size="small"
                                        fullWidth
                                        sx={{
                                            marginY: 1
                                        }}
                                        onChange={this.handleChangeAddress}
                                    />
                                </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'end',
                                        alignItems: 'center',
                                        marginY: 4
                                    }}
                                >
                                <Button
                                    type='submit'
                                    variant="contained"
                                >
                                    Simpan
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Container>
            </Modal>
        )
    }

    handleChangeModalCreateAddress = () => {
        this.setState((state) => ({
            isOpenCreateAddress: !state.isOpenCreateAddress
        }))
    }

    handleChangeAddress = (event) => {
        const {value, name} = event.target

        if (name === 'name') {
            if (value.length != 0) {
                this.setState({
                    form: {
                        ...this.state.form,
                        name: value
                    }
                })
            }
        } else if (name === 'receiver') {
            if (value.length != 0) {
                this.setState({
                    form: {
                        ...this.state.form,
                        receiver: value
                    }
                })
            }
        } else if (name === 'postal_code') {
            if (value.length != 0) {
                this.setState({
                    form: {
                        ...this.state.form,
                        postal_code: value
                    }
                })
            }
        } else if (name === 'telephone') {
            if (value.length != 0) {
                this.setState({
                    form: {
                        ...this.state.form,
                        telephone: value.startsWith("62") ? value : value.startsWith("0") ? `62${value.slice(1)}` : `62${value}`
                    }
                })
            }
        } else if (name === 'notes') {
            if (value.length != 0) {
                this.setState({
                    form: {
                        ...this.state.form,
                        notes: value
                    }
                })
            }
        } else if (name === 'address') {
            if (value.length != 0) {
                this.setState({
                    form: {
                        ...this.state.form,
                        address: value
                    }
                })
            }
        }
    }

    handleSelectProvince = (event, newValue) => {
        const {id, name} = newValue

        this.setState({
            selectAddres: {
                ...this.state.selectAddres,
                province: id
            },
            form: {
                ...this.state.form,
                province: name
            }
        })
        
        this.serviceGetCity({province_id: id})
    }

    serviceGetCity = async (params) => {
        const response = await City(params)

        this.setState({
            cities: response.data
        })
    }

    handleSelectCity = (event, newValue) => {
        const {id, name} = newValue

        this.setState({
            selectAddres: {
                ...this.state.selectAddres,
                city: id
            },
            form: {
                ...this.state.form,
                city: name
            }
        })

        this.serviceGetDistrict({city_id: id})
    }

    serviceGetDistrict = async (params) => {
        const response = await District(params)
        
        this.setState({
            districts: response.data
        })
    }

    handleSelectDistrict = (event, newValue) => {
        const {id, name} = newValue

        this.setState({
            selectAddres: {
                ...this.state.selectAddres,
                district: id
            },
            form: {
                ...this.state.form,
                district: name
            }
        })
    }

    handleSubmitCreateAddress = (e) => {
        e.preventDefault()
        const {address, province, city, district, name, receiver, postal_code, telephone, notes} = this.state.form

        const params = {
            name,
            receiver,
            postal_code,
            telephone,
            country: 'Indonesia',
            notes,
            address,
            province,
            city,
            district,
        }
        
        this.props.create(params)
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
                {this.renderModalLocation()}
                <Backdrop
                    open={this.props.address.isLoading}
                    sx={{
                        zIndex: this.theme.zIndex.appBar + 1000,
                        backgroundColor: 'rgba(236, 236, 236, 0.3)'
                    }}
                >
                    <CircularProgress/>
                </Backdrop>
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
        message: state.address.message,
    },
    region: {
        isSuccess: state.region.isSuccess,
        isLoading: state.region.isLoading,
        message: state.region.message,
        error: state.region.error,
        districts: state.region.district,
        provinces: state.region.provinces,
        cities: state.region.cities,
    },
})

const mapDispatchToProps = {
    findTrolley,
    createTransaction,
    clearItemsCheckout,
    getAllAddress,
    find,
    getOne,
    GetProvinces,
    GetCities,
    GetDistrict,
    clearMessageRegion,
    create,
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(CheckOut))

import { palleteV1 } from "@/assets/css/template";
import { Box, Container, Paper, createTheme, Divider, Avatar, Chip, Grid2 as Grid, Rating, Typography, Button, IconButton, ThemeProvider, Stack, AppBar, Toolbar, Tabs, Tab, Pagination, Card, CardContent, CardMedia } from "@mui/material";
import { withRouter } from "next/router";
import Image from "next/image";
import { QuantityEditor, SelectChip } from "@/components";
import { Favorite, FavoriteBorderOutlined, MoreVert, Share, Star, ThumbUp } from "@mui/icons-material";
import Link from "next/link";
import { connect } from "react-redux";
import { getAll, getOne } from "@/store/products";
import { insertItem } from "@/store/trolley";

import React, { Component } from "react";

const dummy_review = Array.from({ length: 34 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    message: "This is a great product.",
    // rating: Math.floor(Math.random() * 5) + 1,
    date: '12-05-2025',
    love: 1,
}));

const products = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    address: `Bandung`,
    price: new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    }).format(1000 * i),
    image: "https://via.placeholder.com/150",
    // rating: Math.floor(Math.random() * 5) + 1,
    // sold: Math.floor(Math.random() * 100) + 1,
}));

class Product extends Component{
    constructor(props) {
        super(props)
        this.state = {
            favorite: false,
            appBar: 'description',
            product: {
                id: null,
                name: '',
                description: '',
                price: 0,
                stock: 0,
                shop: {
                    id: null,
                    name: '',
                    address: ''
                }
            },
            reviewPagination: {
                offer: 1,
                limit: 5,
                length: 34,
                visibleItem: dummy_review.slice(0, 5)
            },
            otherItemFromStore: {
                offer: 1,
                limit: 12,
                length: 12,
                visibleItem: products.slice(0, 12)
            },
            allItem: {
                offset: 1,
                limit: 36,
                length: 36,
                products: []
            },
            quantityEditor: 1,
        }
    }

    componentDidMount() {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString);

        this.props.getOne({id: urlParams.get('id')})
    }

    UNSAFE_componentWillMount() {
        const {allItem} = this.state
        this.props.getAll({
            limit: allItem.limit,
            offset: allItem.offset
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {query, id} = nextProps.router
        const {products} = nextProps

        if (products.isSuccess) {
            this.setState({
                allItem: {
                    ...this.state.allItem,
                    products: products.allProduct
                }
            })
        }

        if (products.item.isSuccess) {
            this.setState({
                product: {
                    id: products.item.product.id,
                    name: products.item.product.name,
                    description: products.item.product.description,
                    price: products.item.product.price,
                    stock: products.item.product.price,
                    shop: {
                        id: products.item.product.shop.id,
                        name: products.item.product.shop.name,
                        address: products.item.product.shop.address
                    }
                }
            })
        }
    }

    theme = () => createTheme({
        palette: {
            ...palleteV1.palette
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        background: 'none',
                        color: 'black',
                        boxShadow: 'none',
                    }
                }
            }
        }
    })

    handleFavorite = () => {
        const {favorite} = this.state

        this.setState({
            favorite: !favorite
        })
    }

    renderProduct = () => {
        const {query, favorite, product} = this.state
        const {id, name, description, price, stock, shop} = product

        return(
            <Container>
                <Box sx={{bgcolor: 'white', border: 1, borderColor: 'gray', p: 4, borderRadius: 2}}>
                    <Grid container columnSpacing={4}>
                        <Grid size="auto">
                            <Image width={320} height={320} src={'/assets/skeleton/product.jpg'}/>
                        </Grid>
                        <Grid size="grow">
                            <Box sx={{width: '100%'}}>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Typography variant="h5">{name}</Typography>
                                    <Stack direction="row" spacing={2}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <IconButton onClick={() => this.handleFavorite()}>
                                                {favorite ? <Favorite color="pink"/> : <FavoriteBorderOutlined color="pink"/>}
                                            </IconButton>
                                            <Typography variant="subtitle1">(90)</Typography>
                                        </div>
                                        <IconButton>
                                            <Share/>
                                        </IconButton>
                                    </Stack>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div>
                                        <Rating
                                            defaultValue={2.5}
                                            readOnly
                                        />
                                    </div>
                                    <Divider flexItem orientation="vertical" variant="middle" sx={{
                                        marginInline: 2
                                    }} />
                                    <p>
                                        Terjual 100
                                    </p>
                                </Box>
                                <Typography variant="h5" sx={{fontWeight: 600, marginTop: 2}}>
                                    {
                                        new Intl.NumberFormat('id-ID', {
                                            style: "currency",
                                            currency: "IDR"
                                        }).format(price)
                                    }
                                </Typography>
                                <Divider sx={{marginY: 4}}/>
                                <Box sx={{
                                    '*': {
                                        marginBottom: 1
                                    }
                                }}>
                                    <Typography variant="subtitle2">Kondisi: <b>Baru</b></Typography>
                                    <Typography variant="subtitle2">Min. Pembelian: <b>1</b> Buah</Typography>
                                    <Typography variant="subtitle2">Kategori: <b>Benda</b></Typography>
                                    <Typography variant="subtitle2">Berat benda: <b>1</b> Gram</Typography>
                                </Box>
                                <Divider sx={{marginY: 4}}/>
                                <Grid container columnSpacing={2} >
                                    <Grid>
                                        <Avatar/>
                                    </Grid>
                                    <Grid>
                                        <Typography variant="h6">
                                            {shop.name}
                                        </Typography>
                                        <Rating defaultValue={4} readOnly/>
                                        <Typography variant="subtitle2">
                                            Aktif 1 menit yang lalu
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        <Grid container direction={'column'} spacing={1}>
                                            <Grid>
                                                <Button variant="outlined" sx={{width: 100}}>
                                                    Follow
                                                </Button>
                                            </Grid>
                                            <Grid>
                                                <Button variant="contained" sx={{width: 100}}>
                                                    Chat
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        )
    }

    renderAddTrolley = () => {
        const {query, favorite, product, quantityEditor} = this.state
        const {id, name, description, price, stock, shop} = product

        const dummy_color = [
            {id: 0, name: 'green'},
            {id: 1, name: 'blue'},
            {id: 2, name: 'green'},
        ]

        return(
            <Container>
                <Box sx={{border: 1, borderColor: 'gray', p: 2, borderRadius: 2}}>
                    <Typography variant="h6" sx={{fontWeight: 600}}>Atur Pembelian</Typography>
                    <Divider sx={{marginBottom: 4}}/>
                    <Box>
                        <Box sx={{marginBottom: 2}}>
                            <Typography variant="subtitle1" sx={{marginBottom: 1}}>Kuantitas:</Typography>
                            <Box sx={{display: 'inline-flex', alignItems: 'center'}}>
                                <QuantityEditor
                                    initialQuantity={quantityEditor}
                                    min={1}
                                    max={stock}
                                    onChange={(name, value) => {this.setState({quantityEditor: value})}}
                                />
                                <Typography variant="subtitle1" sx={{marginLeft: 2}}>
                                    Total Stok: {stock}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{marginBottom: 2}}>
                            <Typography variant="subtitle1">Pilih</Typography>
                            <SelectChip
                                options={dummy_color}
                            />
                        </Box>
                        {/* <Box>
                            <Typography variant="subtitle1">Pilih</Typography>
                            
                        </Box> */}
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2}}>
                            <Typography variant="subtitle1" sx={{fontWeight: 500}}>Subtotal</Typography>
                            <Typography variant="h6" sx={{fontWeight: 600}}>
                                {
                                    new Intl.NumberFormat('id-ID', {
                                        style: "currency",
                                        currency: "IDR"
                                    }).format(price * quantityEditor) 
                                }
                            </Typography>
                        </Box>
                        <Button variant="contained" sx={{marginBottom: 1, width: '100%'}} onClick={this.handleInsertItemToTrolley}>Tambah Ke Keranjang</Button>
                        <Button variant="outlined" sx={{width: '100%'}}>Beli Langsung</Button>
                    </Box>
                </Box>
            </Container>
        )
    }

    handleInsertItemToTrolley = () => {
        const {product, quantityEditor} = this.state

        this.props.insertItem({
            products: [
                {
                    id: product.id,
                    items: quantityEditor
                }
            ]
        })
    }

    renderDescriptionProduct = () => {
        const {query, favorite, product} = this.state
        const {id, name, description, price, stock, shop} = product

        return(
            <Container maxWidth="xl" sx={{marginBottom: 6}}>
                <Box sx={{
                    maxHeight: '60vh',
                    overflowY: 'auto',
                    p: 2
                }}>
                    {description}
                </Box>
            </Container>
        )
    }

    renderReviewProduct = () => {
        const {reviewPagination} = this.state
        const {offer, limit, visibleItem, length} = reviewPagination

        const  dummy_rating = [
            {label: 5, value: 12},
            {label: 4, value: 10},
            {label: 3, value: 28},
            {label: 2, value: 25},
            {label: 1, value: 25},
        ]

        return(
            <Container maxWidth="xl">
                <Container maxWidth="lg" sx={{p: 2, marginBottom: 4}}>
                    <Box sx={{border:1 ,borderRadius: 1, borderColor: '#ababab', py:2, px:4, display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                        <Grid container columnSpacing={4}>
                            <Grid container direction={"column"} size={'auto'} rowSpacing={1} sx={{alignItems: 'center'}}>
                                <Grid>
                                    <Box sx={{display: 'flex', alignItems: 'center', '*': {marginRight: 2}}}>
                                        <Star fontSize="large"/>
                                        <Typography variant="h4">
                                            4.8 / 5.0
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid>
                                    <Rating
                                        defaultValue={4.8}
                                        readOnly
                                        precision={0.1}
                                    />
                                </Grid>
                                <Grid>
                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={2}
                                    >
                                        <Typography variant="subtitle1">
                                            100 Rating
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            85 Ulasan
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Grid size={'auto'}>
                                <Grid direction={'row'} columns={3}>
                                    {dummy_rating.map((val, index) => (
                                        <Grid size={1} key={index}>
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <Rating readOnly defaultValue={val.label}/>
                                                <Typography variant="h6" sx={{marginLeft: 1}}>{val.value}</Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider variant="middle" orientation="vartical" flexItem/>
                        <Grid>
                            <Container maxWidth="sm">
                                <Typography variant="h6" sx={{fontWeight: 600}}>Filter Ulasan</Typography>
                                <Stack 
                                    direction={'row'} 
                                    useFlexGap
                                    sx={{ flexWrap: 'wrap' }}
                                    spacing={1}
                                >
                                    <Chip label="Semua" variant={ 1 == 1 ? "contained" : "outlined"} onClick={() => console.log()} />
                                    <Chip label={<Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center'}}>5 <Star fontSize="small"/></Typography>} variant="outlined" onClick={() => console.log()} />
                                    <Chip label={<Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center'}}>4 <Star fontSize="small"/></Typography>} variant="outlined" onClick={() => console.log()} />
                                    <Chip label={<Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center'}}>3 <Star fontSize="small"/></Typography>} variant="outlined" onClick={() => console.log()} />
                                    <Chip label={<Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center'}}>2 <Star fontSize="small"/></Typography>} variant="outlined" onClick={() => console.log()} />
                                    <Chip label={<Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center'}}>1 <Star fontSize="small"/></Typography>} variant="outlined" onClick={() => console.log()} />
                                    <Chip label={'Dengan Media'} variant="outlined" onClick={() => console.log()} />
                                    <Chip label={'Pengiriman Cepat'} variant="outlined" onClick={() => console.log()} />
                                    <Chip label={'Pelayanan Terbaik'} variant="outlined" onClick={() => console.log()} />
                                    <Chip label={'Sesuai Deskripsi'} variant="outlined" onClick={() => console.log()} />
                                </Stack>
                            </Container>
                        </Grid>
                    </Box>
                </Container>
                {visibleItem.map((val) => 
                <Container key={val.id} sx={{marginBottom: 4}}>
                    <Box sx={{marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Box>
                            <Grid container columnSpacing={2}>
                                <Grid>
                                    <Avatar {...this.handleSplitCharacter(val.name)}/>
                                </Grid>
                                <Grid>
                                    <Typography variant="subtitle1">{val.name}</Typography>
                                    <Rating readOnly defaultValue={5} size="small"/>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <Stack 
                                direction="row" 
                                spacing={2} sx={{
                                    // justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="subtitle1">
                                    {val.date}
                                </Typography>
                                <IconButton>
                                    <MoreVert/>
                                </IconButton>
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{marginBottom: 2}}>
                        <Typography variant="body1">{val.message}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <IconButton>
                            <ThumbUp/>
                        </IconButton>
                        <Typography variant="subtitle1" sx={{marginRight: 1}}>{val.love}</Typography>
                        <Typography variant="subtitle1">Disukai</Typography>
                    </Box>
                    <Divider/>
                </Container>
                )}
                <Pagination
                    count={Math.ceil(length / limit)}
                    page={offer}
                    onChange={this.handlePagenationReview}
                    color="primary"
                    sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
                />
            </Container>
        )
    }

    handlePagenationReview = (event, value) => {
        const {limit} = this.state.reviewPagination
        const startIndex = (value-1) * limit

        this.setState({
            reviewPagination: {
                ...this.state.reviewPagination,
                offer: value,
                visibleItem: dummy_review.slice(startIndex, startIndex + limit),
            }
        })
    }

    handleRandomColor = (string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    handleSplitCharacter = (value) => {
        return {
            sx: {
                bgcolor: this.handleRandomColor(value),
              },
            children: `${value.split(' ')[0][0]}${value.split(' ')[1][0]}`,
        }
    }

    handleChangeAppBar = (event, newValue) => {
        this.setState({
            appBar: newValue
        })
    }

    renderViewProductStore = () => {
        const {offer, limit, visibleItem, length} = this.state.otherItemFromStore

        return (
            <Box>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h4" gutterBottom>
                        Produk dari toko kami
                    </Typography>
                    <Button variant="text" sx={{textTransform: 'lowercase'}}>
                        Lihat semua
                    </Button>
                </div>
                <Grid container spacing={4} rowSpacing={2} columnSpacing={2} sx={{marginTop: 4}}>
                    {visibleItem.map((product) => (
                        <Grid key={product.id} size={2}>
                            <Link href={{
                                pathname: `/p/${product.name}`,
                                query: {id: product.id}
                                }}
                                style={{textDecoration: 'none'}}
                            >
                                <Card sx={{textDecoration: 'none'}}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={product.image}
                                        alt={product.name}
                                    />
                                    <CardContent sx={{'*': {marginBottom: 0.5, textDecoration: 'none'}}}>
                                        <Typography variant="subtitle1">{product.name}</Typography>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                        {product.price}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                        {product.address}
                                        </Typography>
                                        <Stack direction={'row'} spacing={1} divider={<Divider orientation='vertical' flexItem/>}>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <Star fontSize='small' color='yellow'/>
                                                <Typography variant="body2" color="textSecondary">
                                                    4
                                                </Typography>
                                            </div>
                                            <Typography variant='body2' color='textSecondary'>
                                                100 terjual
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        )
    }

    renderAllProduct = () => {
        const {offset, limit, products} = this.state.allItem

        return (
            <Box>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h4" gutterBottom>
                        Produk yang mungkin disukai
                    </Typography>
                    <Button variant="text" sx={{textTransform: 'lowercase'}}>
                        Lihat semua
                    </Button>
                </div>
                <Grid container spacing={4} rowSpacing={2} columnSpacing={2} sx={{marginTop: 4}}>
                    {products.map((product) => (
                        <Grid key={product.id} size={3}>
                            <Link href={{
                                pathname: `/p/${product.name}`,
                                query: {id: product.id}
                                }}
                                style={{textDecoration: 'none'}}
                            >
                                <Card sx={{textDecoration: 'none'}}>
                                    <Paper sx={{p:3}}>

                                    </Paper>
                                    <CardContent sx={{'*': {marginBottom: 0.5, textDecoration: 'none'}}}>
                                        <Typography variant="subtitle1">{product.name}</Typography>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                        {
                                            new Intl.NumberFormat('id-ID', {
                                                style: "currency",
                                                currency: "IDR"
                                            }).format(product.price)
                                        }
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                        {product.productToOwner.ownerToStore.name}
                                        </Typography>
                                        <Stack direction={'row'} spacing={1} divider={<Divider orientation='vertical' flexItem/>}>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <Star fontSize='small' color='yellow'/>
                                                <Typography variant="body2" color="textSecondary">
                                                    4
                                                </Typography>
                                            </div>
                                            <Typography variant='body2' color='textSecondary'>
                                                100 terjual
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        )
    }

    render() {
        const {appBar} = this.state

        return(
            <ThemeProvider theme={this.theme}>
                <Container maxWidth="xl">
                    <Grid container columnSpacing={2} sx={{marginBottom: 6}}>
                        <Grid size={8}>
                            {this.renderProduct()}
                        </Grid>
                        <Grid size={4}>
                            {this.renderAddTrolley()}
                        </Grid>
                    </Grid>
                    <Container maxWidth="xl">
                        <Box sx={{border: '1px solid gray', borderRadius: 2, p:2}}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs value={appBar} onChange={this.handleChangeAppBar} aria-label="tabel panel product">
                                    <Tab label="Description" value="description"/>
                                    <Tab label="Review" value="review"/>
                                </Tabs>
                            </Box>
                            {
                                appBar === 'description' ? this.renderDescriptionProduct() :
                                appBar === 'review' ? this.renderReviewProduct() : ''
                            }
                        </Box>
                    </Container>
                    <Container maxWidth="xl" sx={{marginY: 4}}>
                        {this.renderViewProductStore()}
                    </Container>
                    <Container maxWidth="xl" sx={{marginY: 4}}>
                        {this.renderAllProduct()}
                    </Container>
                </Container>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    products: {
        isLoading: state.product.isLoading,
        isSuccess: state.product.isSuccess,
        allProduct: state.product.show,
        error: state.product.error,
        item: state.product.data,
        totalItems: state.product.totalItems,
    }
})

const mapDispatchToProps = {
    getAll,
    getOne,
    insertItem
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Product))
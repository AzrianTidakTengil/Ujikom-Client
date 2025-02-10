import { palleteV1 } from "@/assets/css/template";
import { Box, Container, createTheme, Divider, Avatar, Chip, Grid2 as Grid, Rating, Typography, Button, IconButton, ThemeProvider, Stack } from "@mui/material";
import { withRouter } from "next/router";
import Image from "next/image";
import { QuantityEditor, SelectChip } from "@/components";
import { Favorite, FavoriteBorderOutlined, MoreVert, Star, ThumbUp } from "@mui/icons-material";

const { Component } = require("react");

class Product extends Component{
    constructor(props) {
        super(props)
        this.state = {
            query: {
                id: null,
                name: null
            },
            favorite: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {query} = nextProps.router
        
        this.setState({
            query: {
                ...this.state.query,
                name: query.slug
            }
        })
    }

    theme = () => createTheme({
        palette: {
            ...palleteV1.palette
        }
    })

    handleFavorite = () => {
        const {favorite} = this.state

        this.setState({
            favorite: !favorite
        })
    }

    renderProduct = () => {
        const {query, favorite} = this.state

        return(
            <Container>
                <Box sx={{bgcolor: 'white', border: 1, borderColor: 'gray', p: 4, borderRadius: 2}}>
                    <Grid container columnSpacing={4}>
                        <Grid size="auto">
                            <Image width={400} height={400}/>
                        </Grid>
                        <Grid size="grow">
                            <Box sx={{width: '100%'}}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Typography variant="h4">{query.name}</Typography>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <IconButton onClick={() => this.handleFavorite()}>
                                        {favorite ? <Favorite color="pink"/> : <FavoriteBorderOutlined color="pink"/>}
                                    </IconButton>
                                    <Typography variant="subtitle1">(90)</Typography>
                                </div>
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
                            <Typography variant="h4" sx={{fontWeight: 600, marginTop: 2}}>
                                Rp. 100.000
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
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        )
    }

    renderAddTrolley = () => {
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
                                    initialQuantity={1}
                                    min={1}
                                    max={100}
                                />
                                <Typography variant="subtitle1" sx={{marginLeft: 2}}>
                                    Total Stok: 120
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
                            <Typography variant="h6" sx={{fontWeight: 600}}>Rp. 100.000</Typography>
                        </Box>
                        <Button variant="contained" sx={{marginBottom: 1, width: '100%'}}>Tambah Ke Keranjang</Button>
                        <Button variant="outlined" sx={{width: '100%'}}>Beli Langsung</Button>
                    </Box>
                </Box>
            </Container>
        )
    }

    renderDescriptionProduct = () => {
        const dummy_text = <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        return(
            <Container maxWidth="xl" sx={{marginBottom: 6}}>
                <Box sx={{border: 1, borderColor: 'gray', p: 2, borderRadius: 2}}>
                    <Typography variant="h5" sx={{fontWeight: 600}}>Deskripsi Produk</Typography>
                    <Divider/>
                    <Box>
                        {dummy_text}
                        {dummy_text}
                        {dummy_text}
                        {dummy_text}
                        {dummy_text}
                    </Box>
                </Box>
            </Container>
        )
    }

    renderReviewProduct = () => {
        const  dummy_rating = [
            {label: 5, value: 12},
            {label: 4, value: 10},
            {label: 3, value: 28},
            {label: 2, value: 25},
            {label: 1, value: 25},
        ]

        return(
            <Container maxWidth="xl" sx={{marginBottom: 6}}>
                <Box sx={{border: 1, borderColor: 'gray', p: 2, borderRadius: 2}}>
                    <Typography variant="h5" sx={{fontWeight: 600}}>Ulasan Produk</Typography>
                    <Divider/>
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
                    <Container>
                        <Box sx={{marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Box>
                                <Grid container columnSpacing={2}>
                                    <Grid>
                                        <Avatar {...this.handleSplitCharacter('Azrian Hanif')}/>
                                    </Grid>
                                    <Grid>
                                        <Typography variant="subtitle1">Azrian Hanif</Typography>
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
                                        5 Bulan lalu
                                    </Typography>
                                    <IconButton>
                                        <MoreVert/>
                                    </IconButton>
                                </Stack>
                            </Box>
                        </Box>
                        <Box sx={{marginBottom: 2}}>
                            <Typography variant="body1">Keren sekali saya suka</Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <IconButton>
                                <ThumbUp/>
                            </IconButton>
                            <Typography variant="subtitle1" sx={{marginRight: 1}}>5</Typography>
                            <Typography variant="subtitle1">Disukai</Typography>
                        </Box>
                    </Container>
                </Box>
            </Container>
        )
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

    renderAllProduct = () => {
        return (
            <Container sx={{marginTop: 6}}>
                <Typography variant="h4" gutterBottom className={playfair.className}>
                    Jelajahi Produk Hari Ini
                </Typography>
                <Grid container spacing={4} rowSpacing={2} columnSpacing={2} sx={{marginTop: 4}}>
                    {visibleProducts.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <Link href={{
                                pathname: `/p/${product.name}`,
                                query: {id: product.id}
                            }}>
                                <Card sx={{textDecoration: 'none'}}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={product.image}
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{product.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                        {product.description}
                                        </Typography>
                                        <Typography variant="h6" color="primary">
                                        {product.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        )
    }

    render() {
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
                    {this.renderDescriptionProduct()}
                    {this.renderReviewProduct()}
                </Container>
            </ThemeProvider>
        )
    }
}

export default withRouter(Product)
import { Component } from 'react';
import { Container, Stack, createTheme, Typography, Grid2 as Grid, Card, CardActionArea, CardContent, CardMedia, Pagination, Button, Rating, Divider, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails, FormControl, Select, MenuItem, ThemeProvider, Paper, RadioGroup, Radio } from '@mui/material';
import { Playfair_Display, Poppins } from "next/font/google";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter, withRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { ExpandMore, Filter, FilterAlt, SearchOff, SearchOutlined, Star } from '@mui/icons-material';
import { InputPrice, InputText } from '@/components/input';
import { palleteV1 } from '@/assets/css/template';
import Link from 'next/link';
import { Cld } from '@/config';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { findProduct } from '@/store/products';
import { connect } from 'react-redux';

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            keyword: null,
            listProduct: [],
            city: [],
            filter: {},
        }
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            }
        })
    }

    componentDidMount() {
        const { router } = this.props;
      
        if (router.query.keyword) {
          this.props.findProduct({ keyword: router.query.keyword });
          this.setState({ keyword: router.query.keyword });
        }
    }
      
    componentDidUpdate(prevProps) {
        const { router, products } = this.props;
      
        // Check if the keyword in the query has changed
        if (router.query.keyword !== prevProps.router.query.keyword) {
          this.props.findProduct({ keyword: router.query.keyword });
          this.setState({ keyword: router.query.keyword });
        }
      
        // Check if product results have changed
        if (products.isSuccess && products !== prevProps.products) {
          this.setState({ listProduct: products.show });
        }
      }
      

    renderProducts = () => {
        const {visibleProducts, offeringProduct, limitProduct, keyword, listProduct} = this.state

        return(
            <>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <SearchOutlined/>
                        <Typography variant='subtitle1'>Hasil pencarian untuk <b>{keyword}</b></Typography>
                    </div>
                    <div>
                        <FormControl>
                            <Select
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                defaultValue={1}
                            >
                                <MenuItem value={1}>Terkait</MenuItem>
                                <MenuItem value={2}>Terbaik</MenuItem>
                                <MenuItem value={3}>Terlaris</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <Grid container spacing={4} rowSpacing={2} columnSpacing={2} columns={10}>
                    {listProduct.map((product) => (
                       <Grid key={product.id} size={{xs: 6, sm: 4, md:2.5, lg: 2}}>
                            <Link href={{
                                pathname: `/p/${encodeURIComponent(product.name)}`,
                                query: {id: product.id}
                                }}
                                style={{textDecoration: 'none'}}
                            >
                                <Card sx={{textDecoration: 'none'}}>
                                    <CardMedia
                                        component="img"
                                        height={160}
                                        width={160}
                                        image={Cld.image(product.productToImage.length != 0 ? product.productToImage[0].public_id : 'product-not-found').resize(thumbnail().width(160).height(160)).toURL()}
                                        alt={product.name}
                                    />
                                    <CardContent sx={{'*': {marginBottom: 0.5, textDecoration: 'none'}}}>
                                        <Typography 
                                            variant="subtitle1"
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                display: "-webkit-box",
                                            }}
                                        >
                                            {product.name}
                                        </Typography>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                        {
                                            new Intl.NumberFormat('id-ID', {
                                                style: "currency",
                                                currency: "IDR"
                                            }).format(product.productToProductVariant.length != 0 ? product.productToProductVariant[0].price : product.price)
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
                {/* <Pagination
                    count={Math.ceil(products.length / limitProduct)}
                    page={offeringProduct}
                    onChange={this.handlePageChange}
                    color="primary"
                    sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
                /> */}
            </>
        )
    }

    // handlePageChange = (event, value) => {
    //     const {limitProduct} = this.state
    //     const startIndex = (value - 1) * limitProduct

    //     this.setState({
    //         offeringProduct: value,
    //         visibleProducts: products.slice(startIndex, startIndex + limitProduct)
    //     });

    //     window.scroll(0,0)
    // };

    renderFilter = () => {
        const { city, filter } = this.state;

        const dummyCity = [
            { id: 1, name: 'Jakarta' },
            { id: 2, name: 'Bandung' },
            { id: 3, name: 'Surabaya' },
            { id: 4, name: 'Medan' },
        ];

        return (
            <Paper
                className='p-4 w-full'
            >
                <h4 className='font-bold text-2xl'>Filter</h4>
                <Divider className='my-2'/>
                <div className='flex flex-col my-2 space-y-1.5'>
                    <div>
                        <h5 className='font-semibold text-lg'>Lokasi</h5>
                        <FormControl>
                            <RadioGroup name='location' onChange={this.handleLocationChange} value={filter.location || ''}>
                                {
                                    dummyCity.map((item) => (
                                        <FormControlLabel 
                                            key={item.id} 
                                            value={item.name} 
                                            control={<Radio />} 
                                            label={item.name} 
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                        <h5 className='font-semibold text-lg'>Harga</h5>
                        <InputPrice label="Min. Harga" name="minPrice" className="!my-2" onValueChange={this.handlePriceChange} value={filter.minPrice || 0}/>
                        <InputPrice label="Max. Harga" name="maxPrice" className="!my-2" onValueChange={this.handlePriceChange} value={filter.maxPrice || 0}/>
                    </div>
                    <div>
                        <h5 className='font-semibold text-lg'>Perngiriman</h5>
                        <FormControl>
                            <RadioGroup name="shipping" onChange={this.handleShippingChange} value={filter.shipping || ''}>
                                <FormControlLabel value="instan" control={<Radio/>} label="Instan" />
                                <FormControlLabel value="same day" control={<Radio/>} label="Same day" />
                                <FormControlLabel value="reguler" control={<Radio/>} label="Reguler" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <Button variant='contained' className='!my-2' fullWidth onClick={this.handleRisetFilter}>Riset</Button>
            </Paper>
        )
    }

    handleLocationChange = (event) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            filter: {
                ...prevState.filter,
                location: value,
            },
        }));
    };

    handleMinPriceChange = (values) => {
        this.setState((prevState) => ({
            filter: {
                ...prevState.filter,
                minPrice: parseInt(values.value) || '',
            },
        }));
    };

    handleMaxPriceChange = (values) => {
        this.setState((prevState) => ({
            filter: {
                ...prevState.filter,
                maxPrice: parseInt(values.value) || '',
            },
        }));
    };

    handleShippingChange = (event) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            filter: {
                ...prevState.filter,
                shipping: value,
            },
        }));
    };

    handleRisetFilter = () => {
        const { filter } = this.state;
        const { router } = this.props;
        this.setState({ filter: {} });
        const query = { ...router.query, ...filter };
        this.props.findProduct(query);
    };

    render() {
        return(
            <ThemeProvider theme={this.theme}>
                <Container maxWidth="xl">
                    <div className='grid grid-cols-6 gap-4 mt-4'>
                        <div className='col-span-5 h-[2000px]'>{this.renderProducts()}</div>
                        <div>{this.renderFilter()}</div>
                    </div>
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
        totalItems: state.product.totalItems,
        show: state.product.show,
    }
})

const mapDispatchToProps = {
    findProduct
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Search))
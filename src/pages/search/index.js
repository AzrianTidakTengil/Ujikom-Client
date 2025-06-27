import { Component, createRef } from 'react';
import { Container, Stack, createTheme, Typography, Grid2 as Grid, Card, CardActionArea, CardContent, CardMedia, Pagination, Button, Rating, Divider, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails, FormControl, Select, MenuItem, ThemeProvider, Paper, RadioGroup, Radio, Popover, IconButton, useTheme, useMediaQuery, Modal, SwipeableDrawer } from '@mui/material';
import { Playfair_Display, Poppins } from "next/font/google";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter, withRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { Close, ExpandMore, Filter, FilterAlt, SearchOff, SearchOutlined, Star } from '@mui/icons-material';
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
            popover: false,
            findLocation: '',
            isMobile: false,
            openFilterMobile: false,
        }
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            }
        })
        this.anchorEl = createRef();
    }

    componentDidMount() {
        const { router } = this.props;
      
        if (router.query.keyword) {
          this.props.findProduct({ keyword: router.query.keyword });
          this.setState({ keyword: router.query.keyword });
        }

        this.mediaQuery = window.matchMedia('(max-width: 48rem)');
        this.setState({ isMobile: this.mediaQuery.matches });
        this.mediaQuery.addEventListener('change', (e) => {
            this.setState({ isMobile: e.matches });
        });
    }

    componentWillUnmount() {
        this.mediaQuery.removeEventListener('change', this.handleMediaQueryChange);
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
        const {visibleProducts, offeringProduct, limitProduct, keyword, listProduct, isMobile} = this.state

        return(
            <div>
                <div className='flex flex-row items-center justify-end md:justify-between mb-4'>
                    <div className='md:flex items-center gap-2 hidden'>
                        <SearchOutlined/>
                        <Typography variant='subtitle1'>Hasil pencarian untuk <b>{keyword}</b></Typography>
                    </div>
                    <div>
                        <FormControl>
                            <Select
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                defaultValue={1}
                                size={isMobile ? 'small' : 'medium'}
                            >
                                <MenuItem value={1}>Terkait</MenuItem>
                                <MenuItem value={2}>Terbaik</MenuItem>
                                <MenuItem value={3}>Terlaris</MenuItem>
                            </Select>
                        </FormControl>
                        <div className='inline-block ml-2 lg:hidden'>
                            <IconButton onClick={this.handleOpenOrCloseModalFilterMobile}>
                                <FilterAlt fontSize='medium'/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className='overflow-y-auto max-h-[85dvh] scrollbar-thin scrollbar-thumb-secondary-main scrollbar-track-secondary-light/50'>
                    <Grid container spacing={4} rowSpacing={2} columnSpacing={2} columns={10} height={3000}>
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
                </div>
                {/* <Pagination
                    count={Math.ceil(products.length / limitProduct)}
                    page={offeringProduct}
                    onChange={this.handlePageChange}
                    color="primary"
                    sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
                /> */}
            </div>
        )
    }

    handleOpenOrCloseModalFilterMobile = () => {
        this.setState((prevState) => ({
            openFilterMobile: !prevState.openFilterMobile,
        }));
    };

    renderFilterMobile = () => {
        const { openFilterMobile } = this.state;

        return (
            <SwipeableDrawer
                open={openFilterMobile}
                onClose={this.handleOpenOrCloseModalFilterMobile}
                anchor='right'
                keepMounted
            >
                <Paper className='w-64 h-full p-4'>
                    <div className='flex items-center justify-between mb-4'>
                        <h4 className='font-bold text-2xl'>Filter</h4>
                        <IconButton onClick={this.handleOpenOrCloseModalFilterMobile}>
                            <Close/>
                        </IconButton>
                    </div>
                    <Divider className='my-2'/>
                    { this.renderInputFilter() }
                </Paper>
            </SwipeableDrawer>
        )
    }

    renderFilter = () => {
        const { city, filter } = this.state;

        const dummyCity = [
            { id: 1, name: 'Jakarta' },
            { id: 2, name: 'Bandung' },
            { id: 3, name: 'Surabaya' },
        ];

        return (
            <Paper
                className='p-4 w-full'
                ref={this.anchorEl}
            >
                <h4 className='font-bold text-2xl'>Filter</h4>
                <Divider className='my-2'/>
                {this.renderInputFilter()}
            </Paper>
        )
    }

    renderInputFilter = () => {
        const { city, filter } = this.state;

        const dummyCity = [
            { id: 1, name: 'Jakarta' },
            { id: 2, name: 'Bandung' },
            { id: 3, name: 'Surabaya' },
        ];

        return (
            <>
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
                        <Button variant='text' className='text-thin italic' size='small' onClick={this.handleOpenOrCloseSearchLocation}>Cari Tempat Anda</Button>
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
                <Button variant='contained' className='!my-2' fullWidth onClick={this.handleRisetFilter} color='secondary'>Riset</Button>
            </>
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

    handleOpenOrCloseSearchLocation = () => {
        this.setState((prevState) => ({
            popover: !prevState.popover,
        }));
    }

    renderSearchLocation = () => {
        const { anchorEl, state } = this;
        const { popover, findLocation } = state;

        return (
            <Popover
                open={popover}
                anchorEl={anchorEl.current}
                onClose={this.handleOpenOrCloseSearchLocation}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div className='p-4 w-[400px]'>
                    <div className='flex items-center justify-between mb-4'>
                        <InputText fullWidth size="small" sx={{mr: 2}} onChange={this.handleFindLocation}/>
                        <IconButton onClick={this.handleOpenOrCloseSearchLocation}><Close/></IconButton>
                    </div>
                    <div className='h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-secondary-light scrollbar-track-secondary-main'>
                        <div className='h-[1000px]'></div>
                    </div>
                </div>  
            </Popover>
        )
    }

    handleFindLocation = (event) => {
        this.setState({ findLocation: event.target.value });
    };


    render() {
        const { isMobile } = this.state;

        return(
            <ThemeProvider theme={this.theme}>
                <Container maxWidth="xl">
                    <div className='grid grid-cols-6 gap-4 mt-4'>
                        <div className='col-span-6 lg:col-span-5'>{this.renderProducts()}</div>
                        <div className='hidden lg:block'>{this.renderFilter()}</div>
                    </div>
                    {this.renderSearchLocation()}
                    {isMobile ? this.renderFilterMobile() : null}
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
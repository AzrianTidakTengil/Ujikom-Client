import { Component } from 'react';
import { Container, Stack, createTheme, Typography, Grid2 as Grid, Card, CardActionArea, CardContent, CardMedia, Pagination, Button, Rating, Divider, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails, FormControl, Select, MenuItem, ThemeProvider } from '@mui/material';
import { Playfair_Display, Poppins } from "next/font/google";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter, withRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { ExpandMore, Filter, FilterAlt, SearchOff, SearchOutlined, Star } from '@mui/icons-material';
import { InputText } from '@/components/input';
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
                                pathname: `/p/${product.name}`,
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
        return (
            <Card>
                <CardContent>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <FilterAlt/>
                        <Typography variant='h5'>Filter</Typography>
                    </div>
                    <Grid container rowSpacing={2} columns={1} sx={{marginTop: 4}}>
                        <Grid size={1}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMore/>}
                                    aria-controls="panel-content"
                                >
                                    <Typography variant='subtitle1' sx={{marginBottom: 2}}>Kategori bersangkutan</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} label="Handphone" />
                                        <FormControlLabel control={<Checkbox />} label="Eletronic" />
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid size={1}>
                            <Typography variant='subtitle1' sx={{marginBottom: 2}}>Rating</Typography>
                            <div style={{width: '100%', margin: 'auto'}}>
                                <Rating
                                    name='rating'
                                    defaultValue={4}
                                />
                            </div>
                        </Grid>
                        <Grid size={1}>
                            <Typography variant='subtitle1'>Harga</Typography>
                            <InputText label="Min. Harga" style={{marginTop: 5}}/>
                            <InputText label="Max. Harga" style={{marginTop: 5}}/>
                        </Grid>
                        <Grid size={1}>
                            <Typography variant='subtitle1'>Tipe Toko</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Official" />
                                <FormControlLabel control={<Checkbox />} label="Top Star" />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Button variant='contained' sx={{marginTop: 6, width: '100%'}}>Riset</Button>
                </CardContent>
            </Card>
        )
    }

    render() {
        return(
            <ThemeProvider theme={this.theme}>
                <Container maxWidth="xl">
                    <Grid container columnSpacing={3}>
                        <Grid size={2.5}>
                            {this.renderFilter()}
                        </Grid>
                        <Grid size="grow">
                            {this.renderProducts()}
                        </Grid>
                    </Grid>
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
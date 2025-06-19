import { Carousel } from '@/components';
import { Component } from 'react';
import { Container, Typography, Paper, Grid2 as Grid, Card, CardActionArea, CardContent, CardMedia, Button, Pagination, Stack, Divider, createTheme, ThemeProvider } from '@mui/material';
import { Playfair_Display, Poppins } from "next/font/google";
import Link from 'next/link';
import { 
    Star,
    Devices,
    Checkroom,
    Home,
    SportsSoccer,
    FaceRetouchingNatural,
    LocalHospital,
    ChildFriendly,
    DirectionsCar,
    ShoppingBasket,
    BusinessCenter 
} from '@mui/icons-material';
import { palleteV1 } from '@/assets/css/template';
import { connect } from 'react-redux';
import { getAll } from '@/store/products';
import { Cld } from '@/config';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });

const theme = createTheme({
    palette: {
        ...palleteV1.palette
    }
})
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offeringProduct: 1,
            limitProduct: 48,
            totalItems: 0,
            products: []
        }
    }

    componentDidMount() {
        const {offeringProduct, limitProduct} = this.state
        this.props.getAll({
            limit: limitProduct,
            offset: offeringProduct
        })
    }

    componentDidUpdate(prevProps) {
        const {products} = this.props

        if (products.isSuccess && (products.allProduct !== prevProps.products.allProduct || products.totalItems !== prevProps.products.totalItems)) {
            this.setState({
                products: products.allProduct,
                totalItems: products.totalItems
            })
        }
    }

    renderCategorySection = () => {
        const categories = [
            { name: "Electronics", color: "#1E90FF", icon: <Devices /> },
            { name: "Fashion", color: "#FF69B4", icon: <Checkroom /> },
            { name: "Home", color: "#8B4513", icon: <Home /> },
            { name: "Sports", color: "#32CD32", icon: <SportsSoccer /> },
            { name: "Beauty", color: "#FFB6C1", icon: <FaceRetouchingNatural /> },
            { name: "Health", color: "#FF6347", icon: <LocalHospital /> },
            { name: "Baby", color: "#ADD8E6", icon: <ChildFriendly /> },
            { name: "Automotive", color: "#A9A9A9", icon: <DirectionsCar /> },
            { name: "Groceries", color: "#FFD700", icon: <ShoppingBasket /> },
            { name: "Office", color: "#4682B4", icon: <BusinessCenter /> }
        ];

        return (
            <Container sx={{ mt: 5, p: 3, backgroundColor: "#f9f9f9", borderRadius: 2, boxShadow: 3  }}>
                <div>
                    <Typography variant="h4" textAlign="start" mb={3} className={playfair.className}>Kategori</Typography>
                </div>
                <Grid container columns={10} rowSpacing={2} columnSpacing={2}>
                    {categories.map((category, index) => (
                        <Grid key={index} size={{md:2.5, lg:2}}>
                            <Card sx={{ textAlign: "center", bgcolor: category.color }}>
                                <CardActionArea>
                                    <CardContent>
                                        {category.icon}
                                        <Typography variant="h6">{category.name}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        )
    }

    renderProducts = () => {
        const {products, offeringProduct, limitProduct, totalItems} = this.state
        const {isLoading} = this.props.products

        return(
            <Container sx={{marginTop: 6}}>
                <Typography variant="h4" gutterBottom className={playfair.className}>
                    Jelajahi Produk Hari Ini
                </Typography>
                <Grid container spacing={4} rowSpacing={2} columnSpacing={2} sx={{marginTop: 4}}>
                    {products.map((product) => (
                        <Grid key={product.id} size={{xs: 6, sm: 4, md:3, lg: 2}}>
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
                <Pagination
                    count={Math.ceil(totalItems / limitProduct)}
                    page={offeringProduct}
                    onChange={this.handlePageChange}
                    color="primary"
                    sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
                />
            </Container>
        )
    }

    handlePageChange = (event, value) => {
        const {limitProduct, offeringProduct} = this.state
        const startIndex = (value - 1) * limitProduct

        this.props.getAll({
            limit: startIndex + limitProduct,
            offset: value
        })
    };

    render() {
        return(
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">
                    <div className='md:block hidden'>
                        <Carousel/>
                    </div>
                    {this.renderCategorySection()}
                    {this.renderProducts()}
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
    }
})

const mapDispatchToProps = {
    getAll
}

export default connect(mapStateToProps, mapDispatchToProps) (Main)
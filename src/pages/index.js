import { Carousel } from '@/components';
import { Component } from 'react';
import { Container, Typography, Grid2 as Grid, Card, CardActionArea, CardContent, CardMedia, Button, Pagination, Stack, Divider, createTheme, ThemeProvider } from '@mui/material';
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

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });

const products = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    address: `Bandung`,
    price: new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    }).format(1000 * i),
    image: "https://unsplash.com/photos/pancakes-with-strawberries-and-blueberries-on-top-yxZSAjyToP4",
    rating: 1,
    // rating: Math.floor(Math.random() * 5) + 1,
    sold: 12,
}));

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
            visibleProducts: products.slice(0, 48)
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
        const {visibleProducts, offeringProduct, limitProduct} = this.state

        return(
            <Container sx={{marginTop: 6}}>
                <Typography variant="h4" gutterBottom className={playfair.className}>
                    Jelajahi Produk Hari Ini
                </Typography>
                <Grid container spacing={4} rowSpacing={2} columnSpacing={2} sx={{marginTop: 4}}>
                    {visibleProducts.map((product) => (
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
                                                    {product.rating}
                                                </Typography>
                                            </div>
                                            <Typography variant='body2' color='textSecondary'>
                                                {product.sold} terjual
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={Math.ceil(products.length / limitProduct)}
                    page={offeringProduct}
                    onChange={this.handlePageChange}
                    color="primary"
                    sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
                />
            </Container>
        )
    }

    handlePageChange = (event, value) => {
        const {limitProduct} = this.state
        const startIndex = (value - 1) * limitProduct

        this.setState({
            offeringProduct: value,
            visibleProducts: products.slice(startIndex, startIndex + limitProduct)
        });
    };

    render() {
        return(
            <ThemeProvider theme={theme}>
                <div style={{paddingInline: '6rem'}}>
                    <Carousel/>
                    <hr style={{marginTop: 64}}/>
                    {this.renderCategorySection()}
                    {this.renderProducts()}
                </div>
            </ThemeProvider>
        )
    }
}

export default Main
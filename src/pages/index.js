import { Carousel } from '@/components';
import { Component } from 'react';
import { Container, Typography, Grid2 as Grid, Card, CardActionArea, CardContent, CardMedia, Button, Pagination } from '@mui/material';
import { Playfair_Display, Poppins } from "next/font/google";
import Link from 'next/link';

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });

const products = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: "This is a great product.",
    price: `$${(29.99 + i).toFixed(2)}`,
    image: "https://via.placeholder.com/150"
}));

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
            { name: "Electronics", image: "https://source.unsplash.com/random/200x200?electronics" },
            { name: "Fashion", image: "https://source.unsplash.com/random/200x200?fashion" },
            { name: "Home", image: "https://source.unsplash.com/random/200x200?home" },
            { name: "Sports", image: "https://source.unsplash.com/random/200x200?sports" },
            { name: "Beauty", image: "https://source.unsplash.com/random/200x200?sports" },
            { name: "Health", image: "https://source.unsplash.com/random/200x200?sports" },
            { name: "Baby", image: "https://source.unsplash.com/random/200x200?sports" },
            { name: "Automotive", image: "https://source.unsplash.com/random/200x200?sports" },
            { name: "Groceries", image: "https://source.unsplash.com/random/200x200?sports" },
            { name: "Office", image: "https://source.unsplash.com/random/200x200?sports" },
          ];

        return (
            <Container sx={{ mt: 5, p: 3, backgroundColor: "#f9f9f9", borderRadius: 2, boxShadow: 3  }}>
                <div>
                    <Typography variant="h4" textAlign="start" mb={3} className={playfair.className}>Kategori</Typography>

                </div>
                <Grid container columns={10} rowSpacing={2} columnSpacing={2}>
                    {categories.map((category, index) => (
                        <Grid item key={index} size={{xs:3, sm:2}}>
                            <Card sx={{ textAlign: "center" }}>
                                <CardActionArea>
                                    <CardContent>
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
            <div style={{paddingInline: '6rem'}}>
                <Carousel/>
                <hr style={{marginTop: 64}}/>
                {this.renderCategorySection()}
                {this.renderProducts()}
            </div>
        )
    }
}

export default Main
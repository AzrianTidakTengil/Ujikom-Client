import React, { Component } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Grid2 as Grid } from "@mui/material";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: "My Awesome Store",
      products: [
        { id: 1, name: "Product 1", price: 29.99, image: "https://via.placeholder.com/150" },
        { id: 2, name: "Product 2", price: 49.99, image: "https://via.placeholder.com/150" },
        { id: 3, name: "Product 3", price: 19.99, image: "https://via.placeholder.com/150" },
      ],
    };
  }

  render() {
    const { storeName, products } = this.state;

    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          {storeName}
        </Typography>
        <Grid container spacing={3}>
          {products.map(product => (
            <Grid size={{xs:12, sm:6, md:4}} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default Store;

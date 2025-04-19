import React, { Component } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Grid2 as Grid, createTheme } from "@mui/material";
import { palleteV1 } from "@/assets/css/template";
import { InformationShop } from "@/store/shop";
import { connect } from "react-redux";
import { withRouter } from "next/router";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: {
        name: null,
        description: null,
        avatar: null,
        address: null,
      },
      products: [
        { id: 1, name: "Product 1", price: 29.99, image: "https://via.placeholder.com/150" },
        { id: 2, name: "Product 2", price: 49.99, image: "https://via.placeholder.com/150" },
        { id: 3, name: "Product 3", price: 19.99, image: "https://via.placeholder.com/150" },
      ],
    };
    this.theme = createTheme({
      palette: {
        ...palleteV1.palette
      }
    })
  }
  
  componentDidMount() {
    this.props.InformationShop({id: this.props.router.query.id})
  }

  componentDidUpdate(prevProps) {
    const {shop} = this.props
    const prevId = prevProps.router.query.id;
    const currentId = this.props.router.query.id;

    if (currentId && prevId !== currentId) {
        this.props.InformationShop({ id: currentId })
    }

    if (shop.shop !== prevProps.shop && shop.isSuccess) {
      this.setState({
        shop: {
          name: shop.shop.name,
          description: shop.shop.description,
          avatar: null,
          address: `${shop.shop.shopToAddress.address}, ${shop.shop.shopToAddress.district}, ${shop.shop.shopToAddress.city}, ${shop.shop.shopToAddress.province}, ${shop.shop.shopToAddress.postal_code}}`
        },
      })
    }
  }

  renderInformationShop = () => {
    return(
      <Paper
        sx={{
          p: 2
        }}
      >
        
      </Paper>
    )
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

const mapStateToProps = (state) => ({
  shop: {
    isLoading: state.shop.isLoading,
    isSuccess: state.shop.isSuccess,
    seller: state.shop.seller,
    product: state.shop.product,
    lengthProduct: state.shop.lengthProduct,
    message: state.shop.message,
    error: state.shop.error,
    shop: state.shop.shop,
  },
})

const mapDispatchToProps = {
  InformationShop,
}
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Store));

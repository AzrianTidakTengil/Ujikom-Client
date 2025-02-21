import React, { Component } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Button, IconButton, Grid2 as Grid, Box, Stack, Divider, ThemeProvider, createTheme, FormGroup, FormControlLabel, Checkbox, AppBar } from '@mui/material';
import { Add, Remove, Delete, Star, CheckBox } from '@mui/icons-material';
import { QuantityEditor } from '@/components';
import Link from 'next/link';
import { palleteV1 } from '@/assets/css/template';

const products = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  address: `Bandung`,
  price: new Intl.NumberFormat('id-ID', {
      style: "currency",
      currency: "IDR"
  }).format(1000 * i),
  image: "https://via.placeholder.com/150",
  rating: '5',
  sold: '100',
}));

class Trolley extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [
        { id: 1, name: 'Product 1', price: 1000, quantity: 2, image: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Product 2', price: 2000, quantity: 1, image: 'https://via.placeholder.com/100' },
        { id: 3, name: 'Product 3', price: 1500, quantity: 3, image: 'https://via.placeholder.com/100' },
        { id: 4, name: 'Product 3', price: 1500, quantity: 3, image: 'https://via.placeholder.com/100' },
        { id: 5, name: 'Product 3', price: 1500, quantity: 3, image: 'https://via.placeholder.com/100' },
        { id: 6, name: 'Product 3', price: 1500, quantity: 3, image: 'https://via.placeholder.com/100' },
      ],
      allItem: {
        offer: 1,
        lenght: 36,
        length: 36,
        visibleItem: products.slice(0, 36)
      }
    }
  }

  theme = () => createTheme({
    palette: {
      ...palleteV1.palette
    }
  })

  renderTrolley = () => {
    const { cart } = this.state

    return (
      <Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="h4" gutterBottom>Keranjang</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox/>} label="Pilih Semua"/>
          </FormGroup>
        </Box>
        {cart.length === 0 ? (
          <Typography variant="h6">Tidak ada produk di keranjang</Typography>
        ) : (
          <Grid container spacing={2}>
            {cart.map((item) => (
              <Grid size={12} key={item.id}>
                <Card sx={{p: 4}}>
                  <Grid container>
                    <Grid size={1}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox/>}/>
                    </FormGroup>
                    </Grid>
                    <Grid size={3}>
                      <CardMedia
                        component="img"
                        height="100"
                        image={item.image}
                        alt={item.name}
                      />
                    </Grid>
                    <Grid size={5}>
                      <CardContent>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2">{
                          new Intl.NumberFormat('id-ID', {
                              style: "currency",
                              currency: "IDR"
                          }).format(item.price)
                          }
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid size={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Box sx={{marginBottom: 2}}>
                          <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={2}
                          >
                            <QuantityEditor 
                            name={item.id}
                            initialQuantity={item.quantity}
                            min={1}
                            max={100}
                            onChange={this.handleChangeQuantity}
                            />
                            <IconButton color="secondary" onClick={() => this.handleRemove(item.id)}>
                                <Delete />
                            </IconButton>
                          </Stack>
                        </Box>
                        <Typography variant='h6'>
                          {
                            new Intl.NumberFormat('id-ID', {
                                style: "currency",
                                currency: "IDR"
                            }).format(item.price * item.quantity)
                          }
                        </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    )
  }

  handleChangeQuantity = (name, value) => {

  }

  handleRemove = (id) => {
    this.setState(prevState => ({
      cart: prevState.cart.filter(item => item.id !== id)
    }));
  };

  renderAllProduct = () => {
    const {offer, limit, visibleItem, length} = this.state.allItem

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
        <Grid container spacing={4} rowSpacing={2} columnSpacing={2} columns={12} sx={{marginTop: 4}}>
            {visibleItem.map((product) => (
                <Grid key={product.id} size={{xs: 6, md: 3}}>
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
    </Box>
    )
  }

  render() {
    const { cart } = this.state;

    return (
      <ThemeProvider theme={this.theme}>
        <Container sx={{marginBottom: 4}}>
          {this.renderTrolley()}
        </Container>
        <Container>
          {this.renderAllProduct()}
        </Container>
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, p:2 }}>
          <Grid container>
            <Grid size={6}>
              <Stack direction={'row'} spacing={3} divider={<Divider orientation='vertical' flexItem/>}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox color='white'/>} label="Pilih Semua"/>
                </FormGroup>
                <FormGroup>
                  <FormControlLabel control={<IconButton color='white'><Delete/></IconButton>} label="Hapus Semua"/>
                </FormGroup>
              </Stack>
            </Grid>
            <Grid 
              container
              size={6} 
              direction="row"
                sx={{
                  justifyContent: "end",
                  alignItems: "center",
                }}
              spacing={4}
            >
              <Grid>
                <Typography variant='subtitle1'>
                  Subtotal Harga:
                </Typography>
              </Grid>
              <Grid>
              <Typography variant='h5' fontWeight={600}>
                {
                  new Intl.NumberFormat('id-ID', {
                    style: "currency",
                    currency: "IDR"
                  }).format(100000)
                }
              </Typography>
              </Grid>
              <Grid>
              <Button variant='contained' color='success'>
                CheckOut
              </Button>
              </Grid>
            </Grid>
          </Grid>
        </AppBar>
      </ThemeProvider>
    );
  }
}

export default Trolley;

import React, { Component } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Button, IconButton, Grid2 as Grid, Box, Stack, Divider, ThemeProvider, createTheme, FormGroup, FormControlLabel, Checkbox, AppBar, Paper } from '@mui/material';
import { Add, Remove, Delete, Star } from '@mui/icons-material';
import { QuantityEditor } from '@/components';
import Link from 'next/link';
import { palleteV1 } from '@/assets/css/template';
import { connect } from 'react-redux';
import { getAllItemTrolley, updateItem } from '@/store/trolley';
import { getAll } from '@/store/products';
import { createTransaction } from '@/store/transaction';
import { withRouter } from 'next/router';
import { insertCheckout, clearItemsCheckout } from '@/store/trolley';
import { Cld } from '@/config';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';

class Trolley extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      allItem: {
        offer: 0,
        limit: 36,
        length: 36,
        products: []
      },
      selectedItems: [],
      subTotalPrice: 0,
    }
    this.theme = createTheme({
      palette: {
        ...palleteV1.palette
      }
    })
  }

  UNSAFE_componentWillMount() {
    const {allItem} = this.state
    this.props.getAllItemTrolley()
    this.props.getAll({
      limit: allItem.limit,
      offer: allItem.offer
    })
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    const {trolley, products, transaction} = nextProps
    const {allItem, cart} = this.state

    if (trolley.isSuccess) {
      const cartItem = []
      trolley.data.map((val) => {
        cartItem.push({
          id: val.id,
          quantity: val.items,
          name: val.trolleyToProduct.name,
          price: val.trolleyToProduct.productToProductVariant.reduce((total, currVal) => total + (currVal.price), 0),
          stock: val.trolleyToProduct.productToProductVariant.reduce((total, currVal) => total + (currVal.stock), 0),
          image: val.trolleyToProduct.productToImage.length != 0 ? val.trolleyToProduct.productToImage[0].public_id : 'product-not-found',
          product_id: val.product_id,
        })
      }) 
      this.setState({
        cart: cartItem
      })
    }

    if (products.isSuccess) {
      this.setState({
        allItem: {
          ...allItem,
          products: products.allProduct
        }
      })
    }

    if (transaction.isSuccess) {
      // console.log(transaction.data)
    }
  }

  renderTrolley = () => {
    const { cart, selectedItems } = this.state
    const allIdItems = cart.map((val) => val.id)
    const isItCheked = allIdItems.every((val) => selectedItems.includes(`${val}`))

    return (
      <Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="h4" gutterBottom>Keranjang</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={this.handleCheckAllItem} checked={isItCheked}/>} label="Pilih Semua"/>
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
                      <Checkbox
                        value={item.id}
                        checked={this.handleIsTrueCheck(item.id)}
                        onChange={this.handleCheckItem}
                      />
                    </Grid>
                    <Grid size={3}>
                      <img
                        width={160}
                        height={160}
                        alt={item.name}
                        src={Cld.image(item.image).resize(thumbnail().width(160).height(160)).toURL()}
                      />
                    </Grid>
                    <Grid size={5}>
                      <CardContent>
                        <Link 
                          href={{
                            pathname: `/p/${encodeURIComponent(item.name)}`,
                            query: {id: item.product_id}
                            }}
                          style={{
                            textDecoration: 'none',
                            color: 'black'
                          }}
                        >
                          <Typography variant="h6">
                            {item.name}
                          </Typography>
                        </Link>
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
                            max={item.stock}
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

  handleIsTrueCheck = (val) => {
    const {selectedItems} = this.state

    let isTrue = selectedItems.includes(`${val}`)

    return isTrue
  }

  handleCheckItem = (event) => {
    const {value} = event.target
    const {selectedItems} = this.state
    if (selectedItems.find((val) => val === value)) {
      this.setState({
        selectedItems: selectedItems.filter(number => number !== value)
      })
    } else {
      this.setState({
        selectedItems: [
          ...selectedItems,
          value
        ]
      })
    }
  }
  
  handleCountSubTotalPrice = () => {
    const {cart, subTotalPrice, selectedItems} = this.state

    const cartBySelected = cart.filter((x) => selectedItems.includes(`${x.id}`))
    const res = cartBySelected.reduce((acc, val) => acc + (val.quantity * val.price), 0)

    return res
  }

  handleCheckAllItem = () => {
    const {cart, selectedItems} = this.state

    const allIdItems = cart.map((val) => val.id)
    const isItCheked = allIdItems.every((val) => selectedItems.includes(`${val}`))

    if (isItCheked) {
      this.setState({
        selectedItems: []
      })
    } else {
      this.setState({
        selectedItems: allIdItems.map((val) => `${val}`)
      })
    }
  }

  handleChangeQuantity = (name, value) => {
    this.setState((prevState) => ({
      cart: prevState.cart.map((val) => val.id === name ? {...val, quantity: value} : val)
    }))    

    this.props.updateItem({id: name, items: value})
  }

  handleRemove = (id) => {
    this.setState(prevState => ({
      cart: prevState.cart.filter(item => item.id !== id)
    }));
  };

  renderAllProduct = () => {
    const {products} = this.state.allItem

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
    </Box>
    )
  }

  handleCheckOut = () => {
    const {selectedItems} = this.state
    const {router, trolley} = this.props

    this.props.insertCheckout(selectedItems)
    router.push({
      pathname: '/checkout'
    })
  }

  render() {
    const { cart, selectedItems } = this.state;

    const allIdItems = cart.map((val) => val.id)
    const isItCheked = allIdItems.every((val) => selectedItems.includes(`${val}`))

    return (
      <ThemeProvider theme={this.theme}>
        <Container sx={{marginBottom: 4}}>
          {this.renderTrolley()}
        </Container>
        <Container>
          {this.renderAllProduct()}
        </Container>
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, p:2 }}>
          <Grid container sx={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Grid>
              <Stack direction={'row'} spacing={3} divider={<Divider orientation='vertical' flexItem/>}>
                <FormControlLabel control={<Checkbox color='white' onChange={this.handleCheckAllItem} checked={isItCheked}/>} label="Pilih Semua"/>
                {/* <FormGroup>
                  <FormControlLabel control={<IconButton color='white'><Delete/></IconButton>} label="Hapus Semua"/>
                </FormGroup> */}
              </Stack>
            </Grid>
            <Grid 
              container 
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
                  }).format(this.handleCountSubTotalPrice())
                }
              </Typography>
              </Grid>
              <Grid>
              <Button variant='contained' color='success' onClick={this.handleCheckOut}>
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

const mapStateToProps = (state) => ({
  trolley: {
    isSuccess: state.trolley.isSucces,
    isLoading: state.trolley.isLoading,
    data: state.trolley.data,
    itemsCheckout: state.trolley.itemsCheckout
  },
  products: {
    isLoading: state.product.isLoading,
    isSuccess: state.product.isSuccess,
    allProduct: state.product.show,
    error: state.product.error,
    totalItems: state.product.totalItems,
  },
  selectedItems: [],
  transaction: {
    isLoading: state.transaction.isLoading,
    isSuccess: state.transaction.isSuccess,
    error: state.transaction.error,
    data: state.transaction.data
  }
})

const mapDispatchToProps = {
  getAllItemTrolley,
  getAll,
  updateItem,
  createTransaction,
  insertCheckout,
  clearItemsCheckout
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Trolley));

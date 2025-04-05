import { palleteV1 } from "@/assets/css/template";
import { SellerLayout } from "@/components";
import { BalanceInformation, getSeller, MyProductInTrolley, PopularAnalysisProduct } from "@/store/shop";
import { Favorite, ShoppingCart, TravelExplore, Visibility, VisibilityOff } from "@mui/icons-material";
import { Container, createTheme, Paper, ThemeProvider, Grid2 as Grid, Typography, Box, IconButton, Stack, Divider, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { withRouter } from "next/router";
import { Component } from "react";
import { connect } from "react-redux";

const theme = createTheme()

class Seller extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showBalance: false,
            balance: 0,
            lengthInTrolley: 0,
            product: []
        }
    }

    UNSAFE_componentWillMount() {
        this.props.BalanceInformation()
        this.props.MyProductInTrolley()
        this.props.PopularAnalysisProduct()
    }

    UNSAFE_componentWillReceiveProps() {
        const {router, shop} = this.props
        
        if (shop.isSuccess && shop.popularProduct) {
            this.setState({
                product: shop.popularProduct
            })
        }

        if (shop.isSuccess && shop.balance) {
            this.setState({
                balance: shop.balance
            })
        }

        if (shop.isSuccess && shop.inTrolley) {
            this.setState({
                lengthInTrolley: shop.inTrolley
            })
        }
    }

    renderBalance = () => {
        const {showBalance, balance} = this.state

        return (
            <Paper
                sx={{
                    p: 2,
                    height: '8rem'
                }}
            >
                <Typography variant="h5" fontWeight={500}>Saldo toko</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        marginY: 2
                    }}
                >
                    <Typography variant="h6" fontWeight={600} sx={{marginRight: 2}}>
                    {
                        showBalance ? 
                        new Intl.NumberFormat('id-ID', {
                            style: "currency",
                            currency: "IDR"
                        }).format(balance) 
                        :
                        `Rp ********`
                    }
                    </Typography>
                    <IconButton
                        onClick={() => {this.setState({showBalance: !showBalance})}}
                    >
                        {
                            showBalance ?
                            <Visibility/> :
                            <VisibilityOff/>
                        }
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}
                >
                    <Stack
                        direction="row"
                        divider={<Divider flexItem orientation="vertical"/>}
                        spacing={2}
                    >
                        <Button
                            variant="text"
                            href="/seller/balance"
                        >
                            Tarik Saldo
                        </Button>
                        {/* <Button
                            variant="text"
                        >
                            Riwayat
                        </Button> */}
                    </Stack>
                </Box>
            </Paper>
        )
    }

    renderAnalysisShop = () => {
        const {lengthInTrolley} = this.state

        return (
            <Paper
                sx={{
                    p: 2,
                    height: '8rem'
                }}
            >
                <Stack
                    direction="row"
                    divider={<Divider flexItem orientation="vertical"/>}
                    spacing={2}
                    justifyContent={'space-around'}
                >
                    <Box>
                        <Typography variant="h5" fontWeight={500}>Dalam keranjang</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginY: 2
                            }}
                        >
                            <ShoppingCart sx={{marginRight: 2}}/>
                            <Typography variant="h6" fontWeight={600}>{lengthInTrolley}</Typography>
                        </Box>
                    </Box>
                    {/* <Box>
                        <Typography variant="h5" fontWeight={500}>Disukai</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginY: 2
                            }}
                        >
                            <Favorite sx={{marginRight: 2}}/>
                            <Typography variant="h6" fontWeight={600}>{`100`}</Typography>
                        </Box>
                    </Box> */}
                </Stack>
                {/* <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}
                >
                    <Stack
                        direction="row"
                        divider={<Divider flexItem orientation="vertical"/>}
                        spacing={2}
                    >
                        <Button
                            variant="text"
                        >
                            Riwayat
                        </Button>
                    </Stack>
                </Box> */}
            </Paper>
        )
    }

    renderMision = () => {
        return (
            <Paper
                sx={{
                    p: 2
                }}
            >
                <Typography variant="h6" fontWeight={600}>Misi untuk menjadi terbaik</Typography>
            </Paper>
        )
    }

    renderTren = () => {
        const {product} = this.state

        return (
            <Paper
                sx={{
                    p: 2
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={600}
                >
                    Produk teramai
                </Typography>
                <TableContainer component={Paper} sx={{marginY: 2}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">No.</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Nama</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Kategori</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Aksi</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                product.map((val, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {val.name}
                                        </TableCell>
                                        <TableCell>
                                            {val.productToCategory ? `${val.productToCategory.productCategoryToCategory1.name} > ${val.productToCategory.productCategoryToCategory2.name} > ${val.productToCategory.productCategoryToCategory3.name}` : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={() => alert(`Visiting products in Tier ${val.name}`)} size="small">
                                                <Visibility/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}
                >
                    <Button variant="text">
                        Lihat selengkapnya
                    </Button>
                </Box> */}
            </Paper>
        )
    }

    render() {
        return(
            <ThemeProvider theme={theme}>
                <Container sx={{marginY: 2}}>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            {this.renderBalance()}
                        </Grid>
                        <Grid size={6}>
                            {this.renderAnalysisShop()}
                        </Grid>
                    </Grid>
                </Container>
                {/* <Container sx={{marginY: 2}}>
                    {this.renderMision()}
                </Container> */}
                <Container sx={{marginY: 2}}>
                    {this.renderTren()}
                </Container>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    shop: {
        isLoading: state.shop.isLoading,
        isSuccess: state.shop.isSuccess,
        seller: state.shop.seller,
        balance: state.shop.balanceInformation.balance,
        transaction: state.shop.balanceInformation.history,
        inTrolley: state.shop.LengthProductInTrolley,
        order: state.shop.order,
        product: state.shop.product,
        popularProduct: state.shop.popularProduct,
        error: state.shop.error
    }
})

const mapDispatchToProps = {
    getSeller,
    BalanceInformation,
    MyProductInTrolley,
    PopularAnalysisProduct
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Seller))
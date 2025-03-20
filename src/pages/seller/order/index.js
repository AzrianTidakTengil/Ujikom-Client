import { palleteV1 } from "@/assets/css/template"
import { Box, Container, createTheme, ThemeProvider, Typography, IconButton, Paper, Chip, Divider, Grid2 as Grid, TextField, InputAdornment, Stack, FormControl, InputLabel, Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material"
import { Edit, Visibility, SearchOutlined } from "@mui/icons-material"
import { withRouter } from "next/router"
import {Component} from "react"
import { connect } from "react-redux"
import { DataGrid } from "@mui/x-data-grid"
import { HandleOrderTransaction, Order } from "@/store/shop"
import dayjs from "dayjs"

class SellerOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'settlement',
            limit: 25,
            offset: 0,
            page: 0,
        }
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            }
        })
    }

    UNSAFE_componentWillMount() {
        const {limit, offset, status} = this.state

        this.props.Order({limit, offset, status})
    }

    UNSAFE_componentWillReceiveProps() {
        const {shop} = this.props
    }

    renderFilterMethodOrder = () => {
        const {status} = this.state
        const {shop} = this.props

        const statuses = [
            {
                value: 'settlement',
                label: 'Menunggu Konfirmasi'
            },
            {
                value: 'approved',
                label: 'sedang proses'
            },
            {
                value: 'delivery',
                label: 'sedang diantar'
            },
            {
                value: 'success',
                label: 'berhasil sampai'
            },
            {
                value: 'rejectedBySeller',
                label: 'ditolak'
            },
        ]

        return (
            <Paper
                sx={{
                    p: 2,
                    marginBottom: 2
                }}
            >
                <Grid container>
                    <Grid size={9}>
                        <TextField
                            sx={{ width: '20rem' }}
                            size="small"
                            hiddenLabel
                            slotProps={{ input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlined/>
                                </InputAdornment>
                            )
                            }}}
                            // onChange={(event) => this.handleChange(event.target.value)}
                            // onClick={this.handleAnchorSearch}
                        />
                    </Grid>
                    <Grid size={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                        <FormControl
                            fullWidth
                            size="small"
                            sx={{textTransform: 'capitalize'}}
                        >
                            <Select
                                onChange={this.handleFilterStatus}
                                value={status}
                            >
                                {
                                    statuses.map((val, index) => (
                                        <MenuItem value={val.value} key={index} sx={{textTransform: 'capitalize'}}>{val.label}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    handleFilterStatus = (event) => {
        const {limit, offset, status} = this.state
        this.setState({
            status: event.target.value
        })
        this.props.Order({limit, offset, status: event.target.value})
    }

    renderDataGrid = () => {
        const {status} = this.state
        const {shop} = this.props

        return (
            <Paper
                sx={{
                    marginY: 2
                }}
                elevation={0}
            >
                {
                    shop.order.length != 0 ?
                        shop.order.map((order, index) => (
                            <Paper
                                key={index}
                                sx={{
                                    p: 2
                                }}
                                elevation={1}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography variant="body1" color="gray" sx={{marginRight: 2}}>Pesanan: </Typography>
                                        <Typography variant="h6">{order.transactionToShipment.shipmentToDelivery.deliveryToAddress.receiver}</Typography>
                                    </Box>
                                    <Stack
                                        direction={'row'}
                                        divider={<Divider flexItem orientation="vertical"/>}
                                        spacing={2}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography variant="body1" color="gray" sx={{marginRight: 2}}>Tanggal tenggat: </Typography>
                                            <Typography variant="h6">{dayjs(new Date().setDate(new Date(order.transactionToShipment.end_date).getDate() - 2)).format('DD-MM-YYYY')}</Typography>
                                        </Box>
                                        {/* <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography variant="body1" color="gray" sx={{marginRight: 2}}>Status: </Typography>
                                            <Chip {...this.handleAttributeChipStatus(order.transactionToPayment.status)}/>
                                        </Box> */}
                                    </Stack>
                                </Box>
                                <Divider sx={{marginY: 2}}/>
                                <TableContainer component={Paper}>
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
                                                    <Typography variant="h6">Varian</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="h6">Kuantitas</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="h6">Catatan</Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                order.transactionToTrolley.map((product, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {product.trolleyToProduct.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            -
                                                        </TableCell>
                                                        <TableCell>
                                                            {product.items}
                                                        </TableCell>
                                                        <TableCell>
                                                            -
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: 2
                                    }}
                                >
                                    <Stack
                                        spacing={2}
                                        direction={'row'}
                                        divider={<Divider orientation="vertical" flexItem />}
                                    >
                                        <Button
                                            variant="text"
                                        >
                                            Tujuan pengiriman
                                        </Button>
                                        <Button
                                            variant="text"
                                        >
                                            Lihat Selengkapnya
                                        </Button>
                                    </Stack>
                                    {
                                        order.transactionToPayment.status === 'settlement' ? (
                                            <Stack
                                                spacing={2}
                                                direction={'row'}
                                                divider={<Divider orientation="vertical" flexItem />}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => this.handleOrderingStatus(order.id, 'rejected')}
                                                >
                                                    Tolak
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => this.handleOrderingStatus(order.id, 'approved')}
                                                >
                                                    Terima
                                                </Button>
                                            </Stack>
                                        ) : ''
                                    }
                                </Box>
                            </Paper>
                        ))
                    : (
                        <Paper
                            sx={{
                                p: 2
                            }}
                        >
                            <Typography variant="h6" fontWeight={600} textAlign={'center'}>Tidak ada pesanan</Typography>
                        </Paper>
                    )
                }
            </Paper>
        )
    }

    handleAttributeChipStatus = (status) => {
        return {
            label: status === 'settlement' ? 'menunggu konfirmasi' : status === 'onSeller' ? 'sedang proses' : status === 'delivery' ? 'sedang diantar' : status === 'expired' ? 'kadaluarsa' : status === 'rejectedBySeller' ? 'ditolak' : status === 'success' ? 'diterima' : 'menunggu',
            color: status === 'settlement' ? 'warning' : status === 'onSeller' ? 'primary' : status === 'delivery' ? 'info' : status === 'expired' ? 'error' : status === 'rejectedBySeller' ? 'error' : status === 'success' ? 'success' : 'default',
        }
    }

    handleOrderingStatus = (id, status) => {
        this.props.HandleOrderTransaction({
            id,
            status
        })
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Container>
                    <Typography variant="h4" fontWeight={600} sx={{marginBottom: 2}}>Pesanan</Typography>
                    {this.renderFilterMethodOrder()}
                    {this.renderDataGrid()}
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
        order: state.shop.orderTabel.data,
        lengthDataOrder: state.shop.orderTabel.lenght,
        lengthDataOrderUnProcess: state.shop.lengthOrderUnProccess,
        product: state.shop.product,
        lengthProduct: state.shop.lengthProduct,
        popularProduct: state.shop.popularProduct,
        error: state.shop.error
    }
})

const mapDispatchToProps = {
    Order,
    HandleOrderTransaction
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SellerOrder))
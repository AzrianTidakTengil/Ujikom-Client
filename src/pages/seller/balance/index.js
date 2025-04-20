import { palleteV1 } from '@/assets/css/template'
import { Container, createTheme, ThemeProvider, Typography, Box, Paper, IconButton, Stack, Divider, Button, Grid2 as Grid, TextField, InputAdornment } from '@mui/material'
import { withRouter } from 'next/router'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Visibility, VisibilityOff, SearchOutlined, Edit, FileDownload } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import { DateRangePicker } from '@/components'
import { BalanceInformation } from '@/store/shop'

class Balance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showBalance: false,
            seller: {
                name: ''
            },
            balance: '',
            history: [],
        }
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            }
        })
    }

    componentDidMount() {
        this.props.BalanceInformation();
    }

    componentDidUpdate(prevProps) {
        const { seller, shop } = this.props;
      
        if (
          seller.isSuccess &&
          seller !== prevProps.seller
        ) {
          this.setState({
            seller: {
              name: seller.data.name,
            },
          });
        }

        if (shop.isSuccess && shop !== prevProps.shop) {        
            if (shop.balance) {
              this.setState({ balance: shop.balance });
            }

            if (shop.history) {
                this.setState({ history: shop.history });
            }
          }
    }

    renderBalance = () => {
        const { seller, showBalance, balance } = this.state

        return (
            <Box
                sx={{
                    marginY: 2
                }}
            >
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <Typography variant='body1'>{seller.name}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            marginY: 2
                        }}
                    >
                        <Typography variant="h5" fontWeight={600} sx={{marginRight: 2}}>
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
                            >
                                Tarik Saldo
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Box>
        )
    }

    renderDataGrid = () => {
        const {history} = this.state

        const columns = [
            {
                field: 'id',
                headerName: 'Id',
            },
            {
                field: 'name',
                headerName: 'Nama',
                width: 500,
            },
            {
                field: 'price',
                headerName: 'Harga Satuan',
                width: 120,
            },
            {
                field: 'quantity',
                headerName: 'Banyak Barang',
                width: 120,
            },
        ]

        const rows = []

        const datas = history.map((transaction) => 
            transaction.transactionToTrolley.map((trolley) => {
                rows.push({
                    id: trolley.product_id,
                    name: trolley.trolleyToProduct.name,
                    price: trolley.trolleyToProduct.price,
                    quantity: trolley.items
                })
            })
        )
        
        return (
            <Box
                sx={{
                    marginY: 2
                }}
            >
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <Grid container>
                        <Grid size={6}>
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
                            />
                        </Grid>
                        <Grid size={6} justifyItems={'end'}>
                                <Stack
                                    direction={'row'}
                                    divider={<Divider orientation='vertical' flexItem/>}
                                    spacing={2}
                                >
                                    <Box
                                        sx={{
                                            width: '16rem'
                                        }}
                                    >
                                        <DateRangePicker/>
                                    </Box>
                                    <Button
                                        startIcon={<FileDownload />}
                                        variant='contained'
                                    >
                                        Export
                                    </Button>
                                </Stack>
                        </Grid>
                    </Grid>
                    <Divider sx={{ marginY: 2 }} />
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 25,
                                },
                            },
                        }}
                        pageSizeOptions={[10, 25, 50, 100]}
                        checkboxSelection
                        columnVisibilityModel={{
                            id: false,
                        }}
                    />
                </Paper>
            </Box>
        )
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Container>
                    <Typography variant='h4' fontWeight={600}>Saldo</Typography>
                    {this.renderBalance()}
                    {this.renderDataGrid()}
                </Container>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    seller: {
        isLoading: state.shop.isLoading,
        isSuccess: state.shop.isSuccess,
        data: state.shop.seller,
        error: state.shop.error
    },
    shop: {
        isLoading: state.shop.isLoading,
        isSuccess: state.shop.isSuccess,
        seller: state.shop.seller,
        balance: state.shop.balanceInformation.balance,
        history: state.shop.balanceInformation.history,
        transaction: state.shop.balanceInformation.history,
        inTrolley: state.shop.LengthProductInTrolley,
        order: state.shop.order,
        product: state.shop.product,
        popularProduct: state.shop.popularProduct,
        error: state.shop.error
    },
})

const mapDispatchToProps = {
    BalanceInformation,
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Balance))
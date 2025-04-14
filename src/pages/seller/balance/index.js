import { palleteV1 } from '@/assets/css/template'
import { Container, createTheme, ThemeProvider, Typography, Box, Paper, IconButton, Stack, Divider, Button, Grid2 as Grid, TextField, InputAdornment } from '@mui/material'
import { withRouter } from 'next/router'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Visibility, VisibilityOff, SearchOutlined, Edit, FileDownload } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import { DateRangePicker } from '@/components'

class Balance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showBalance: false,
            seller: {
                name: ''
            }
        }
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            }
        })
    }

    componentDidUpdate(prevProps) {
        const { seller } = this.props;
      
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
    }

    renderBalance = () => {
        const { seller, showBalance } = this.state

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
                            }).format(100000) 
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
            {
                field: 'amount',
                headerName: 'Total Harga',
                width: 300,
            },
        ]

        const rows = [
            {
                id: 0,
                name: 'Handphone',
                price: 2000,
                quantity: 100,
                amount: 200000
            },
            {
                id: 1,
                name: 'Test 12',
                price: 10000,
                quantity: 100,
                amount: 200000
            },
            {
                id: 2,
                name: 'asdasd',
                price: 10000,
                quantity: 100,
                amount: 200000
            },
        ]
        
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
    }
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Balance))
import { palleteV1 } from "@/assets/css/template"
import { Container, createTheme, Paper, ThemeProvider, Typography, Grid2 as Grid, Card, CardContent, Select, MenuItem, FormControl, InputLabel, Box, IconButton, Divider, Stack, TextField, InputAdornment, Button } from "@mui/material"
import { withRouter } from "next/router"
import {Component} from "react"
import { connect } from "react-redux"
import { SellerLayout } from "@/components"
import { DataGrid } from "@mui/x-data-grid"
import { Delete, Edit, SearchOutlined } from "@mui/icons-material"
import { MyProductShop } from "@/store/shop"


class SellerProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: "",
            selectRow: [],
            product: [],
            limit: 25,
            offset: 0,
            length: 0,
            page: 0,
        }
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            },
        })
    }

    UNSAFE_componentWillMount() {
        const {limit, offset} = this.state

        this.props.MyProductShop({limit, offset})
    }

    UNSAFE_componentWillReceiveProps() {
        const {shop} = this.props

        if (shop.isSuccess && shop.lengthProduct) {
            this.setState({
                length: shop.lengthProduct,
                product: shop.product
            })
        }
    }

    handleSelectRow = (newRowSelectionModel) => {
        this.setState({ selectRow: newRowSelectionModel })
    }

    renderDataGrid = () => {
        const {selectRow, product, limit, offset, length, page} = this.state
        const {shop} = this.props

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
                headerName: 'Harga',
                width: 300,
            },
            {
                field: 'stock',
                headerName: 'Stok',
                width: 120,
            },
            ,{
                field: 'action',
                headerName: 'Aksi',
                renderCell: (params) => (
                    <IconButton size="small" onClick={this.handlePushRouterEdit}>
                        <Edit fontSize="small"/>
                    </IconButton>
                )
            }
        ]

        const rows = shop.product.map((p) => ({
            id: p.id,
            name: p.name,
            price: new Intl.NumberFormat('id-ID', {
                style: "currency",
                currency: "IDR"
            }).format(p.price),
            stock: p.stock
        }))

        return (
            <Box>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    paginationModel={{
                        page: page,
                        pageSize: limit,
                    }}
                    rowCount={shop.lengthProduct}
                    loading={shop.isLoading}
                    pageSizeOptions={[10, 25, 50, 100]}
                    checkboxSelection
                    columnVisibilityModel={{
                        id: false,
                    }}
                    onRowSelectionModelChange={this.handleSelectRow}
                    rowSelectionModel={selectRow}
                    onPaginationModelChange={this.handleSetPageDataGrid}
                    paginationMode="server"
                />
            </Box>
        )
    }

    handlePushRouterEdit = () => {

    }

    handleSetPageDataGrid = ({page, pageSize}) => {
        const {limit, offset} = this.state

        this.props.MyProductShop({limit: pageSize, offset: limit * page})

        this.setState({
            page,
            limit: pageSize
        })
    }

    handleCategoryChange = (event) => {
        this.setState({ category: event.target.value })
    }

    renderFilterDataGrid = () => {
        const {category, selectRow} = this.state

        const etalaseCategories = [
            { id: 0, name: "Electronics" },
            { id: 1, name: "Computers" },
            { id: 2, name: "Wearables" },
            { id: 3, name: "Accessories" },
            { id: 4, name: "Home Appliances" },
            { id: 5, name: "Gaming" },
            { id: 6, name: "Furniture" },
        ]

        return (
            <Box>
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
                            // onChange={(event) => this.handleChange(event.target.value)}
                            // onClick={this.handleAnchorSearch}
                        />
                    </Grid>
                    <Grid size={6} justifyItems={'end'}>
                        <Stack
                            direction={'row'}
                            divider={<Divider flexItem orientation="vertical"/>}
                            spacing={2}
                        >
                            <FormControl
                                sx={{
                                    width: 130
                                }}
                                size="small"
                                value={category}
                            >
                                <InputLabel>
                                    Etalase
                                </InputLabel>
                                <Select>
                                    {
                                        etalaseCategories.map((val) => (
                                            <MenuItem key={val.id} value={val.id}>{val.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <IconButton disabled={selectRow.length === 0}>
                                <Delete/>
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="h4" fontWeight={600} sx={{marginBottom: 2}}>Produk toko anda</Typography>
                        <Button variant="contained">
                            Tambah Produk Baru
                        </Button>
                    </Box>
                    <Paper
                        sx={{
                            p: 2
                        }}
                    >
                        {this.renderFilterDataGrid()}
                        <Divider sx={{marginY: 2}}/>
                        {this.renderDataGrid()}
                    </Paper>
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
        lengthProduct: state.shop.lengthProduct,
        popularProduct: state.shop.popularProduct,
        error: state.shop.error
    }
})

const mapDispatchToProps = {
    MyProductShop
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SellerProduct))
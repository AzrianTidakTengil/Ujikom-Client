import { palleteV1 } from "@/assets/css/template"
import { Container, createTheme, Paper, ThemeProvider, Typography, Grid2 as Grid, Card, CardContent, Select, MenuItem, FormControl, InputLabel, Box, IconButton, Divider, Stack, TextField, InputAdornment, Button } from "@mui/material"
import { withRouter } from "next/router"
import {Component} from "react"
import { connect } from "react-redux"
import { SellerLayout } from "@/components"
import { DataGrid } from "@mui/x-data-grid"
import { Delete, Edit, SearchOutlined } from "@mui/icons-material"


class SellerProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: "",
            selectRow: []
        }
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            },
        })
    }

    handleSelectRow = (newRowSelectionModel) => {
        this.setState({ selectRow: newRowSelectionModel })
    }

    renderDataGrid = () => {
        const {selectRow} = this.state

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
                    <IconButton size="small">
                        <Edit fontSize="small"/>
                    </IconButton>
                )
            }
        ]

        const rows = [
            {
                id: 0,
                name: 'Handphone',
                price: 2000,
                stock: 100,
            },
            {
                id: 1,
                name: 'Test 12',
                price: 10000,
                stock: 100,
            },
            {
                id: 2,
                name: 'asdasd',
                price: 10000,
                stock: 100,
            },
        ]

        return (
            <Box>
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
                    onRowSelectionModelChange={this.handleSelectRow}
                    rowSelectionModel={selectRow}
                />
            </Box>
        )
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

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SellerProduct))
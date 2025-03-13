import { palleteV1 } from "@/assets/css/template"
import { Box, Container, createTheme, ThemeProvider, Typography, IconButton, Paper, Chip, Divider, Grid2 as Grid, TextField, InputAdornment, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { Edit, Visibility, SearchOutlined } from "@mui/icons-material"
import { withRouter } from "next/router"
import {Component} from "react"
import { connect } from "react-redux"
import { DataGrid } from "@mui/x-data-grid"

class SellerOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'all'
        }
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            }
        })
    }

    renderDataGrid = () => {
        const {status} = this.state

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
                width: 150,
            },
            {
                field: 'stock',
                headerName: 'Stok',
                width: 150,
            },
            {
                field: 'status',
                headerName: 'Status',
                width: 100,
                renderCell: (params) => (
                    <Chip 
                        label={params.value}
                        color={
                            params.value === "pending" ? 'info' :
                            params.value === "delivery" ? 'warning' :
                            params.value === "success" ? 'success' :
                            'default'
                        }
                    />
                )
            },
            ,{
                field: 'action',
                headerName: 'Aksi',
                width: 100,
                renderCell: (params) => (
                    <IconButton size="small">
                        <Visibility fontSize="small"/>
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
                status: 'pending'
            },
            {
                id: 1,
                name: 'Test 12',
                price: 10000,
                stock: 100,
                status: 'delivery'
            },
            {
                id: 2,
                name: 'asdasd',
                price: 10000,
                stock: 100,
                status: 'success'
            },
        ]

        const statuses = [
            'all',
            'pending',
            'delivery',
            'success'
        ]

        return (
            <Paper
                sx={{
                    p: 2,
                    marginY: 2
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
                            value={status}
                        >
                            <InputLabel>
                                Status
                            </InputLabel>
                            <Select
                                onChange={this.handleFilterStatus}
                            >
                                {
                                    statuses.map((val) => (
                                        <MenuItem value={val}>{val}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Divider sx={{marginY: 2}}/>
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
                    // checkboxSelection
                    columnVisibilityModel={{
                        id: false,
                    }}
                />
            </Paper>
        )
    }

    handleFilterStatus = (event) => {
        console.log(event.target.value)
        this.setState({
            status: event.target.value
        })
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Container>
                    <Typography variant="h4" fontWeight={600}>Pesanan</Typography>
                    {this.renderDataGrid()}
                </Container>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SellerOrder))
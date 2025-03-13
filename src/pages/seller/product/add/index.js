import { palleteV1 } from "@/assets/css/template";
import { ImageInput } from "@/components";
import { Delete } from "@mui/icons-material";
import { Autocomplete, Box, Button, Container, createTheme, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, ThemeProvider, Typography, Grid2 as Grid, InputAdornment, OutlinedInput, IconButton, List, ListItemButton, ListItemText } from "@mui/material";
import { withRouter } from "next/router";
import {Component} from "react";
import { NumericFormat } from "react-number-format";
import { connect } from "react-redux";

class SellerProductAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                name: '',
                images: null,
                category: null,
                condition: 'new',
                description: '',
                price: 0,
                minimumPurchase: 0,
                stock: 0,
                weight: 0,
                size: {
                    width: 0,
                    height: 0,
                    length: 0
                },
                variant: []
            },
            useVariant: false,
            addNewType: false,
        }
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            }
        })
    }

    renderFormInformationProduct = () => {
        const {useVariant} = this.state
        const {name, condition, description, minimumPurchase, stock, weight, size, variant} = this.state.form
        const top100Films = [
            { title: 'The Shawshank Redemption', year: 1994 },
            { title: 'The Godfather', year: 1972 },
            { title: 'The Godfather: Part II', year: 1974 },
            { title: 'The Dark Knight', year: 2008 },
            { title: '12 Angry Men', year: 1957 },
            { title: "Schindler's List", year: 1993 },
            { title: 'Pulp Fiction', year: 1994 },
            {
              title: 'The Lord of the Rings: The Return of the King',
              year: 2003,
            },
        ]

        return (
            <Paper
                sx={{
                    p: 2
                }}
            >
                <Box>
                    <Box
                        sx={{
                            marginY: 2
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>Nama Produk</Typography>
                        <Box
                            sx={{
                                position: 'relative',
                                marginBottom: 2
                            }}
                        >
                            <TextField
                                name="name"
                                maxLength={255}
                                fullWidth
                                variant="outlined"
                                onChange={this.handleChangeLengthName}
                                sx={{
                                    marginY: 1
                                }}
                            />
                            <Box
                                position="absolute"
                                bottom={-20}
                                right={0}
                                fontSize="0.75rem"
                                color="gray"
                            >
                                {`${name.length} / 255`}
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            marginY: 2
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>Kategori</Typography>
                        <Autocomplete
                            disableClearable
                            freeSolo
                            options={top100Films.map((option) => option.title)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            type: 'search',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Box>
                    <Box
                        sx={{
                            marginY: 2
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>Upload Foto</Typography>
                        <ImageInput onImageSelect={this.handleChangeImages}/>
                    </Box>
                    <Box
                        sx={{
                            marginY: 2
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>Kondisi Produk</Typography>
                        <FormControl>
                            <RadioGroup defaultValue={condition} name="condition">
                                <FormControlLabel value="new" control={<Radio/>} label="Baru"/>
                                <FormControlLabel value="old" control={<Radio/>} label="Bekas"/>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            marginY: 2
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>Deskripsi Produk</Typography>
                        <Box
                            sx={{
                                position: 'relative',
                                marginBottom: 2
                            }}
                        >
                            <TextField
                                name="description"
                                maxLength={50000}
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={4}
                                onChange={this.handleChangeLengthDescription}
                                sx={{
                                    marginY: 1
                                }}
                            />
                            <Box
                                position="absolute"
                                bottom={-20}
                                right={0}
                                fontSize="0.75rem"
                                color="gray"
                            >
                                {`${description.length} / 50000`}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()

        console.log(e.target)
    }

    handleChangeLengthName = (event) => {
        const {value} = event.target

        this.setState({
            form: {
                ...this.state.form,
                name: value
            }
        })
    }

    handleChangeLengthDescription = (event) => {
        const {value} = event.target

        this.setState({
            form: {
                ...this.state.form,
                description: value
            }
        })
    }

    handleChangeImages = (files) => {
        this.setState({
            form: {
                ...this.state.form,
                images: files
            }
        })
    }

    renderVariant = () => {
        const {useVariant, addNewType} = this.state
        const {name, condition, description, minimumPurchase, stock, weight, size, variant} = this.state.form
        const top100Films = [
            { title: 'The Shawshank Redemption', year: 1994 },
            { title: 'The Godfather', year: 1972 },
            { title: 'The Godfather: Part II', year: 1974 },
            { title: 'The Dark Knight', year: 2008 },
            { title: '12 Angry Men', year: 1957 },
            { title: "Schindler's List", year: 1993 },
            { title: 'Pulp Fiction', year: 1994 },
            {
              title: 'The Lord of the Rings: The Return of the King',
              year: 2003,
            },
        ]
        const optionType = [
            {
                value: 'color',
                title: 'Warna'
            },
            {
                value: 'size',
                title: 'Ukuran'
            },
            {
                value: 'pack',
                title: 'Kemasan'
            },
        ]

        return (
            <Paper
                sx={{
                    p: 2
                }}
            >
                {
                    useVariant ? (
                        <Box
                            sx={{
                                marginY: 4
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h6" fontWeight={600}>Varian Produk</Typography>
                                <Box
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <Button variant="contained" size="small" onClick={this.handleAddVariant} sx={{marginRight: 2}}>Tambah Varian</Button>
                                    <Button variant="outlined" size="small" onClick={this.handleVariantProduct}>Hapus Semua Varian</Button>
                                </Box>
                            </Box>
                            <Divider sx={{marginY: 2}}/>
                            <Box>
                                {
                                    variant.map((val, index) => (
                                        <Box
                                            key={index}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Typography variant="body1" fontWeight={600}>Tipe Varian {index + 1}</Typography>
                                                <IconButton
                                                    onClick={() => this.handleDeleteVariant(index)}
                                                >
                                                    <Delete/>
                                                </IconButton>
                                            </Box>
                                            <Grid container spacing={2}>
                                                <Grid size={4}>
                                                    <Autocomplete
                                                        disableClearable
                                                        freeSolo
                                                        options={optionType.map((option) => option.title)}
                                                        renderInput={(params) => {
                                                            return (
                                                                <TextField
                                                                    {...params}
                                                                    slotProps={{
                                                                        input: {
                                                                            ...params.InputProps,
                                                                            type: 'search',
                                                                        },
                                                                    }}
                                                                />
                                                            )
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid size={8}>
                                                    <Autocomplete
                                                        freeSolo
                                                        multiple
                                                        options={top100Films.map((option) => option.title)}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                slotProps={{
                                                                    input: {
                                                                        ...params.InputProps,
                                                                        type: 'search',
                                                                    },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container sx={{marginY: 2}} spacing={2}>
                                                <Grid size={3}>
                                                    <Typography variant="body1" fontWeight={500} sx={{marginBottom: 1}}>Harga</Typography>
                                                    <NumericFormat
                                                        name="price"
                                                        thousandSeparator
                                                        prefix="Rp."
                                                        variant="outlined"
                                                        customInput={TextField}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid size={3}>
                                                    <Typography variant="body1" fontWeight={500} sx={{marginBottom: 1}}>Minimal Pembelian</Typography>
                                                    <NumericFormat
                                                        name="minimumPurchase"
                                                        // thousandSeparator
                                                        // prefix="Rp."
                                                        variant="outlined"
                                                        customInput={TextField}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid size={3}>
                                                    <Typography variant="body1" fontWeight={500} sx={{marginBottom: 1}}>Stok Produk</Typography>
                                                    <NumericFormat
                                                        name="stock"
                                                        // thousandSeparator
                                                        // prefix="Rp."
                                                        variant="outlined"
                                                        customInput={TextField}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid size={3}>
                                                    <Typography variant="body1" fontWeight={500} sx={{marginBottom: 1}}>Berat</Typography>
                                                    <NumericFormat
                                                        name="weight"
                                                        thousandSeparator
                                                        // prefix="Rp."
                                                        variant="outlined"
                                                        customInput={TextField}
                                                        fullWidth
                                                        slotProps={{
                                                            input: {
                                                                endAdornment: <InputAdornment position="end">gram</InputAdornment>,
                                                            },
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    ))
                                }
                            </Box>
                        </Box>
                    )
                    : (
                        <>
                            <Box
                                sx={{
                                    marginY: 4,
                                    p: 2,
                                    borderWidth: '2px',
                                    borderStyle: 'dashed',
                                    borderColor: '#888888',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" fontWeight={600}>Varian Produk</Typography>
                                    <Typography variant="subtitle1">
                                        Tambahkan varian maksimal 2 tipe
                                    </Typography>
                                </Box>
                                <Button 
                                    variant="contained"
                                    onClick={this.handleVariantProduct}
                                >
                                    Tambahkan
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    marginY: 2
                                }}
                            >
                                <Typography variant="h6" fontWeight={600}>Pembelian Produk</Typography>
                                <Grid container sx={{marginY: 2}} spacing={2}>
                                    <Grid size={3}>
                                        <Typography variant="body1" fontWeight={500} sx={{marginBottom: 1}}>Harga</Typography>
                                        <NumericFormat
                                            name="price"
                                            thousandSeparator
                                            prefix="Rp."
                                            variant="outlined"
                                            customInput={TextField}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid size={3}>
                                        <Typography variant="body1" fontWeight={500} sx={{marginBottom: 1}}>Minimal Pembelian</Typography>
                                        <NumericFormat
                                            name="minimumPurchase"
                                            // thousandSeparator
                                            // prefix="Rp."
                                            variant="outlined"
                                            customInput={TextField}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid size={3}>
                                        <Typography variant="body1" fontWeight={500} sx={{marginBottom: 1}}>Stok Produk</Typography>
                                        <NumericFormat
                                            name="stock"
                                            // thousandSeparator
                                            // prefix="Rp."
                                            variant="outlined"
                                            customInput={TextField}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid size={3}>
                                        <Typography variant="body1" fontWeight={500} sx={{marginBottom: 1}}>Berat</Typography>
                                        <NumericFormat
                                            name="weight"
                                            thousandSeparator
                                            // prefix="Rp."
                                            variant="outlined"
                                            customInput={TextField}
                                            fullWidth
                                            slotProps={{
                                                input: {
                                                    endAdornment: <InputAdornment position="end">gram</InputAdornment>,
                                                },
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </>
                    )
                }
            </Paper>
        )
    }

    handleNumberInput = (event) => {
        const {name, value} = event.target

        if (name === 'weight') {
            if (/\d/g.test(value)) {
                this.setState({
                    form: {
                        ...this.state.form,
                        weight: value
                    }
                })
            }
        }
    }

    handleAddVariant = () => {
        this.setState({
            form: {
                ...this.state.form,
                variant: [
                    ...this.state.form.variant,
                    {
                        name: '',
                        type: []
                    }
                ]
            }
        })
    }

    handleVariantProduct = () => {
        const {useVariant, form} = this.state

        this.setState({
            useVariant: !useVariant
        })

        if (!useVariant) {
            this.setState({
                form: {
                    ...form,
                    variant: [
                        {
                            name: '',
                            type: []
                        }
                    ]
                }
            })
        } else {
            this.setState({
                form: {
                    ...form,
                    variant: []
                }
            })
        }
    }

    handleChangeSelectTypeVariant = (event, index) => {
        const {name, value} = event.target
        
        this.setState((prevState) => {
            const array = prevState.form.variant.map((val, i) =>
                i === index ? {...val, name: value} : val
            )
            return {
                form: {
                    ...this.state.form,
                    variant: array
                }
            }
        })
    }

    handleCreateType = (event) => {
        const {value} = event.target

        if (event.key === "Enter") {
            console.log(value)
        }
    }

    handleDeleteVariant = (index) => {
        const {form} = this.state
        
        if (form.variant.length > 1) {
            const array = form.variant.filter((_, i) => i != index)
            this.setState({
                form: {
                    ...form,
                    variant: array
                }
            })
        } else {
            this.handleVariantProduct()
        }
    }

    handleSubmitNewType = (e) => {
        e.preventDefault()
    }

    renderSizeProduct = () => {
        const {useVariant} = this.state
        const {name, condition, description, minimumPurchase, stock, weight, size, variant} = this.state.form

        return (
            <Paper
                sx={{
                    p: 2
                }}
            >
                <Typography variant="h6" fontWeight={600}>Ukuran Produk</Typography>
                <Grid container sx={{marginY: 2}} spacing={2}>
                    <Grid size={4}>
                        <Typography variant="body1" fontWeight={500} sx={{marginBottom: 1}}>Panjang</Typography>
                        <NumericFormat
                            name="width"
                            // thousandSeparator
                            // prefix="Rp."
                            variant="outlined"
                            customInput={TextField}
                            fullWidth
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={4}>
                        <Typography variant="body1" fontWeight={500} sx={{marginBottom: 1}}>Lebar</Typography>
                        <NumericFormat
                            name="height"
                            // thousandSeparator
                            // prefix="Rp."
                            variant="outlined"
                            customInput={TextField}
                            fullWidth
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={4}>
                        <Typography variant="body1" fontWeight={500} sx={{marginBottom: 1}}>Tinggi</Typography>
                        <NumericFormat
                            name="length"
                            // thousandSeparator
                            // prefix="Rp."
                            variant="outlined"
                            customInput={TextField}
                            fullWidth
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    render() {
        const {form} = this.state

        return (
            <ThemeProvider theme={this.theme}>
                <Container>
                    <Typography variant="h4" fontWeight={600}>Tambahkan Produk</Typography>
                    <form onSubmit={this.handleSubmit}>
                        <Box
                            sx={{
                                marginY: 2
                            }}
                        >
                            {this.renderFormInformationProduct()}
                        </Box>
                        <Box
                            sx={{
                                marginY: 2
                            }}
                        >
                            {this.renderVariant()}
                        </Box>
                        <Box
                            sx={{
                                marginY: 2
                            }}
                        >
                            {this.renderSizeProduct()}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'center'
                            }}
                        >
                            <Button
                                type='submit'
                                variant="contained"
                            >
                                Simpan
                            </Button>
                        </Box>
                    </form>
                </Container>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SellerProductAdd))
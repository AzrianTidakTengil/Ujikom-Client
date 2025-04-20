import { palleteV1 } from "@/assets/css/template";
import { ImageInput } from "@/components";
import { createProduct, createSubVariantProduct, createVariantProduct, listCategoriesProduct, listSubVariantProduct, listVariantProduct } from "@/store/products";
import { Delete } from "@mui/icons-material";
import { Autocomplete, Box, Button, Container, createTheme, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, ThemeProvider, Typography, Grid2 as Grid, InputAdornment, OutlinedInput, IconButton, List, ListItemButton, ListItemText, Backdrop, CircularProgress } from "@mui/material";
import { withRouter } from "next/router";
import {Component} from "react";
import { NumericFormat } from "react-number-format";
import { connect } from "react-redux";
import ProductMessage from '@/store/products/message'

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
                price: null,
                minimumPurchase: null,
                stock: null,
                weight: null,
                size: {
                    long: null,
                    width: null,
                    height: null
                },
                variant: []
            },
            useVariant: false,
            addNewType: false,
            categories: [],
            variants: [],
            subvariants: [],
            loading: false,
        }
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            }
        })
    }

    componentDidMount() {
        this.props.listCategoriesProduct();
        this.props.listVariantProduct();
    }
      
    componentDidUpdate(prevProps) {
        const {
          isLoading,
          isSuccess,
          listCategories,
          listVariant,
          listSubVariant,
          message,
          router
        } = this.props;
      
        if (
          isSuccess &&
          listCategories !== prevProps.listCategories &&
          listCategories
        ) {
          this.setState({ categories: listCategories });
        }
      
        if (
          isSuccess &&
          listVariant !== prevProps.listVariant &&
          listVariant
        ) {
          this.setState({
            variants: [
              ...listVariant,
              {
                id: 0,
                name: 'Tambah Opsi'
              }
            ]
          });
        }
      
        if (
          isSuccess &&
          listSubVariant !== prevProps.listSubVariant &&
          listSubVariant
        ) {
          this.setState({
            subvariants: [
              ...listSubVariant,
              {
                id: 0,
                name: 'Tambah Opsi'
              }
            ]
          });
        }
      
        if (
          isSuccess &&
          message == ProductMessage.PRODUCTS.CREATE &&
          (isSuccess !== prevProps.isSuccess || message !== prevProps.message)
        ) {
          router.push({
            pathname: '/seller/product'
          });
        }
      
        if (
          isLoading &&
          message === ProductMessage.PRODUCTS.CREATE &&
          (isLoading !== prevProps.isLoading || message !== prevProps.message)
        ) {
          this.setState({ loading: true });
        }
      }
      

    renderFormInformationProduct = () => {
        const {useVariant, categories} = this.state
        const {name, condition, description, minimumPurchase, stock, weight, size, variant} = this.state.form

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
                            options={categories}
                            onChange={this.handleChangeCategory}
                            getOptionLabel={(category) => category.label}
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
                            <RadioGroup onChange={this.handleChangeRadioCondition} defaultValue={condition} name="condition">
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

    handleChangeRadioCondition = (event) => {
        const {value, name} = event.target

        this.setState({
            form: {
                ...this.state.form,
                condition: value
            }
        })
    }

    handleChangeCategory = (event, newValue) => {
        this.setState({
            form: {
                ...this.state.form,
                category: newValue.value
            }
        })
    }

    renderVariant = () => {
        const {useVariant, addNewType, variants, subvariants} = this.state
        const {name, condition, description, minimumPurchase, stock, weight, size, variant} = this.state.form

        return (
            <Paper
                sx={{
                    p: 2
                }}
            >
                <>
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
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="Rp "
                                    variant="outlined"
                                    customInput={TextField}
                                    fullWidth
                                    onValueChange={(values) => {
                                        this.setState({
                                            form: {
                                                ...this.state.form,
                                                price: parseInt(values.value)
                                            }
                                        })
                                    }}
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
                                    onChange={this.handleChangeNoVariant}
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
                                    onChange={this.handleChangeNoVariant}
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
                                    onChange={this.handleChangeNoVariant}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </>
            </Paper>
        )
    }

    handleChangeNoVariant = (event) => {
        const {name, value} = event.target

        this.setState({
            form: {
                ...this.state.form,
                [name]: parseInt(value)
            }
        })
    }

    handleAddVariant = () => {
        this.setState({
            form: {
                ...this.state.form,
                variant: [
                    ...this.state.form.variant,
                    {
                        id: null,
                        type: [],
                        price: null,
                        minimumPurchase: null,
                        stock: null,
                        weight: null,
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
                            id: null,
                            type: [],
                            price: null,
                            minimumPurchase: null,
                            stock: null,
                            weight: null,
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

    handleChangeSelectVariant = (value) => {
        if (value === 1) {
            const colors = ["blue", "red", "yellow", "purple", "green", "orange", "black", "white"]

            this.setState({
                subvariants: [
                    ...colors.map((c, i) => ({id: i + 1, name: c})),
                    {
                        id: 0,
                        name: 'Tambah Opsi'
                    }
                ]
            })   
        } else if (value === 2) {
            const size = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

            this.setState({
                subvariants: [
                    ...size.map((c, i) => ({id: i + 1, name: c})),
                ]
            })   
        } else if (value === 3) {
            const packages = ['small', 'medium', 'large']

            this.setState({
                subvariants: [
                    ...packages.map((c, i) => ({id: i + 1, name: c})),
                ]
            })   
        }
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
                            name="long"
                            // thousandSeparator
                            // prefix="Rp."
                            variant="outlined"
                            customInput={TextField}
                            fullWidth
                            onChange={this.handleChangeSize}
                            value={size.long}
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
                            name="width"
                            // thousandSeparator
                            // prefix="Rp."
                            variant="outlined"
                            customInput={TextField}
                            onChange={this.handleChangeSize}
                            value={size.width}
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
                            name="height"
                            // thousandSeparator
                            // prefix="Rp."
                            variant="outlined"
                            customInput={TextField}
                            fullWidth
                            value={size.height}
                            onChange={this.handleChangeSize}
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

    handleChangeSize = (event) => {
        const {name, value} = event.target
        
        this.setState({
            form: {
                ...this.state.form,
                size: {
                    ...this.state.form.size,
                    [name]: value
                }
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {images, name, description, condition, size, category, variant, price, minimumPurchase, stock, weight} = this.state.form

        const noVariants = [
            {
                id: null,
                price,
                minimum_purchase: minimumPurchase,
                stock,
                weight,
                subvariant: []
            }
        ]

        const params = {
            name,
            description,
            condition,
            long: parseInt(size.long),
            width: parseInt(size.width),
            height: parseInt(size.height),
            categories: category,
            images,
            variants: variant.length != 0 ? variant.map((v) => ({
                id: v.id,
                price: v.price,
                minimum_purchase: v.minimumPurchase,
                stock: v.stock,
                weight: v.weight,
                subvariant: v.type
            })) : noVariants
        }

        this.props.createProduct(params)
    }

    render() {
        const {form, loading} = this.state

        return (
            <ThemeProvider theme={this.theme}>
                <Backdrop
                    open={loading}
                    sx={{zIndex: this.theme.zIndex.appBar + 1000}}
                >
                    <CircularProgress color="info"/>
                </Backdrop>
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
    isLoading: state.product.isLoading,
    isSuccess: state.product.isSuccess,
    error: state.product.error,
    listCategories: state.product.listCategories,
    listVariant: state.product.listVariant,
    listSubVariant: state.product.listSubVariant,
    message: state.product.message,
})

const mapDispatchToProps = {
    createProduct,
    listCategoriesProduct,
    listVariantProduct,
    listSubVariantProduct,
    createVariantProduct,
    createSubVariantProduct,
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SellerProductAdd))
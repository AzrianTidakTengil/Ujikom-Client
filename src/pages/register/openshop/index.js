import { palleteV1 } from "@/assets/css/template";
import { InputText } from "@/components/input";
import styles from "../style.module.css";
import { Backdrop, Box, Button, CircularProgress, Container, createTheme, Grid2, Paper, Stack, ThemeProvider, Typography, Autocomplete, IconButton, TextField } from "@mui/material";
import { withRouter } from "next/router";
import { Component } from "react";
import { connect } from "react-redux";
import { Playfair_Display, Poppins } from "next/font/google";
import { ChangeRoleShop, downProgress, resetProgress, upProgress } from "@/store/auth";
import { CheckCircleRounded, ArrowBackIosNew } from "@mui/icons-material";
const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });
import { GetCities, GetDistrict, GetProvinces } from "@/store/region";
import { City, District } from "@/services/region";
import RegionMessage from '@/store/region/message'


class RegisterOpenShop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                name: null,
                description: null,
                address: '',
                district: '',
                city: '',
                province: '',
                country: '',
                postal_code: '',
            },
            selectAddres: {
                province: '',
                city: '',
                district: ''
            },
            provinces: [],
            cities: [],
            districts: [],
        }
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            }
        })
    }

    componentDidMount() {
        this.props.resetProgress()
        this.props.GetProvinces()
    }

    componentDidUpdate(prevProps) {
        const { shop, region } = this.props;
        const { provinces, selectAddres, address, cities } = this.state;

        // Handle provinces change
        if (region.isSuccess && region.message === RegionMessage.REGION.PROVINCES && region !== prevProps.region) {
            this.setState({
            provinces: region.provinces,
            });
        
            if (address && address.province) {
            const provinceId = region.provinces.find(
                (province) => province.name === address.province.toUpperCase()
            );
        
            if (provinceId && provinceId.id) {
                this.setState({
                selectAddres: {
                    ...selectAddres,
                    province: provinceId.id,
                },
                });
        
                this.props.GetCities({ province_id: provinceId.id });
            }
            }
        }
        
        // Handle cities change
        if (region.isSuccess && region.message === RegionMessage.REGION.CITIES && region !== prevProps.region) {
            this.setState({
            cities: region.cities,
            });
        
            if (address && address.city) {
            const cityId = region.cities.find(
                (city) => city.name === address.city.toUpperCase()
            );
        
            if (cityId && cityId.id) {
                this.setState({
                selectAddres: {
                    ...selectAddres,
                    city: cityId.id,
                },
                });
        
                this.props.GetDistrict({ city_id: cityId.id });
            }
            }
        }
        
        // Handle districts change
        if (region.isSuccess && region.message === RegionMessage.REGION.DISTRICT && region !== prevProps.region) {
            this.setState({
            districts: region.districts,
            });
        }
    }

    renderInformation = () => {
        return (
            <>
                <Typography variant="h5" textAlign={'center'} fontWeight={600} sx={{marginY: 2}}>Bergabung Menjadi Penjual</Typography>
                <Box
                    sx={{
                        marginY: 2,
                        paddingX: 2,
                    }}
                >
                    <form className={styles.Box_main}>
                        <Typography variant="body1" textAlign={'center'} sx={{marginY: 2}}>Mari bergabung menjadi tim dari Popping Seller untuk melengkapi kebutuhan seluruh pembeli Indonesia</Typography>
                        <Button variant="contained" color="success" fullWidth type="submit" sx={{marginY: 4}} onClick={this.handleNextStep}>Lanjutkan</Button>
                    </form>
                </Box>
                <div className={styles.Box_footer} style={{marginTop: '0.5rem'}}>
                    {/* footer */}
                </div>
            </>
        )
    }

    handleNextStep = () => {
        this.props.upProgress()
    }

    handleBacktStep = () => {
        this.props.downProgress()
    }

    renderCreateInformationShop = () => {
        return (
            <>
                <Grid2 container spacing={2}>
                    <Grid2 size={3}>
                        <IconButton onClick={this.handleBacktStep}>
                            <ArrowBackIosNew/>
                        </IconButton>
                    </Grid2>
                    <Grid2 size={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography variant="h5" textAlign={'center'} fontWeight={600}>Informasi Toko</Typography>
                    </Grid2>
                    <Grid2 size={3}>

                    </Grid2>
                </Grid2>
                <Box
                    sx={{
                        marginY: 2,
                        paddingX: 2,
                    }}
                >
                    <form className={styles.Box_main}>
                        <InputText
                            name="name"
                            label="Nama toko"
                            fullWidth
                            sx={{
                                marginY: 2
                            }}
                            onChange={this.handleChangeFormInformation}
                        />
                        <TextField
                            name="description"
                            label="Deskripsi toko"
                            fullWidth
                            maxLength={50000}
                            variant="outlined"
                            multiline
                            rows={4}
                            sx={{
                                marginY: 2
                            }}
                            onChange={this.handleChangeFormInformation}
                        />
                        <Button variant="contained" color="success" fullWidth type="submit" sx={{marginY: 4}} onClick={this.handleNextStep}>Lanjutkan</Button>
                    </form>
                </Box>
                <div className={styles.Box_footer} style={{marginTop: '0.5rem'}}>
                    {/* footer */}
                </div>
            </>
        )
    }

    handleChangeFormInformation = (event) => {
        const {name, value} = event.target

        if (name == 'name') {
            this.setState({
                form: {
                    ...this.state.form,
                    name: value
                }
            })
        } else if (name == 'description') {
            this.setState({
                form: {
                    ...this.state.form,
                    description: value
                }
            })
        }
    }

    renderCreateAddressShop = () => {
        const { provinces, cities, selectAddres, districts } = this.state

        return (
            <>
                <Grid2 container spacing={2}>
                    <Grid2 size={3}>
                        <IconButton onClick={this.handleBacktStep}>
                            <ArrowBackIosNew/>
                        </IconButton>
                    </Grid2>
                    <Grid2 size={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography variant="h5" textAlign={'center'} fontWeight={600}>Informasi Toko</Typography>
                    </Grid2>
                    <Grid2 size={3}>

                    </Grid2>
                </Grid2>
                <Box
                    sx={{
                        marginY: 2,
                        paddingX: 2,
                    }}
                >
                    <form onSubmit={this.handleSubmit}>
                        <Box
                            sx={{
                                marginY: 2
                            }}
                        >
                            <Typography variant='body1'>Detail Alamat</Typography>
                            <TextField 
                                name="address"
                                variant='outlined'
                                size="small"
                                fullWidth
                                sx={{
                                    marginY: 1
                                }}
                                onChange={this.handleChangeAddress}
                            />
                        </Box>
                        <Box
                            sx={{
                                marginY: 2
                            }}
                        >
                            <Typography variant='body1'>Provinsi</Typography>
                            <Autocomplete
                                name="province"
                                disableClearable
                                freeSolo
                                options={provinces}
                                getOptionLabel={(province) => province.name}
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
                                sx={{
                                    marginY: 1,
                                    textTransform: 'capitalize'
                                }}
                                onChange={this.handleSelectProvince}
                            />
                        </Box>
                        <Box
                            sx={{
                                marginY: 2
                            }}
                        >
                            <Typography variant='body1'>Kota / Kabupaten</Typography>
                            <Autocomplete 
                                name="city"
                                disableClearable
                                freeSolo
                                options={cities}
                                getOptionLabel={(city) => city.name}
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
                                sx={{
                                    marginY: 1
                                }}
                                disabled={!selectAddres.province}
                                loading={!cities}
                                onChange={this.handleSelectCity}
                            />
                        </Box>
                        <Box
                            sx={{
                                marginY: 2
                            }}
                        >
                            <Typography variant='body1'>Kecamatan</Typography>
                            <Autocomplete
                                name="district"
                                disableClearable
                                freeSolo
                                options={districts}
                                getOptionLabel={(district) => district.name}
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
                                sx={{
                                    marginY: 1
                                }}
                                disabled={!selectAddres.province && !selectAddres.city}
                                onChange={this.handleSelectDistrict}
                            />
                        </Box>
                        <Button variant="contained" color="success" fullWidth type="submit" sx={{marginY: 4}}>Submit</Button>
                    </form>
                </Box>
                <div className={styles.Box_footer} style={{marginTop: '0.5rem'}}>
                    {/* footer */}
                </div>
            </>
        )
    }

    handleChangeAddress = (event) => {
        const {value} = event.target

        if (value.length != 0) {
            this.setState({
                form: {
                    ...this.state.form,
                    address: value
                }
            })
        }
    }

    handleSelectProvince = (event, newValue) => {
        const {id, name} = newValue

        this.setState({
            form: {
                ...this.state.form,
                province: name
            },
            selectAddres: {
                ...this.state.selectAddres,
                province: id
            },
            cities: [],
            districts: []
        })

        this.serviceGetCity({province_id: id})
    }

    serviceGetCity = async (params) => {
        const response = await City(params)

        this.setState({
            cities: response.data
        })
    }

    handleSelectCity = (event, newValue) => {
        const {id, name} = newValue

        this.setState({
            form: {
                ...this.state.form,
                city: name
            },
            selectAddres: {
                ...this.state.selectAddres,
                city: id
            },
            districts: []
        })

        this.serviceGetDistrict({city_id: id})
    }

    handleSelectDistrict = (event, newValue) => {
        const {id, name} = newValue

        this.setState({
            form: {
                ...this.state.form,
                district: name
            },
        })
    }

    serviceGetDistrict = async (params) => {
        const response = await District(params)
        
        this.setState({
            districts: response.data
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {name, description, address, province, city, district} = this.state.form

        const params = {
            name,
            description,
            address,
            province,
            city,
            district,
        }

        this.props.ChangeRoleShop(params)
    }

    renderSuccess = () => {
        return(
            <>
                <div className={styles.Box_title}>
                </div>
                <div className={styles.Box_main}>
                    <CheckCircleRounded color="success" sx={{fontSize: '5rem'}}/>
                    <p>Anda telah berhasil terdaftar sebagai penjual. Lanjutkan ke laman dashboard</p>
                    <Stack
                        direction={'row'}
                        spacing={2}
                    >
                        <Button variant="contained" color="success" href="/seller/">Menuju dashboard</Button>
                        <Button variant="outlined" href="/">Kembali ke laman utama</Button>
                    </Stack>
                </div>
            </>
        )
    }

    render() {
        const {progressIndex} = this.props.auth

        return (
            <ThemeProvider theme={this.theme}>
                <Container sx={{paddingY: 8}}>
                    <Grid2 container>
                        <Grid2 size={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Box>
                                <Typography textAlign={'center'} variant="h3" className={playfair.className}>Popping Marketplace</Typography>
                                <Typography textAlign={'center'} variant="body1" marginY={2} className={playfair.className}>Tempat berbelanja secara daring</Typography>
                            </Box>
                        </Grid2>
                        <Grid2 size={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Paper
                                sx={{
                                    p: 2,
                                    position: 'relative',
                                    width: '100%',
                                }}
                            >
                                <Backdrop
                                    open={this.props.auth.isLoading}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        zIndex: this.theme.zIndex.modal + 1,
                                        backgroundColor: 'rgba(236, 236, 236, 0.3)'
                                    }}
                                >
                                    <CircularProgress color="white"/>
                                </Backdrop>
                                {
                                    progressIndex === 0 ? this.renderInformation() : 
                                    progressIndex === 1 ? this.renderCreateInformationShop() : 
                                    progressIndex === 2 ? this.renderCreateAddressShop() : 
                                    this.renderSuccess()
                                }
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Container>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: {
        isLoading: state.auth.isLoading,
        error: state.auth.error,
        data: state.auth.data,
        token: state.auth.token,
        isSuccessToken: state.auth.isSuccessToken,
        isSuccessSend: state.auth.isSuccessSend,
        progressIndex: state.auth.progressIndex,
    },
    region: {
        isSuccess: state.region.isSuccess,
        isLoading: state.region.isLoading,
        message: state.region.message,
        error: state.region.error,
        districts: state.region.district,
        provinces: state.region.provinces,
        cities: state.region.cities,
    }
})

const mapDispatchToProps = {
    upProgress,
    resetProgress,
    GetProvinces,
    GetCities,
    GetDistrict,
    downProgress,
    ChangeRoleShop,
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(RegisterOpenShop))
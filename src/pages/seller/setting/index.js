import { palleteV1 } from "@/assets/css/template";
import { ImageInput, TimePick, TimePicker } from "@/components";
import { clearMessageShop, getSeller, OperationShop, ShopAddress, UpdateAddressShop } from "@/store/shop";
import { ExpandMore } from '@mui/icons-material';
import { Accordion, Box, createTheme, ThemeProvider, Typography, Grid2 as Grid, Paper, TextField, Button, AccordionSummary, AccordionDetails, Container, Stack, Divider, FormGroup, FormControlLabel, Switch, Autocomplete } from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { withRouter } from "next/router";
import {Component} from "react";
import { NumericFormat } from "react-number-format";
import { connect } from "react-redux";
import ShopMessage from '@/store/shop/message'
import RegionMessage from '@/store/region/message'
import { GetCities, GetDistrict, GetProvinces } from "@/store/region";
import { City, District } from "@/services/region";

class SellerSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            information: {
                name: '',
                description: '',
            },
            form: {
                name: '',
                description: '',
            },
            address: {
                address: '',
                district: '',
                city: '',
                province: '',
                country: '',
                postal_code: '',
                latitude: '',
                longtitude: ''
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
        const { region, shop } = this.props;

        this.props.getSeller();
        this.props.OperationShop();
        this.props.ShopAddress();
        this.props.GetProvinces();
    }
      
    componentDidUpdate(prevProps, prevState) {
        const { shop, region } = this.props;
        const { provinces, selectAddres, address, cities } = this.state;
      
        // Check if shop data has changed and update state accordingly
        if (shop.isSuccess && shop !== prevProps.shop) {
          this.setState({
            information: {
              name: shop.seller.name,
              description: shop.seller.description,
            },
          });
          this.props.clearMessageShop();
        }
      
        // If the address is retrieved, set the state with the new address information
        if (shop.isSuccess && shop.message === ShopMessage.STORE.ADDRESS.GET && shop !== prevProps.shop) {
          this.setState({
            address: {
              address: shop.address.address,
              district: shop.address.district,
              city: shop.address.city,
              province: shop.address.province,
              country: shop.address.country,
              postal_code: shop.address.postal_code,
              latitude: shop.address.latitude,
              longtitude: shop.address.longtitude,
            },
          });
          this.props.clearMessageShop();
        }
      
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
        const {information} = this.state

        return (
            <Box
                sx={{
                    p: 2
                }}
            >
                <form>
                    <Grid container>
                        <Grid size={5}>
                            <Typography variant="body1" textAlign={'center'} textTransform={'capitalize'} sx={{marginBottom: 2}}>Foto profile toko</Typography>
                            <ImageInput/>
                        </Grid>
                        <Grid size={7}>
                            <Box>
                                <Typography variant='body1'>Nama Toko</Typography>
                                <TextField 
                                    variant='outlined'
                                    size="small"
                                    fullWidth
                                    sx={{
                                        marginY: 1
                                    }}
                                    value={information.name}
                                />
                            </Box>
                            <Box
                                sx={{
                                    marginY: 2
                                }}
                            >
                                <Typography variant='body1'>Deskripsi Toko</Typography>
                                <Box
                                    sx={{
                                        position: 'relative'
                                    }}
                                >
                                    <TextField
                                        value={information.description}
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
                                        {/* {`${information.description.length} / 50000`} */}
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                            marginTop: 4
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
            </Box>
        )
    }

    renderOperationWork = () => {
        const days = [
            'senin',
            'selasa',
            'rabu',
            'kamis',
            'jumat',
            'sabtu',
            'minggu'
        ]

        return (
            <Box
                sx={{
                    p: 2
                }}
            >
                <form>
                    {
                        days.map((day) => (
                            <Grid container spacing={2} sx={{ marginY: 4 }} key={day}>
                                <Grid size={2}>
                                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{day}</Typography>
                                </Grid>
                                <Grid size={4}>
                                    <TimePick
                                        label="Jam mulai"
                                        value={dayjs().hour(8).minute(0)}
                                        // size="small"
                                    />
                                </Grid>
                                <Grid size={4}>
                                    <TimePick
                                        label="Jam selesai"
                                        value={dayjs().hour(17).minute(0)}
                                    />
                                </Grid>
                                <Grid size={2}>
                                    <FormGroup>
                                        <FormControlLabel control={<Switch/>} label={'Libur Rutin'}/>
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        ))
                    }
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                            marginTop: 4
                        }}
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                marginRight: 2
                            }}
                        >
                            Atur Hari Libur
                        </Button>
                        <Button
                            type='submit'
                            variant="contained"
                        >
                            Simpan
                        </Button>
                    </Box>
                </form>
            </Box>
        )
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

    renderLocationShop = () => {
        const {address, provinces, cities, selectAddres, districts} = this.state


        return (
            <Box
                sx={{
                    p: 2
                }}
            >
                <form onSubmit={this.handleSubmitAddressShop}>
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
                            value={address.address}
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
                            value={address.province ? provinces.find((provice) => provice.name == address.province.toUpperCase()) : null}
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
                            value={address.city ? cities.find((city) => city.name == address.city.toUpperCase()) : null}
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
                            value={address.district ? districts.find((district) => district.name == address.district.toUpperCase()) : null}
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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                            marginTop: 4
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
            </Box>
        )
    }

    handleChangeAddress = (event) => {
        const {value} = event.target

        if (value.length != 0) {
            this.setState({
                address: {
                    ...this.state.address,
                    address: value
                }
            })
        }
    }

    handleSelectProvince = (event, newValue) => {
        const {id, name} = newValue

        this.setState({
            address: {
                ...this.state.address,
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
            address: {
                ...this.state.address,
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
            address: {
                ...this.state.address,
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

    handleSubmitAddressShop = (event) => {
        event.preventDefault()
        const {address, district, city, province} = this.state.address

        this.props.UpdateAddressShop({
            address,
            district,
            city,
            province
        })
    }

    render() {
        const featureAccordion = [
            {
                title: 'Informasi Toko',
                element: this.renderInformation()
            }, 
            {
                title: 'Atur Hari dan Jam Operasional',
                element: this.renderOperationWork()
            },
            {
                title: 'Lokasi Toko',
                element: this.renderLocationShop()
            },
        ]

        return (
            <ThemeProvider theme={this.theme}>
                <Container>
                    <Typography variant='h4' fontWeight={600} sx={{marginBottom: 2}}>Pengaturan</Typography>
                    {
                        featureAccordion.map((render, index) => (
                            <Accordion key={index} defaultExpanded={index === 0}>
                                <AccordionSummary
                                    expandIcon={<ExpandMore/>}
                                >
                                    <Typography variant='h6' fontWeight={600} component="span">{render.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {render.element}
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
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
        address: state.shop.address,
        message: state.shop.message,
        error: state.shop.error
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
    getSeller,
    OperationShop,
    ShopAddress,
    GetDistrict,
    GetProvinces,
    GetCities,
    UpdateAddressShop,
    clearMessageShop
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SellerSetting))
import React, { Component, createRef } from "react";
import { Container, Card, CardContent, Typography, Avatar, AppBar, Toolbar, Button, Box, Stack, Grid2 as Grid, Divider, Tab, Tabs, InputAdornment, TextField, Paper, Chip, CircularProgress, Modal, createTheme, ThemeProvider, List, IconButton, ListItemAvatar, ListItemText, ListItem } from "@mui/material";
import { connect } from "react-redux";
import { ChevronRight, Email, Phone, SearchOutlined, Update } from "@mui/icons-material";
import { getAll as getAllAddress, find } from "@/store/address";
import { getAllTransaction, findTransaction } from "@/store/transaction";
import { CropImage, DateRangePicker, Dropdown } from "@/components";
import dayjs from "dayjs";
import { breakpointsTw, palleteV1 } from '@/assets/css/template'
import { deleteAvatarUser, updateAvatarUser } from "@/store/user";
import { Cld } from "@/config";
import UserMessage from '@/store/user/message'
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { withRouter } from "next/router";
import { InputDate, InputGender, InputText } from "@/components/input";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        fullname: "",
        birthDay: null,
        gender: "",
        email: "",
        telephone: "",
        avatar: "",
      },
      renderTabs: 'address',
      addresses: [],
      transaction: {
        limit: 10,
        offset: 0,
        data: [],
        status: 'pending',
        startDate: null,
        endDate: null,
        search: '',
      },
      image: null,
      previewImage: null,
      modalEditorAvatar: false,
      cropImage: null,
    };
    this.inputImageReff = createRef()
    this.cropperRef = createRef()
    this.theme = createTheme({
        palette: {
            ...palleteV1.palette
        },
        breakpoints: {
          ...breakpointsTw.breakpoints
        },
    })
  }

  componentDidMount() {
    this.props.getAllAddress();
  }
  
  componentDidUpdate(prevProps) {
    const { user, address, transaction } = this.props;
  
    // User updated
    if (user !== prevProps.user && user.isSuccess) {
      this.setState({
        user: {
          ...this.state.user,
          username: user.username,
          fullname: `${user.firstname} ${user.lastname}`,
          email: user.email,
          telephone: user.telephone,
          avatar: user.avatar,
        },
      });
    }
  
    // Address updated
    if (address !== prevProps.address && address.isSuccess) {
      this.setState({
        addresses: address.list.data,
      });
    }
  
    // Transaction updated
    if (transaction !== prevProps.transaction && transaction.isSuccess) {
      this.setState({
        transaction: {
          ...this.state.transaction,
          data: transaction.list.data,
        },
      });
    }
  }  

  renderMoreAddress = () => {
    const {addresses} = this.state
    const {address} = this.props

    return (
      <Box
        sx={{
          paddingY: 2
        }}
      >
        <div className="flex space-x-2">
          <div className="flex-2/3">
            <TextField
              fullWidth
              size="small"
              hiddenLabel
              slotProps={{ input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined/>
                  </InputAdornment>
                )
              }}}
              onChange={this.handleChangeSearchAddress}
            />
          </div>
          <div className="flex-1/3">
            <Button variant="contained" fullWidth>
              Tambah Alamat
            </Button>
          </div>
        </div>
        <Box sx={{
          minHeight: '30rem'
        }}>
          {
            address.isLoading ? (
              <CircularProgress sx={{marginTop: 2}}/>
            ) : addresses[0] ? addresses.map((val) => (
              <Paper
                key={val.id}
                sx={{
                  marginY: 2,
                  p: 2
                }}
              >
                <Grid container>
                  <Grid size={10}>
                    <Stack
                      sx={{marginY: 2}}
                      direction="row"
                      alignItems={'center'}
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2} 
                    >
                      <Typography variant="body1" fontWeight={600}>{val.receiver ? val.receiver : ''}</Typography>
                      <Typography variant="body1">{val.name}</Typography>
                      {
                        val.selectedAddressUser ? (
                          <Chip label="Dipilih" color="success"/>
                        ) : ''
                      }
                      {
                        val.defaultAddressUser ? (
                          <Chip label="Utama" />
                        ) : ''
                      }
                    </Stack>
                    <Typography variant="body1" sx={{marginY: 2}} textAlign={'left'}>{val.telephone}</Typography>
                    <Typography variant="body1" sx={{marginY: 2}} textAlign={'left'}>{`${val.address}, ${val.district}, ${val.city}, ${val.province}, ${val.postal_code} ${val.notes ? `(${val.notes})` : ''}`}</Typography>
                  </Grid>
                  <Grid 
                    size={2}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    {
                      !val.selectedAddressUser ? (
                        <Button variant="contained" color="success">
                          Pilih
                        </Button>
                      ) : ''
                    }
                    {
                      !val.defaultAddressUser ? (
                        <Button variant="outlined" color="success" sx={{marginTop: 2}}>
                          Jadikan Utama
                        </Button>
                      ) : ''
                    }
                    <Button variant="outlined" color="success" sx={{marginTop: 2}}>
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            )) : ''
          }
        </Box>
      </Box>
    )
  }

  handleChangeSearchAddress = (event) => {
    const {value} = event.target

    this.props.find({name: value})
  }

  renderTransaction = () => {
    const {data, offset, limit, search, startDate, endDate} = this.state.transaction
    const {transaction} = this.props

    const optionFilter = [
      {
        label: 'menunggu pembayaran',
        value: 'pending'
      },
      {
        label: 'menunggu konfirmasi',
        value: 'settlement'
      },
      {
        label: 'sedang proses',
        value: 'onSeller'
      },
      {
        label: 'sedang diantar',
        value: 'delivery'
      },
      {
        label: 'kadaluarsa',
        value: 'expired'
      },
      {
        label: 'ditolak',
        value: 'rejectedBySeller'
      },
      {
        label: 'diterima',
        value: 'success'
      },
    ]

    return (
      <Box
        sx={{
          paddingY: 2
        }}
      >
        <div className="flex flex-col space-y-4">
            <div className="flex space-x-2">
              <div className="flex-2/3">
                <TextField
                  fullWidth
                  size="small"
                  hiddenLabel
                  slotProps={{ input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined/>
                      </InputAdornment>
                    )
                  }}}
                  onChange={this.handleChangeSearchAddress}
                />
              </div>
              <div className="flex-1/3">
                <Dropdown
                  label={'Status'}
                  options={optionFilter}
                  size="small"
                  value={this.state.transaction.status}
                  onChange={this.handleChangeDropDown}
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1/2">
                  <InputDate
                    label="Tanggal Mulai"
                    size="small"
                    fullWidth
                    onChange={this.handleFilterStartDateTransaction}
                    value={startDate}
                  />
              </div>
              <div className="flex-1/2">
                  <InputDate
                    label="Tanggal Selesai"
                    size="small"
                    fullWidth
                    onChange={this.handleFilterEndDateTransaction}
                    value={endDate}
                  />
              </div>
            </div>
        </div>
        <Box
          sx={{
            minHeight: '30rem'
          }}
        >
          {
            transaction.isLoading ? (
              <CircularProgress sx={{marginY: 20}}/>
            ) : 
            data.map((val) => (
              <Paper
                key={val.id}
                sx={{
                  p: 2,
                  marginY: 2
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end'
                  }}
                >
                  <Stack
                    direction="row"
                    // divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}  
                  >
                    <Chip label={this.handleTitlePayment({method: val.transactionToPayment.payment_method, type: val.transactionToPayment.subtype})}/>
                    <Chip label={dayjs(val.createdAt).format('dddd, DD-MM-YYYY')}/>
                    <Chip {...this.handleAttributeChipStatus(val.transactionToPayment.status)}/>
                  </Stack>
                </Box>
                <Divider sx={{marginY: 2}}/>
                {
                  val.transactionToTrolley.map((trolley, index) => (
                    <>
                      <Grid container direction={'row'} spacing={2} sx={{marginY: 2}}>
                        <Grid size={3}>
                          <img
                            width={160}
                            height={160}
                            alt={trolley.trolleyToProduct.name}
                            src={Cld.image(trolley.trolleyToProduct.productToImage[0] ? trolley.trolleyToProduct.productToImage[0].public_id : 'product-not-found').resize(thumbnail().width(160).height(160)).toURL()}
                          />
                        </Grid>
                        <Grid size={6} textAlign={'left'}>
                          <Typography variant="h6">{trolley.trolleyToProduct.name}</Typography>
                          <Typography variant="body1">x{trolley.items}</Typography>
                        </Grid>
                        <Grid size={3} textAlign={'right'}>
                          <Typography variant="h6" fontWeight={500}>
                            {
                              new Intl.NumberFormat('id-ID', {
                                  style: "currency",
                                  currency: "IDR"
                              }).format(trolley.trolleyToProduct.price + trolley.trolleyToProduct.productToProductVariant.reduce((total, currVal) => total + currVal.price, 0))
                            }
                          </Typography>
                        </Grid>
                      </Grid>
                      {
                        (val.transactionToTrolley.length - 1) !== index ? (
                          <Divider/>
                        ) : ''
                      }
                    </>
                  ))
                }
                <Divider sx={{marginBottom: 2}}/>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end'
                  }}
                >
                  <Typography variant="body1" sx={{marginRight: 2}}>Total Harga:</Typography>
                  <Typography variant="h6">
                  {
                    new Intl.NumberFormat('id-ID', {
                        style: "currency",
                        currency: "IDR"
                    }).format(val.total_price)
                  }
                  </Typography>
                </Box>
                <Stack
                  direction={'row'}
                  spacing={2}
                  justifySelf={'end'}
                  marginTop={2}
                >
                  {
                    val.transactionToPayment.status == 'success' ? (
                      <>
                        <Button variant="outlined">Ulas</Button>
                        <Button variant="contained">Beli Lagi</Button>
                      </>
                    ) : val.transactionToPayment.status == 'expired' || val.transactionToPayment.status == 'rejectedBySeller' ? (
                      <>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outlined"
                          onClick={() => this.props.router.push({
                            pathname: `/t`,
                            query: {
                              id: val.id
                            }
                          })
                          }
                        >
                          Pembayaran
                        </Button>
                      </>
                    )
                  }
                </Stack>
              </Paper>
            ))
          }
        </Box>
      </Box>
    )
  }

  handleAttributeChipStatus = (status) => {
    return {
        label: status === 'pending' ? 'menunggu pembayaran' : status === 'settlement' ? 'menunggu konfirmasi' : status === 'onSeller' ? 'sedang proses' : status === 'delivery' ? 'sedang diantar' : status === 'expired' ? 'kadaluarsa' : status === 'rejectedBySeller' ? 'ditolak' : status === 'success' ? 'diterima' : 'menunggu',
        color: status === 'pending' ? 'secondary' : status === 'settlement' ? 'warning' : status === 'onSeller' ? 'primary' : status === 'delivery' ? 'info' : status === 'expired' ? 'error' : status === 'rejectedBySeller' ? 'error' : status === 'success' ? 'success' : 'default',
    }
  }

  handleTitlePayment = (val) => {
    const {method, type} = val
        
    if (method === 'qris') {
        return 'QR code by Qris'
    } else if (method === 'bank_transfer') {
        if (type === 'permata') {
            return 'Permata Virtual Account'
        } else if (type === 'bni') {
            return 'BNI Virtual Account'
        } else if (type === 'bri') {
            return 'BRI Virtual Account'
        } else if (type === 'cimb') {
            return 'CIMB Virtual Account'
        } else if (type === 'bca') {
          return 'BCA Virtual Account'
        }
    } else if (method === 'echannel') {
        return 'Mandiri Bill Payment'
    } else if (method === 'cstore') {
        if (type === 'alfamart') {
            return 'Alfamart'
        } else if (type === 'indomaret') {
            return 'Indomaret'
        }
    }
  }

  handleChangeValueTab = (event, newValue) => {
    const {transaction} = this.state

    if (newValue === 'transaction') {
      this.props.getAllTransaction({limit: transaction.limit, offset: transaction.offset, status: transaction.status})
    }

    this.setState({
      renderTabs: newValue
    })
  }

  handleChangeDropDown = (event) => {
    const {transaction} = this.state

    this.setState({
      transaction: {
        ...this.state.transaction,
        status: event.target.value
      }
    })

    this.props.getAllTransaction({limit: transaction.limit, offset: transaction.offset, status: event.target.value})
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({
      image: file
    })

    const reader = new FileReader();
    reader.onloadend = () => this.setState({previewImage: reader.result});
    reader.readAsDataURL(file);
  }

  handleFilterStartDateTransaction = (value) => {
    this.setState((prevState) => ({
      transaction: {
        ...prevState.transaction,
        startDate: value
      }
    }))
  }

  handleFilterEndDateTransaction = (value) => {
    this.setState((prevState) => ({
      transaction: {
        ...prevState.transaction,
        endDate: value
      }
    }))
  }

  renderModalEditorAvatar = () => {
    const {modalEditorAvatar, previewImage} = this.state

    return (
      <Modal
        open={modalEditorAvatar}
        onClose={this.handleTriggerModalEditorAvatar}
        sx={{display: 'flex', justifyContent: 'center', marginTop: '10rem'}}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              p: 2
            }}
          >
            <Typography variant="h5" fontWeight={600} textTransform={'capitalize'}>edit foto profile</Typography>
            <Divider sx={{marginY: 2}} />
            <Box
              sx={{
                height: '20rem',
                overflowY: 'scroll'
              }}
            >
              <CropImage imageSrc={previewImage} ref={this.cropperRef}/>
            </Box>
            <Button variant="contained" fullWidth sx={{marginY: 2}} onClick={this.handleCrop}>Atur Menjadi Foto Profile</Button>
          </Card>
        </Container>
      </Modal>
    )
  }

  handleTriggerModalEditorAvatar = () => {    
    if (!this.state.previewImage) {
      this.handleInputImageReff()
    } 

    this.setState((prevState) => ({
      modalEditorAvatar: !prevState.modalEditorAvatar,
      previewImage: null
    }))
  }

  handleInputImageReff = () => {
    this.inputImageReff.current.click()
  }

  handleCrop = () => {
    if (this.cropperRef.current) {
      const croppedCanvas = this.cropperRef.current.getCroppedImage();

      console.log(croppedCanvas)

      this.props.updateAvatarUser({
        image: croppedCanvas
      })
    }
  }

  handleRemoveAvatar = () => {
    this.props.deleteAvatarUser()
  }

  handleEditDateBirth = (value) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        birthDay: value
      }
    }))
  }

  renderSettings = () => {
    const {user} = this.state

    const options = [
      {
        label: 'Email',
        link: '/profile/email',
        value: user.email,
        icon: <Email />
      },
      {
        label: 'Telepon',
        link: '/profile/telephone',
        value: user.telephone,
        icon: <Phone />
      }
    ]

    return (
      <div className="p-4">
        <List>
          {options.map((option, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label={option.label} onClick={() => this.props.router.push(option.link)}>
                  <ChevronRight />
                </IconButton>
              }
            >
              <ListItemAvatar>
                {option.icon}
              </ListItemAvatar>
              <ListItemText
                primary={option.value}
              />
            </ListItem>
          ))}
        </List>
        <div className="text-start">
          <h5 className="font-medium text-xl">Terhubung</h5>
        </div>
        <div>
          <Button variant="text" href="/auth/reset-password">Ganti Password</Button>
        </div>
      </div>
    )
  }

  render() {
    const { user, renderTabs } = this.state;
    const {address} = this.props
    const {birthDay} = user
    return (
      <ThemeProvider theme={this.theme}>
        <Container maxWidth="lg">
          <div className="flex justify-start items-start gap-8">
            <div className="flex flex-col items-center w-fit">
              <Avatar
                className="!w-64 !h-64 !aspect-square !object-center !object-cover !mb-4"
                src={Cld.image(user.avatar).toURL()}
              />
              <Stack
                direction={'row'}
                spacing={2}
              >
                <Button variant="contained" onClick={this.handleTriggerModalEditorAvatar} size="small">Upload</Button>
                <input
                  ref={this.inputImageReff}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={this.handleFileChange}
                />
                <Button variant="outlined" size="small" onClick={this.handleRemoveAvatar}>Hapus</Button>
              </Stack>
            </div>
            <div className="w-full">
              <Typography variant="h3" className="!font-semibold">{user.username || "Azrii-27"}</Typography>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                justifyContent={"space-evenly"}
                width={"100%"}
              >
                <Box className="flex-1/2">
                  <div>
                    <p className="font-light">Nama Lengkap</p>
                    <InputText size="small" fullWidth/>
                  </div>
                  <div>
                    <p className="font-light">Tanggal Lahir</p>
                    <InputDate size="small" onChange={this.handleEditDateBirth} value={birthDay} fullWidth/>
                  </div>
                  <div>
                    <p className="font-light">Jenis Kelamin</p>
                    <InputGender showLabel={false}/>
                  </div>
                </Box>
                <Box className="flex-1/2">
                  <p className="">Badge</p>
                </Box>
              </Stack>
            </div>
          </div>
          <Card sx={{ p: 3, textAlign: "center", marginTop: 4}}>
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  onChange={this.handleChangeValueTab}
                  value={renderTabs}
                >
                  <Tab value="address" label="Detail Alamat"/>
                  <Tab value="transaction" label="Riwayat Transaksi"/>
                  <Tab value="setting" label="Pengaturan"/>
                </Tabs>
              </Box>
              {
                renderTabs === 'address' ? this.renderMoreAddress() :
                renderTabs === 'transaction' ? this.renderTransaction() :
                renderTabs === 'setting' ? this.renderSettings() :
                ''
              }
            </Box>
          </Card>
          {this.renderModalEditorAvatar()}
        </Container>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  user: {
    isLoading: state.user.isLoading,
    isSuccess: state.user.isSuccess,
    username: state.user.user.username,
    firstname: state.user.user.firstname,
    lastname: state.user.user.lastname,
    avatar: state.user.user.avatar,
    email: state.user.user.email,
    telephone: state.user.user.telephone,
    message: state.user.message,
  },
  address: {
    isLoading: state.address.isLoading,
    isSuccess: state.address.isSuccess,
    list: state.address.list,
    address: state.address.address,
    error: state.address.list,
  },
  transaction: {
    isLoading: state.transaction.isLoading,
    isSuccess: state.transaction.isSuccess,
    list: state.transaction.list
  }
})

const mapDispatchToProps = {
  getAllAddress,
  find,
  getAllTransaction,
  findTransaction,
  updateAvatarUser,
  deleteAvatarUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));

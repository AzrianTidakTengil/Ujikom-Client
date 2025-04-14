import React, { Component, createRef } from "react";
import { Container, Card, CardContent, Typography, Avatar, AppBar, Toolbar, Button, Box, Stack, Grid2 as Grid, Divider, Tab, Tabs, InputAdornment, TextField, Paper, Chip, CircularProgress, Modal, createTheme, ThemeProvider } from "@mui/material";
import { connect } from "react-redux";
import { SearchOutlined, Update } from "@mui/icons-material";
import { getAll as getAllAddress, find } from "@/store/address";
import { getAllTransaction, findTransaction } from "@/store/transaction";
import { CropImage, DateRangePicker, Dropdown } from "@/components";
import dayjs from "dayjs";
import { palleteV1 } from '@/assets/css/template'
import { deleteAvatarUser, updateAvatarUser } from "@/store/user";
import { Cld } from "@/config";
import UserMessage from '@/store/user/message'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        fullname: "",
        birthDay: "",
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
        data: []
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
        }
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
        <Grid container spacing={2}>
          <Grid size={10}>
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
          </Grid>
          <Grid 
            size={2}
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Button variant="contained" fullWidth>
              Tambah Alamat
            </Button>
          </Grid>
        </Grid>
        <Box sx={{
          minHeight: '30rem'
        }}>
          {
            address.isLoading ? (
              <CircularProgress sx={{marginTop: 2}}/>
            ) : addresses.map((val) => (
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
                      <Typography variant="body1" fontWeight={600}>{val.receiver}</Typography>
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
            ))
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
    const {data, offset, limit} = this.state.transaction
    const {transaction} = this.props

    const optionFilter = [
      {
        label: 'Berhasil',
        value: 'berhasil'
      },
      {
        label: 'Diantar',
        value: 'diantar'
      },
      {
        label: 'Menunggu',
        value: 'menunggu'
      },
      {
        label: 'Dibatalkan',
        value: 'dibatalkan'
      },
    ]

    return (
      <Box
        sx={{
          paddingY: 2
        }}
      >
        <Grid container spacing={2}>
          <Grid size={4.5}>
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
          </Grid>
          <Grid size={4.5}>
              <DateRangePicker/>
          </Grid>
          <Grid size={3}>
              <Dropdown
                label={'Status'}
                options={optionFilter}
                size="small"
              />
          </Grid>
        </Grid>
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
                    <Chip label={this.handleTitlePayment({method: val.payment_type, type: val.subtype})}/>
                    <Chip label={dayjs(val.createdAt).format('dddd, DD-MM-YYYY')}/>
                    <Chip label="pending" color="primary"/>
                  </Stack>
                </Box>
                <Divider sx={{marginY: 2}}/>
                {
                  val.transactionToTrolley.map((trolley, index) => (
                    <>
                      <Grid container direction={'row'} spacing={2} sx={{marginY: 2}}>
                        <Grid size={3}>
                          <Paper sx={{p:2}}>
                            Image
                          </Paper>
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
                              }).format(trolley.trolleyToProduct.price)
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
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                    marginTop: 2
                  }}
                >
                  <Button variant="outlined" sx={{marginRight: 2}}>Ulas</Button>
                  <Button variant="contained">Beli Lagi</Button>
                </Box>
              </Paper>
            ))
          }
        </Box>
      </Box>
    )
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
      this.props.getAllTransaction({limit: transaction.limit, offset: transaction.offset})
    }

    this.setState({
      renderTabs: newValue
    })
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

  render() {
    const { user, renderTabs } = this.state;
    const {address} = this.props
    return (
      <ThemeProvider theme={this.theme}>
        <Container>
          <Card sx={{ p: 3, textAlign: "center"}}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Avatar sx={{ width: 124, height: 124, marginBottom: 2}} src={Cld.image(user.avatar).toURL()}/>
                <Stack
                  direction={'row'}
                  spacing={2}
                >
                  <Button variant="contained" onClick={this.handleTriggerModalEditorAvatar} size="small">Upload Foto Baru</Button>
                  <input
                    ref={this.inputImageReff}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={this.handleFileChange}
                  />
                  <Button variant="outlined" size="small" onClick={this.handleRemoveAvatar}>Hapus Foto</Button>
                </Stack>
              </Box>
              <Typography variant="h5" sx={{ marginY: 2 }} fontWeight={600}>{user.username}</Typography>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}       
              >
                <Box
                  width={'50%'}
                >
                  <Grid container sx={{marginY: 2}}>
                    <Grid size={4}>
                      <Typography variant="body1" textAlign={'left'}>Nama</Typography>
                    </Grid>
                    <Grid size={8}>
                      <Typography variant="body1" textAlign={'left'}>{user.fullname}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{marginY: 2}}>
                    <Grid size={4}>
                      <Typography variant="body1" textAlign={'left'}>Tanggal Lahir</Typography>
                    </Grid>
                    <Grid size={8}>
                      <Typography variant="body1" textAlign={'left'}>{user.birthDay}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{marginY: 2}}>
                    <Grid size={4}>
                      <Typography variant="body1" textAlign={'left'}>Jenis Kelamin</Typography>
                    </Grid>
                    <Grid size={8}>
                      <Typography variant="body1" textAlign={'left'}>{user.gender}</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  width={'50%'}
                >
                  <Grid container sx={{marginY: 2}}>
                    <Grid size={4}>
                      <Typography variant="body1" textAlign={'left'}>Email</Typography>
                    </Grid>
                    <Grid size={8}>
                      <Typography variant="body1" textAlign={'left'}>{user.email}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{marginY: 2}}>
                    <Grid size={4}>
                      <Typography variant="body1" textAlign={'left'}>Nomor HP</Typography>
                    </Grid>
                    <Grid size={8}>
                      <Typography variant="body1" textAlign={'left'}>{user.telephone}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ p: 3, textAlign: "center", marginTop: 4}}>
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  onChange={this.handleChangeValueTab}
                  value={renderTabs}
                >
                  <Tab value="address" label="Detail Alamat"/>
                  <Tab value="transaction" label="Riwayat Transaksi"/>
                </Tabs>
              </Box>
              {
                renderTabs === 'address' ? this.renderMoreAddress() :
                renderTabs === 'transaction' ? this.renderTransaction() :
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

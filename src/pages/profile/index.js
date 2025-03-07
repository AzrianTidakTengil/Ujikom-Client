import React, { Component } from "react";
import { Container, Card, CardContent, Typography, Avatar, AppBar, Toolbar, Button, Box, Stack, Grid2 as Grid, Divider, Tab, Tabs, InputAdornment, TextField, Paper, Chip, CircularProgress } from "@mui/material";
import { connect } from "react-redux";
import { SearchOutlined } from "@mui/icons-material";
import { getAll as getAllAddress, find } from "@/store/address";
import { getAllTransaction, findTransaction } from "@/store/transaction";
import { DateRangePicker, Dropdown } from "@/components";
import dayjs from "dayjs";

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
      },
      renderTabs: 'address',
      addresses: [],
      transaction: {
        limit: 10,
        offset: 0,
        data: []
      }
    };
  }

  UNSAFE_componentWillMount() {
    this.props.getAllAddress()
  }

  UNSAFE_componentWillReceiveProps() {
    const {user, address, transaction} = this.props

    if (user.isSuccess) {
      this.setState({
        user: {
          ...this.state.user,
          username: user.username,
          fullname: `${user.firstname} ${user.lastname}`,
          email: user.email,
          telephone: user.telephone
        }
      })
    }

    if (address.isSuccess) {
      this.setState({
        addresses: address.list.data
      })
    }

    if (transaction.isSuccess) {
      this.setState({
        transaction: {
          ...this.state.transaction,
          data: transaction.list.data
        }
      })
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

  render() {
    const { user, renderTabs } = this.state;
    const {address} = this.props
    return (
      <Container>
        <Card sx={{ p: 3, textAlign: "center"}}>
          <CardContent>
            <Avatar sx={{ width: 100, height: 100, margin: "auto", mt: 2 }} />
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
      </Container>
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
    email: state.user.user.email,
    telephone: state.user.user.telephone
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
  findTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React, { Component } from "react";
import { Container, Card, CardContent, Typography, Avatar, AppBar, Toolbar, Button, Box, Stack, Grid2 as Grid, Divider, Tab, Tabs, InputAdornment, TextField } from "@mui/material";
import { connect } from "react-redux";
import { SearchOutlined } from "@mui/icons-material";

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
      renderTabs: 'address'
    };
  }

  UNSAFE_componentWillReceiveProps() {
    const {user} = this.props

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
  }

  renderMoreAddress = () => {
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
            />
          </Grid>
          <Grid size={2}>
            <Button variant="contained" fullWidth>
              Cari
            </Button>
          </Grid>
        </Grid>
        <Box sx={{
          minHeight: '30rem'
        }}>

        </Box>
      </Box>
    )
  }

  renderTransaction = () => {
    return (
      <Box>

      </Box>
    )
  }

  handleChangeValueTab = (event, newValue) => {
    this.setState({
      renderTabs: newValue
    })
  }

  render() {
    const { user, renderTabs } = this.state;
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
              renderTabs === 'transaction' ? this.renderTransaction :
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
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

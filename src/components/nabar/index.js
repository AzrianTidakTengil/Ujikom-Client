import {
  AppBar,
  Box,
  createTheme,
  Divider,
  InputAdornment,
  Modal,
  TextField,
  ThemeProvider,
  Toolbar,
  Button,
  Backdrop,
  CircularProgress,
  Avatar,
  IconButton,
  Grid2 as Grid,
  Badge,
  Popover,
  Stack,
  Typography
} from "@mui/material";
import styles from "./style.module.css";
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { AccountCircle, LocalGroceryStoreOutlined, Logout, MailLockOutlined, MailOutlineOutlined, SearchOutlined } from "@mui/icons-material";
import Auth from "../form/form";
import { palleteV1 } from "@/assets/css/template";
import React, { useState } from "react";
import { containerModal, mainItem } from "./theme";
import Link from "next/link";
import { connect } from "react-redux";
import { login, logout} from "@/store/auth";
import { getUser } from "@/store/user";
import { getAllItemTrolley } from "@/store/trolley";
import { withRouter } from "next/router";

class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      disableInput: false,
      user: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        telephone: ''
      },
      badgeTrolley: 0,
      popover: {
        id: null,
        anchorEL: null
      }
    }
  }
  
  theme = (outerTheme) => createTheme({
    palette: {
      ...palleteV1.palette,
    },
    components: {
      MuiTextField: {
          styleOverrides: {
              root: {
                  '--TextField-brandBorderColor': palleteV1.palette.white.main,
                  '--TextField-brandBorderHoverColor': palleteV1.palette.white.main,
                  '--TextField-brandBorderFocusedColor': palleteV1.palette.white.main,
                  '& label.Mui-focused': {
                      color: 'var(--TextField-brandBorderFocusedColor)',
                  },
              },
          },
      },
      MuiOutlinedInput: {
          styleOverrides: {
              notchedOutline: {
                  borderColor: 'var(--TextField-brandBorderColor)',
              },
              root: {
                  [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                      borderColor: 'var(--TextField-brandBorderHoverColor)',
                  },
                  [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                      borderColor: 'var(--TextField-brandBorderFocusedColor)',
                  },
              },
          }
      },
    }
  })

  componentDidMount() {
    const {showModal} = this.state
    if (showModal) {
      setTimeout(() => {
        this.setState({
          showModal: false
        }, 12000)
      })
    }
  }

  UNSAFE_componentWillMount() {
    this.props.getUser()
    this.props.getAllItemTrolley()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {auth, user, trolley} = nextProps
    if (user.isSuccess) {
      this.setState({
        user: {
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          telephone: user.telephone
        }
      })
    }
    if (trolley.isSuccess) {
      this.setState({
        badgeTrolley: trolley.data.length
      })
    }
  }

  handleFocus() {
    const {showModal} = this.state
    
    this.setState({
      showModal: true
    })
  }

  handleOutFocus() {
    const {showModal} = this.state
    
    this.setState({
      showModal: false
    })
  }

  handleChange(val) {
    console.log(val)
  }

  handleRandomColor = (string) => {
      let hash = 0;
      let i;

      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }

      let color = '#';

      for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */

      return color;
  }

  handleSplitCharacter = (value) => {
      return {
          sx: {
              bgcolor: this.handleRandomColor(value),
            },
          children: `${value.split(' ')[0][0]}${value.split(' ')[1][0]}`,
      }
  }

  handleOpenPopever = (event) => {
    this.setState({
      popover: {
        ...this.state.popover,
        anchorEL: event.currentTarget
      }
    })
  }

  handleClosePopever = () => {
    this.setState({
      popover: {
        ...this.state.popover,
        anchorEL: null
      }
    })
  }

  handlePush = (path) => {
    const {router} = this.props

    router.push({
      pathname: path
    })
  }

  handleLogOut = () => {
    this.props.logout()
  }

  render() {
    const {showModal, user, badgeTrolley, popover} = this.state
    const {auth} = this.props
    const dummy_search = [
      {
        id: 1,
        name: 'infinix'
      },{
        id: 2,
        name: 'infinix gt 20 pro'
      },{
        id: 3,
        name: 'handphone'
      },{
        id: 4,
        name: 'mainan'
      },
    ]


    return (
      <ThemeProvider theme={this.theme}>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Link href='/'><h1 className={styles.title}>Popping</h1></Link>
            <TextField
              sx={{ width: '40%' }}
              size="small"
              hiddenLabel
              slotProps={{ input: {
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchOutlined color="white"/>
                    </InputAdornment>
                )
              }}}
              onChange={(event) => this.handleChange(event.target.value)}
              onClick={() => this.handleFocus()}
            />
            <div>
              {user.username ? 
              <Grid container direction={'row'} spacing={2}>
                <Grid>
                  <Link href={'/trolley'}>
                    <IconButton>
                      <Badge badgeContent={badgeTrolley} color="secondary">
                        <LocalGroceryStoreOutlined/>
                      </Badge>
                    </IconButton>
                  </Link>
                </Grid>
                <Grid>
                <IconButton>
                    <MailOutlineOutlined />
                  </IconButton>
                </Grid>
                <Grid>
                  <div style={{cursor: 'pointer'}} onClick={this.handleOpenPopever}>
                    <Avatar {...this.handleSplitCharacter(`${user.firstname} ${user.lastname}`)}/>
                  </div>
                  <Popover
                    open={Boolean(popover.anchorEL)}
                    anchorEl={popover.anchorEL}
                    onClose={this.handleClosePopever}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <Box
                      sx={{
                        p: 2
                      }}
                    >
                      <Stack
                        divider={<Divider flexItem />}
                        spacing={2}
                      >
                        <Button onClick={() => this.handlePush('/profile')} startIcon={<AccountCircle/>}>
                          Profile
                        </Button>
                        <Button startIcon={<Logout/>} onClick={this.handleLogOut}>
                          Log out
                        </Button>
                      </Stack>
                    </Box>
                  </Popover>
                </Grid>
              </Grid> 
              : 
              <div>
                <Auth/>
                <Link href="/register"><Button variant="contained" color="white">Register</Button></Link>
              </div>}
            </div>
          </Toolbar>
        </AppBar>
          <Modal
              open={showModal}
              onClose={() => this.handleOutFocus()}
              sx={containerModal}
              disableAutoFocus
          >
              <Box
                sx={mainItem}
              >
                  <div className={styles.listItem}>
                    {dummy_search.map((val, index) => <Link 
                    href={{
                      pathname: '/search',
                      query: {keyword: val.name}
                    }}
                    key={index}
                    scroll={true}
                    prefetch={true}
                    onClick={() => this.handleOutFocus()}
                    >
                      <div key={val.id}>{val.name}</div>
                    </Link>)}
                  </div>
              </Box>
          </Modal>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    data: state.auth.data,
  },
  user: {
    isLoading: state.user.isLoading,
    isSuccess: state.user.isSuccess,
    username: state.user.user.username,
    firstname: state.user.user.firstname,
    lastname: state.user.user.lastname,
    email: state.user.user.email,
    telephone: state.user.user.telephone
  },
  trolley: {
    isSuccess: state.trolley.isSucces,
    data: state.trolley.data,
  }
})

const mapDispatchToProps = {
  getUser,
  getAllItemTrolley,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))
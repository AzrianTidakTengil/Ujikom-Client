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
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import styles from "./style.module.css";
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { AccountCircle, AddBusiness, HistoryOutlined, LocalGroceryStoreOutlined, Logout, MailLockOutlined, MailOutlineOutlined, SearchOutlined, StoreOutlined, TrendingUp } from "@mui/icons-material";
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
import { Cld } from "@/config";
import { KeywordCreate, KeywordDelete, KeywordFind } from "@/store/keyword";

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
        telephone: '',
        avatar: '',
      },
      badgeTrolley: 0,
      popover: {
        id: null,
        anchorEL: null
      },
      isSeller: false,
      inputSearch: {
        width: 0,
        left: 0,
      },
      valueSearch: '',
      keyword: {
        list: [],
        popular: [],
      },
    }
    this.theme = createTheme({
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
  }

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

  componentDidMount() {
    this.props.getUser();
    this.props.getAllItemTrolley();
  }
  
  componentDidUpdate(prevProps) {
    const { user, trolley, keyword } = this.props;
  
    if (user !== prevProps.user && user.isSuccess) {
      this.setState({
        user: {
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          telephone: user.telephone,
          avatar: user.avatar
        },
        isSeller: user.isSeller
      });
    }
  
    if (trolley !== prevProps.trolley && trolley.isSuccess) {
      this.setState({
        badgeTrolley: trolley.data.length
      });
    }
  
    if (keyword !== prevProps.keyword && keyword.isSuccess) {
      this.setState({
        keyword: {
          list: keyword.data.filter(d => d.status !== 'popular'),
          popular: keyword.data.filter(d => d.status === 'popular'),
        }
      });
    }
  }

  handleFocus = (event) => {
    const {showModal} = this.state
    const rect = event.currentTarget.getBoundingClientRect();

    this.props.KeywordFind({keyword: null})

    this.setState({
      showModal: true,
      inputSearch: {
        width: rect.width,
        left: rect.left
      }
    })
  }

  handleOutFocus = () => {
    const {showModal} = this.state
    
    this.setState({
      showModal: false
    })
  }

  handleChange = (val) => {
    
    this.props.KeywordFind({keyword: val})

    this.setState({
      valueSearch: val
    })
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

  handlePush = (val) => {
    const {router} = this.props

    router.push({
      pathname: '/search',
      query: {
        keyword: val
      }
    })

    this.props.KeywordCreate({keyword: val})

    this.setState({
      showModal: false,
    })
  }

  handleLogOut = () => {
    this.props.logout()
  }

  render() {
    const {showModal, user, badgeTrolley, popover, isSeller, inputSearch, valueSearch, keyword} = this.state
    const {auth} = this.props

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
              onClick={this.handleFocus}
              autoComplete="off"
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
                {
                  isSeller ? (
                    <IconButton href="/seller/">
                      <StoreOutlined />
                    </IconButton>
                  ) : (
                    <IconButton href="/register/openshop">
                      <AddBusiness />
                    </IconButton>
                  )
                }
                <Grid>
                  <div style={{cursor: 'pointer'}} onClick={this.handleOpenPopever}>
                    <Avatar src={Cld.image(user.avatar).toURL()}/>
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
                        <Button href="/profile" startIcon={<AccountCircle/>}>
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
              onClose={this.handleOutFocus}
              sx={containerModal}
              disableAutoFocus
          >
              <Box
                sx={{
                  ...mainItem,
                  width: inputSearch.width,
                  left: `${parseInt(inputSearch.left)}px`,
                  maxHeight: 500,
                  overflowY: 'scroll',
                }}
              >
                  {
                    this.props.keyword.isLoading ? (
                      <CircularProgress sx={{marginX: 'auto', marginY: 2}}/>
                    ) : (
                      <List>
                      {
                        valueSearch ? (
                          <ListItem
                          sx={{
                            paddingY: 0,
                          }}
                          >
                            <ListItemButton onClick={() => this.handlePush(valueSearch)}>
                              <ListItemIcon>
                                <SearchOutlined/>
                              </ListItemIcon>
                              <ListItemText primary={valueSearch}/>
                            </ListItemButton>
                          </ListItem>
                        ) : ''
                      }
                      {
                        keyword.list.map((val, index) => (
                          <ListItem
                            key={index}
                            sx={{
                              paddingY: 0,
                            }}
                          >
                            <ListItemButton onClick={() => this.handlePush(val.label)}>
                              <ListItemIcon>
                                {
                                  val.status == 'history' ? <HistoryOutlined/> : <SearchOutlined/>
                                }
                              </ListItemIcon>
                              <ListItemText primary={val.label}/>
                            </ListItemButton>
                          </ListItem>
                        ))
                      }
                      {
                        keyword.list.length != 0 ? <Divider/> : ''
                      }
                      {
                        keyword.popular.map((val, index) => (
                          <ListItem
                            key={index}
                            sx={{
                              paddingY: 0,
                            }}
                          >
                            <ListItemButton onClick={() => this.handlePush(val.label)}>
                              <ListItemIcon>
                                <TrendingUp/>
                              </ListItemIcon>
                              <ListItemText primary={val.label}/>
                            </ListItemButton>
                          </ListItem>
                        ))
                      }
                    </List>
                    )
                  }
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
    telephone: state.user.user.telephone,
    avatar: state.user.user.avatar,
    isSeller: state.user.isSeller,
  },
  trolley: {
    isSuccess: state.trolley.isSucces,
    data: state.trolley.data,
  },
  keyword: {
    isLoading: state.keyword.isLoading,
    error: state.keyword.error,
    message: state.keyword.message,
    isSuccess: state.keyword.isSuccess,
    data: state.keyword.data,
  },
})

const mapDispatchToProps = {
  getUser,
  getAllItemTrolley,
  logout,
  KeywordFind,
  KeywordCreate,
  KeywordDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))
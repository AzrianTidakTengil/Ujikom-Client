import React, { Component } from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, ThemeProvider, createTheme, ListItemButton, ListItemIcon, TextField, InputAdornment, outlinedInputClasses, Popover, Container, Backdrop, CircularProgress, Avatar, Stack, Divider, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout, AccountCircle } from "@mui/icons-material";
import MiniDrawer from "../minidrawer";
import { AccountBalance, AccountBalanceWallet, Assignment, Feedback, Home, House, Inventory, Settings, Wallet, SearchOutlined } from "@mui/icons-material";
import { withRouter } from "next/router";
import { palleteV1 } from "@/assets/css/template";
import { connect } from "react-redux";
import { logout } from "@/store/auth";
import { getUser } from "@/store/user";
import { getSeller } from "@/store/shop";
import { Cld } from "@/config";

const drawerWidth = 240;
const miniDrawerWidth = 60;

class SellerLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: true,
      drawerOpen: true,
      anchorEl: {
        search: null,
        user: null
      },
      search: [],
      user: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        telephone: '',
        avatar: '',
      },
      seller: {
        name: '',
        avatar: '',
      }
    };
    this.theme = createTheme({
      palette: {
        ...palleteV1.palette
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
        MuiAppBar: {
          styleOverrides: {
            root: {
              height: '4rem',
            }
          }
        }
      }
    })
  }

  UNSAFE_componentWillMount() {
    this.props.getUser()
    this.props.getSeller()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {seller, user} = nextProps
    if (user.isSuccess) {
      this.setState({
        user: {
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          telephone: user.telephone,
          avatar: user.avatar,
        }
      })
    }

    if (seller.isSuccess) {
      this.setState({
        seller: {
          name: seller.data.name
        }
      })
    }
  }

  renderListDrawer = () => {
    const {drawerOpen} = this.state
    const list = [
      {
        icon: <House/>,
        router: '/seller',
        label: 'Home'
      },
      {
        icon: <Inventory/>,
        router: '/seller/product',
        label: 'Produk'
      },
      {
        icon: <Assignment/>,
        router: '/seller/order',
        label: 'Pesanan'
      },
      {
        icon: <Feedback/>,
        router: '/seller/feedback',
        label: 'Feedback'
      },
      {
        icon: <AccountBalanceWallet/>,
        router: '/seller/balance',
        label: 'Tarik saldo'
      },
      {
        icon: <Settings/>,
        router: '/seller/setting',
        label: 'Pengaturan'
      },
    ]

    return (
      <List>
        {
          list.map((val) => (
            <ListItem
              key={val.label}
              disablePadding
              sx={{
                display: 'block'
              }}
            >
              <ListItemButton
                selected={val.router === this.props.router.route ? true : false}
                onClick={() => {
                  this.props.router.push({
                    pathname: val.router
                  })
                }}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: drawerOpen ? 'initial' : 'center'
                }}
              >
                <ListItemIcon
                  sx={{
                    justifyContent: 'center'
                  }}
                >
                  {val.icon}
                </ListItemIcon>
                <ListItemText
                  primary={val.label}
                  sx={{
                    opacity: drawerOpen ? 1 : 0
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    )
  }

  handleDrawerToggle = () => {
    this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen }));
  };

  handleDrawerOpen = () => {
    const {drawerOpen} = this.state
    this.setState({ drawerOpen: !drawerOpen });
  };

  handleAnchorSearch = (event) => {
    this.setState({
      anchorEl: {
        ...this.state.anchorEl,
        search: event.currentTarget
      }
    })
  }

  handleClearAchorSearch = () => {
    this.setState({
      anchorEl: {
        ...this.state.anchorEl,
        search: null
      }
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

  handlePush = (path) => {
    const {router} = this.props

    router.push({
      pathname: path
    })
  }

  handleLogOut = () => {
    this.props.logout()
  }

  handleAnchorAvatar = (event) => {
    this.setState({
      anchorEl: {
        ...this.state.anchorEl,
        user: event.currentTarget
      }
    })
  }

  handleClearAnchorAvatar = () => {
    this.setState({
      anchorEl: {
        ...this.state.anchorEl,
        user: null
      }
    })
  }

  render() {
    const { children } = this.props;
    const { mobileOpen, drawerOpen, anchorEl, search, user, seller } = this.state;

    return (
      <ThemeProvider theme={this.theme}>
        <Box sx={{ display: "flex" }}>
          <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` }, ml: { sm: `${drawerOpen ? drawerWidth : 0}px` }, zIndex: this.theme.zIndex.drawer + 1}}>
            <Toolbar sx={{justifyContent: drawerOpen ? 'end' : 'space-between'}}>
              {
                drawerOpen ? '' :
                (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.handleDrawerOpen}
                    sx={{ mr: 2 }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                      Popping Seller
                    </Typography>
                  </Box>
                )
              }
              <Stack
                direction="row"
                divider={<Divider flexItem orientation="vertical"/>}
                spacing={2}
              >
                <Button sx={{display: 'flex', alignItems: 'center'}} variant="text" color="white">
                  <Avatar src={Cld.image(seller.avatar ?? 'component-avatar-seller').toURL()} sizes="small"></Avatar>
                  <Typography variant="subtitle2" color="black" sx={{marginLeft: 2}}>{seller.name}</Typography>
                </Button>
                <Button onClick={this.handleAnchorAvatar}>
                  <Avatar src={Cld.image(user.avatar).toURL()}/>
                </Button>
              </Stack>
            </Toolbar>
            <Popover
              open={Boolean(anchorEl.user)}
              anchorEl={anchorEl.user}
              onClose={this.handleClearAnchorAvatar}
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
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerOpen ? drawerWidth : miniDrawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="seller menu"
          >
            <MiniDrawer
              open={drawerOpen}
              onClose={this.handleDrawerOpen}
              header={
                <Typography variant="h6" noWrap>
                  Popping Seller
                </Typography>
              }
            >
              {this.renderListDrawer()}
            </MiniDrawer>
          </Box>
          <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : miniDrawerWidth}px)` } }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
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
    email: state.user.user.email,
    telephone: state.user.user.telephone,
    avatar: state.user.user.avatar,
  },
  seller: {
    isLoading: state.shop.isLoading,
    isSuccess: state.shop.isSuccess,
    data: state.shop.seller,
    error: state.shop.error
  }
})

const mapDispatchToProps = {
  logout,
  getUser,
  getSeller
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SellerLayout));

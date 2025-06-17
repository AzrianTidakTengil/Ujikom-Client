import React, { useState } from "react";
import { connect } from "react-redux";
import { login, logout } from "@/store/auth";
import { getUser } from "@/store/user";
import { getAllItemTrolley } from "@/store/trolley";
import { withRouter } from "next/router";
import { Cld } from "@/config";
import { KeywordCreate, KeywordDelete, KeywordFind } from "@/store/keyword";
import {
  AppBar,
  Avatar,
  Badge,
  createTheme,
  IconButton,
  ThemeProvider,
  Toolbar,
  Button,
  TextField,
  InputAdornment,
  Modal,
  Paper,
} from "@mui/material";
import { palleteV1 } from "@/assets/css/template";
import Link from "next/link";
import { LocalGroceryStore, Mail, Search } from "@mui/icons-material";
import { Auth } from "..";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const theme = createTheme({
  palette: {
    ...palleteV1.palette,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": palleteV1.palette.plain.main,
          "--TextField-brandBorderHoverColor": palleteV1.palette.plain.main,
          "--TextField-brandBorderFocusedColor": palleteV1.palette.plain.main,
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--TextField-brandBorderColor)",
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
          },
          color: palleteV1.palette.plain.main,
        },
      },
    },
  },
});

class NavbarMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        telephone: "",
        avatar: "",
      },
      badgeTrolley: 0,
      valueSearch: "",
      keyword: {
        list: [],
        popular: [],
      },
      showModal: false,
      inputSearch: {
        width: 0,
        bottom: 0,
      },
    };
  }

  componentDidMount() {
    const { showModal } = this.state;
    if (showModal) {
      setTimeout(() => {
        this.setState(
          {
            showModal: false,
          },
          12000
        );
      });
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
          avatar: user.avatar,
        },
        isSeller: user.isSeller,
      });
    }

    if (trolley !== prevProps.trolley && trolley.isSuccess) {
      this.setState({
        badgeTrolley: trolley.data.length,
      });
    }

    if (keyword !== prevProps.keyword && keyword.isSuccess) {
      this.setState({
        keyword: {
          list: keyword.data.filter((d) => d.status !== "popular"),
          popular: keyword.data.filter((d) => d.status === "popular"),
        },
      });
    }
  }

  handleFocus = (event) => {
    const { showModal } = this.state;
    const rect = event.currentTarget.getBoundingClientRect();

    this.props.KeywordFind({ keyword: null });

    this.setState({
      showModal: true,
      inputSearch: {
        width: rect.width,
        bottom: rect.bottom,
      },
    });
  };

  handleOutFocus = () => {
    const { showModal } = this.state;

    this.setState({
      showModal: false,
    });
  };

  handlePush = (val) => {
    const { router } = this.props;

    router.push({
      pathname: "/search",
      query: {
        keyword: val,
      },
    });

    this.props.KeywordCreate({ keyword: val });

    this.setState({
      showModal: false,
    });
  };

  render() {
    const { user, badgeTrolley, showModal, inputSearch } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Link href="/" className="">
              <h1 className={`font-bold text-xl`}>Popping</h1>
            </Link>
            {false ? (
              <div className="flex !space-x-1.5">
                <IconButton href="/trolley">
                  <Badge badgeContent={badgeTrolley} color="secondary">
                    <LocalGroceryStore color="plain" />
                  </Badge>
                </IconButton>
                <IconButton href="/trolley">
                  <Badge badgeContent={1} color="secondary">
                    <Mail color="plain" />
                  </Badge>
                </IconButton>
                <IconButton>
                  <Avatar sx={{ width: 40, height: 40 }} />
                </IconButton>
              </div>
            ) : (
              <div className="flex !space-x-1.5">
                <Auth />
                <Link href="/register">
                  <Button variant="contained" color="plain">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </Toolbar>
          <div className="px-2 py-1">
            <TextField
              fullWidth
              size="small"
              hiddenLabel
              autoComplete="off"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="plain" />
                    </InputAdornment>
                  ),
                },
              }}
              onClick={this.handleFocus}
            />
          </div>
        </AppBar>
        <Modal
          open={showModal}
          onClose={this.handleOutFocus}
          disableAutoFocus
          sx={{
            zIndex: theme.zIndex.appBar - 1
          }}
          className="w-full h-screen px-2"
        >
          <Paper
            sx={{
              width: inputSearch.width,
              top: `calc(${parseInt(inputSearch.bottom) + 15}px)`,
            }}
            className="p-2 overflow-y-auto max-h-1/2 absolute"
          ></Paper>
        </Modal>
      </ThemeProvider>
    );
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
});

const mapDispatchToProps = {
  getUser,
  getAllItemTrolley,
  logout,
  KeywordFind,
  KeywordCreate,
  KeywordDelete,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavbarMobile));

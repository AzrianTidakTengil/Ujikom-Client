"use client";

import {
  Box,
  Button,
  createTheme,
  Divider,
  IconButton,
  Modal,
  ThemeProvider,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { buttonPrimary, container, input, mainItem } from "./theme";
import { useState, Component } from "react";
import styles from "./style.module.css";
import { Close, Google } from "@mui/icons-material";
import { Input, InputEmail, InputPassword } from "../input";
import { Poppins } from "next/font/google";
import { palleteV1 } from "@/assets/css/template";
import Link from "next/link";
import { connect } from "react-redux";
import { login } from "@/store/auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500"],
  style: ["normal"],
});

const theme = createTheme({
  ...palleteV1,
});

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: "",
      password: "",
      errorMessage: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, errorMessage } = this.state;
    if (!errorMessage) {
      this.props.login({ user: email, password });
    } else {
      console.log("cannot");
    }
  };

  handleModal = () => {
    const { open } = this.state;

    this.setState({
      open: !open,
    });
  };

  handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      this.setState({
        [name]: value,
      });
    } else if (name === "password") {
      this.setState({
        [name]: value,
      });
    }
  };

  renderCustomBackDrop = (props) => {
    return (
      <Backdrop
        {...props}
        sx={(theme) => ({
          color: "#fff",
          zIndex: this.props.isLoading
            ? theme.zIndex.appBar + 1000 + theme.zIndex.modal
            : -1,
        })}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };

  render() {
    const { open } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Button
          variant="outlined"
          onClick={this.handleModal}
          color="white"
          sx={{ marginRight: 1 }}
        >
          Login
        </Button>
        <Modal
          open={open}
          sx={container}
          onClose={this.handleModal}
          keepMounted
          BackdropComponent={this.renderCustomBackDrop}
        >
          <Box
            sx={{
              ...mainItem,
              zIndex: theme.zIndex.modal,
            }}
          >
            <div className={styles.head}>
              <h2>Login</h2>
              <IconButton onClick={this.handleModal}>
                <Close />
              </IconButton>
            </div>
            <Box
              sx={{
                paddingX: 2,
              }}
            >
              <form className={styles.body} onSubmit={this.handleSubmit}>
                <InputEmail
                  name="email"
                  type="text"
                  label="Email"
                  fullWidth={true}
                  onBlur={(event) => this.handleInput(event)}
                />
                <InputPassword
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth
                  onBlur={(event) => this.handleInput(event)}
                />
                <p>Forgot Password</p>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ marginY: 4 }}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
              <Divider />
              <Button
                startIcon={<Google />}
                variant="contained"
                fullWidth
                sx={{
                  textTransform: "capitalize",
                  marginY: 4,
                }}
                href="http://localhost:3001/api/auth/google"
              >
                Google
              </Button>
            </Box>
            <div className={styles.footer}>
              <p>
                Tidak memiliki Akun?{" "}
                <Link href="/register">Daftar sekarang</Link>
              </p>
            </div>
          </Box>
        </Modal>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
  data: state.auth.data,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

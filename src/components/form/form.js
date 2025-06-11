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
  Paper,
} from "@mui/material";
import { buttonPrimary, container, input, mainItem } from "./theme";
import { useState, Component } from "react";
import styles from "./style.module.css";
import { Close, Google } from "@mui/icons-material";
import { Input, InputEmail, InputPassword, InputText } from "../input";
import { Poppins } from "next/font/google";
import { palleteV1 } from "@/assets/css/template";
import Link from "next/link";
import { connect } from "react-redux";
import { login } from "@/store/auth";
import { withRouter } from "next/router";

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

  componentDidMount() {
    const { router } = this.props;

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    const queryLogin = router.query.login ?? urlParams.get('login')

    if (queryLogin && queryLogin === "true") {
      this.setState({
        open: true,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, errorMessage } = this.state;

    const hasNoErrors = Object.values(errorMessage).every((v) => v === null);

    if (hasNoErrors) {
      this.props.login({ user: email, password });
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
      this.handleDetectorError({
        value,
        type: "email",
        required: true,
        minLength: 3,
        maxLength: 255,
        name,
      });
      this.setState({
        [name]: value,
      });
    } else if (name === "password") {
      this.handleDetectorError({
        value,
        type: "password",
        required: true,
        minLength: 8,
        maxLength: 8,
        name,
      });
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

  handleDetectorError = ({
    type,
    value,
    required = true,
    minLength = 1,
    maxLength = 255,
    name,
  }) => {
    const trimmedValue = value?.toString().trim() || "";
    let error = null;

    // Required check
    if (required && trimmedValue.length === 0) {
      error = `${name} is required`;
    }
    // Whitespace-only check
    else if (/^\s+$/.test(value)) {
      error = `${name} cannot be only whitespace`;
    }
    // Length check
    else if (trimmedValue.length < minLength) {
      error = `Minimum length is ${minLength} characters`;
    } else if (trimmedValue.length > maxLength) {
      error = `Maximum length is ${maxLength} characters`;
    }
    // Dangerous content check
    else {
      const dangerousPatterns = [
        /</g,
        />/g,
        /<script.*?>.*?<\/script>/gi,
        /--/,
        /;/g,
        /\b(DROP|SELECT|INSERT|DELETE)\b/gi,
      ];
      if (dangerousPatterns.some((pattern) => pattern.test(trimmedValue))) {
        error = `Input contains potentially dangerous characters`;
      }
      // Type-specific validation
      else if (type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedValue)) {
          error = `Invalid email format`;
        }
      } else if (type === "number") {
        if (isNaN(Number(trimmedValue))) {
          error = `Input must be a valid number`;
        }
      } else if (type === "password") {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+{}[\]|;:'",.<>\/?\\`~])[A-Za-z\d@$!%*?&#^()\-_=+{}[\]|;:'",.<>\/?\\`~]{8,}$/;
        if (!passwordRegex.test(trimmedValue)) {
          error =
            "Password must be at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.";
        }
      }
    }

    // Set or clear error
    this.setState((prevState) => ({
      errorMessage: {
        ...prevState.errorMessage,
        [name]: error,
      },
    }));
  };

  render() {
    const { open, errorMessage } = this.state;

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
          onClose={this.handleModal}
          keepMounted
          BackdropComponent={this.renderCustomBackDrop}
          className="flex justify-center p-8"
        >
          <Paper className="relative px-4 w-lg h-fit">
            <div className="flex flex-col items-center">
              <div className="relative w-full my-4 md:text-3xl text-2xl">
                <div className="absolute right-0">
                  <IconButton onClick={this.handleModal}>
                    <Close />
                  </IconButton>
                </div>
                <h5 className="text-center font-medium ">Login</h5>
              </div>
              <div className="px-2 w-full">
                <form
                  onSubmit={this.handleSubmit}
                  className="flex flex-col space-y-4"
                >
                  <div>
                    <InputText
                      name="email"
                      label="Email *"
                      onBlur={this.handleInput}
                      error={
                        errorMessage && errorMessage.email
                          ? errorMessage.email
                          : undefined
                      }
                      helperText={
                        errorMessage && errorMessage.email
                          ? errorMessage.email
                          : ""
                      }
                      fullWidth={true}
                    />
                  </div>
                  <div>
                    <InputPassword
                      name="password"
                      type="password"
                      label="Password *"
                      fullWidth
                      error={
                        errorMessage && errorMessage.password
                          ? errorMessage.password
                          : undefined
                      }
                      helperText={
                        errorMessage && errorMessage.password
                          ? errorMessage.password
                          : ""
                      }
                      onBlur={this.handleInput}
                    />
                    <Link href={"/resetpassword"}>
                      <p className="text-md underline">Forgot Password</p>
                    </Link>
                  </div>
                  <div className="my-4">
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
                <hr className="my-2 bg-gray-400" />
                <div className="my-4 flex flex-col space-y-2">
                  <Button
                    variant="contained"
                    startIcon={<Google />}
                    fullWidth
                    sx={{
                      textTransform: "capitalize",
                    }}
                    href="http://localhost:3001/api/auth/google"
                  >
                    Google
                  </Button>
                  {/* Add Button */}
                </div>
              </div>
              <div className="my-4 p-2 flex items-center justify-center flex-col">
                <p className="text-md text-center">
                  Belum Memiliki akun?{" "}
                  <Link href="/register" className="font-bold">
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            </div>
          </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));

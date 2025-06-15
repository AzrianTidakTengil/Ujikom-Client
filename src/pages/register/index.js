import {
  AppBar,
  createTheme,
  ThemeProvider,
  Toolbar,
  Box,
  Button,
  IconButton,
  Grid2,
  FormGroup,
  FormControlLabel,
  Typography,
  Divider,
  Container,
  Paper,
  Backdrop,
  CircularProgress,
  Stack,
} from "@mui/material";
import styles from "./style.module.css";
import React from "react";
import Link from "next/link";
import { palleteV1 } from "@/assets/css/template";
import { box } from "./theme";
import {
  InputGender,
  InputOTP,
  InputPassword,
  InputText,
} from "@/components/input";
import {
  ArrowBackIosNew,
  CheckBox,
  CheckCircleRounded,
  EmailOutlined,
  Google,
} from "@mui/icons-material";
import OtpInput from "react-otp-input";
import { Playfair_Display, Poppins } from "next/font/google";
import { LoginGoogle } from "@/services/auth";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import {
  downProgress,
  RegisterUser,
  resetProgress,
  SendCodeOtp,
  setProgress,
  upProgress,
  VerifyCodeOtp,
} from "@/store/auth";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });

const theme = createTheme({
  ...palleteV1,
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        credential: null,
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        telephone: "",
        gender: null,
        role_id: null,
      },
      boxIndex: 0,
      otp: "",
      errorMessage: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { auth, router } = this.props;

    if (auth.error && auth.error !== prevProps.auth.error) {
      this.setState((prevState) => ({
        errorMessage: {
          ...prevState.errorMessage,
          ...auth.error,
        },
      }));
    }

    // if (router.query) {
    //   if (router.query.success && router.query.success === "true") {
    //     this.props.setProgress(4);
    //   } else {
    //     this.props.resetProgress();
    //   }
    // }
  }

  handleNextBox = () => {
    const { boxIndex } = this.state;

    this.setState({
      boxIndex: boxIndex + 1,
    });
  };

  handleBackBox = () => {
    this.props.downProgress();
  };

  renderInputEmailOrTelp = () => {
    const { credential, errorMessage } = this.state;

    return (
      <div className="flex flex-col items-center">
        <h5 className="text-center font-medium my-4 md:text-3xl text-2xl">
          Daftar Alamat Email
        </h5>
        <div className="px-2 w-11/12">
          <form onSubmit={this.handleSubmitCredential}>
            <InputText
              name="credential"
              label="Email *"
              value={credential}
              onBlur={this.handleInputCredential}
              error={
                errorMessage && errorMessage.credential
                  ? errorMessage.credential
                  : undefined
              }
              helperText={
                errorMessage && errorMessage.credential
                  ? errorMessage.credential
                  : ""
              }
              fullWidth={true}
            />
            <div className="my-4">
              <Button
                variant="contained"
                color="success"
                fullWidth
                type="submit"
              >
                Selanjutnya
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
          <p className="text-sm md:text-md text-center">
            Dengan mendaftar, anda dinyatakan menyetujui{" "}
            <b>Syarat dan Ketentuan</b> serta <b>Kebijakan Privasi Popping</b>
          </p>
        </div>
        <div className="mt-6 p-2 flex items-center justify-center flex-col">
          <p className="text-md text-center">
            Sudah Memiliki Akun?{" "}
            <Link href="/" className="font-bold">
              Login sekarang
            </Link>
          </p>
        </div>
      </div>
    );
  };

  handleInputCredential = (event) => {
    const { name, value } = event.target;
    this.handleDetectorError({
      type: "email",
      required: true,
      minLength: 3,
      maxLength: 255,
      value,
      name: "credential",
    });
    this.setState({
      form: {
        ...this.state.form,
        credential: value,
      },
    });
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

  handleSubmitCredential = (e) => {
    e.preventDefault();
    const { errorMessage, form } = this.state;

    this.handleDetectorError({
      type: "email",
      value: form.credential,
      required: true,
      minLength: 3,
      maxLength: 255,
      name: "credential",
    });

    const hasNoErrors = Object.values(errorMessage).every((v) => v === null);

    if (hasNoErrors) {
      this.props.SendCodeOtp({ email: form.credential });
    }
  };

  renderCodeOTP = () => {
    const { otp } = this.state;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-full my-4 md:text-3xl text-2xl">
          <div className="absolute left-0 max-[321px]:hidden">
            <IconButton onClick={() => this.handleBackBox()}>
              <ArrowBackIosNew />
            </IconButton>
          </div>
          <h5 className="text-center font-medium ">Kode Verifikasi</h5>
        </div>
        <div className="px-2 w-full">
          <form onSubmit={this.handleSubmitOTP} className="flex flex-col">
            <p className="text-sm md:text-md text-center">
              Kode telah dikirimkan ke email{" "}
              <b>{`${this.state.form.credential}`}</b>. Silahkan cek email
              tersebut
            </p>
            <div className="self-center">
              <InputOTP
                value={otp}
                name="otp"
                onChange={(event) => this.handleOTPinput(event)}
              />
            </div>
            <div className="my-4">
              <Button
                variant="contained"
                color="success"
                type="submit"
                fullWidth
                loading={this.props.auth.isLoading}
              >
                Selanjutnya
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-4 p-2 flex items-center justify-center flex-col">
          <p className="text-md">Tidak mendapat token? Klik disini</p>
        </div>
      </div>
    );
  };

  handleOTPinput = (event) => {
    const { name, value } = event.target;
    const { otp } = this.state;

    if (!value.match("\\D", "g")) {
      this.setState({
        otp: value,
      });
    }
  };

  handleSubmitOTP = (e) => {
    e.preventDefault();
    const { otp } = this.state;

    this.props.VerifyCodeOtp({ code: otp });
  };

  renderInformation = () => {
    const { errorMessage, form } = this.state;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-full my-4 md:text-3xl text-2xl">
          <h5 className="text-center font-semibold ">Registrasi User</h5>
        </div>
        <div className="px-2 w-full">
          <form
            onSubmit={this.handleSubmitInformation}
            className="flex flex-col"
          >
            <InputText
              name="username"
              label="Username"
              fullWidth
              required
              onBlur={(event) => this.handleInputInformation(event)}
              sx={{
                marginY: 2,
              }}
              error={
                errorMessage && errorMessage.username
                  ? errorMessage.username
                  : undefined
              }
              helperText={
                errorMessage && errorMessage.username
                  ? errorMessage.username
                  : ""
              }
              defaultValue={form.username}
            />
            <InputPassword
              name="password"
              label="Password"
              onBlur={(event) => this.handleInputInformation(event)}
              fullWidth
              sx={{
                marginY: 2,
              }}
              required
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
              defaultValue={form.password}
            />
            <div className="my-4">
              <Button
                variant="contained"
                color="success"
                fullWidth
                type="submit"
              >
                Selanjutnya
              </Button>
            </div>
          </form>
        </div>
        {/* <div className="mt-4 p-2 flex items-center justify-center flex-col">
            <p className="text-md">Tidak mendapat token? Klik disini</p>
          </div> */}
      </div>
    );
  };

  handleInputInformation = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      this.handleDetectorError({
        value,
        required: true,
        minLength: 3,
        maxLength: 30,
        name,
      });
      this.setState({
        form: {
          ...this.state.form,
          [name]: value,
        },
      });
    }
    if (name === "password") {
      this.handleDetectorError({
        value,
        required: true,
        type: "password",
        name,
      });
      this.setState({
        form: {
          ...this.state.form,
          [name]: value,
        },
      });
    }
  };

  handleSubmitInformation = (e) => {
    e.preventDefault();
    const { errorMessage, form } = this.state;

    this.handleDetectorError({
      value: form.username,
      required: true,
      minLength: 3,
      maxLength: 20,
      name: "username",
    });

    this.handleDetectorError({
      value: form.password,
      required: true,
      minLength: 8,
      maxLength: 8,
      name: "password",
    });

    const hasNoErrors = Object.values(errorMessage).every((v) => v === null);

    if (hasNoErrors) {
      this.props.upProgress();
    }
  };

  renderMoreInformation = () => {
    const { errorMessage, form } = this.state;
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-full my-4 md:text-3xl text-2xl">
          <div className="absolute left-0 max-[321px]:hidden">
            <IconButton onClick={() => this.handleBackBox()}>
              <ArrowBackIosNew />
            </IconButton>
          </div>
          <h5 className="text-center font-medium ">Lengkapi Data Diri</h5>
        </div>
        <div className="px-2 w-full">
          <form
            onSubmit={this.handleSubmitMoreInformation}
            className="flex flex-col"
          >
            <InputText
              name="firstname"
              label="Nama depan"
              required
              fullWidth
              sx={{
                marginY: 2,
              }}
              onBlur={(event) => this.handleInputMoreInformation(event)}
              error={
                errorMessage && errorMessage.firstname
                  ? errorMessage.firstname
                  : undefined
              }
              helperText={
                errorMessage && errorMessage.firstname
                  ? errorMessage.firstname
                  : ""
              }
              defaultValue={form.firstname}
            />
            <InputText
              name="lastname"
              label="Nama akhir"
              fullWidth
              required
              sx={{
                marginY: 2,
              }}
              onBlur={(event) => this.handleInputMoreInformation(event)}
              error={
                errorMessage && errorMessage.lastname
                  ? errorMessage.lastname
                  : undefined
              }
              helperText={
                errorMessage && errorMessage.lastname
                  ? errorMessage.lastname
                  : ""
              }
              defaultValue={form.lastname}
            />
            <InputGender
              fullWidth
              sx={{
                marginY: 2,
              }}
              value={form.gender}
              change={(event) => this.handleChangeRadioGender(event)}
            />
            <div className="my-4">
              <Button
                variant="contained"
                color="success"
                type="submit"
                fullWidth
                loading={this.props.auth.isLoading}
              >
                Selanjutnya
              </Button>
            </div>
          </form>
        </div>
        {/* <div className="mt-4 p-2 flex items-center justify-center flex-col">
          <p className="text-md"></p>
        </div> */}
      </div>
    );
  };

  handleInputMoreInformation = (event) => {
    const { name, value } = event.target;

    if (name === "firstname") {
      this.handleDetectorError({
        value,
        name,
        minLength: 3,
        maxLength: 50,
        required: true,
      });
      this.setState({
        form: {
          ...this.state.form,
          [name]: value,
        },
      });
    } else if (name === "lastname") {
      this.handleDetectorError({
        value,
        name,
        minLength: 3,
        maxLength: 100,
        required: true,
      });
      this.setState({
        form: {
          ...this.state.form,
          [name]: value,
        },
      });
    }
  };

  handleChangeRadioGender = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        gender: event.target.value,
      },
    });
  };

  handleSubmitMoreInformation = (e) => {
    e.preventDefault();
    const { errorMessage, form } = this.state;

    this.handleDetectorError({
      value: form.firstname || form.username,
      name: "firstname",
      minLength: 3,
      maxLength: 50,
      required: true,
    });

    this.handleDetectorError({
      value: form.lastname,
      name: "lastname",
      minLength: 3,
      maxLength: 100,
      required: true,
    });

    const hasNoErrors = Object.values(errorMessage).every((v) => v === null);

    if (hasNoErrors) {
      const params = {
        role: "user",
        email: form.credential,
        username: form.username,
        firstname: form.firstname || form.username,
        lastname: form.lastname,
        password: form.password,
        gender:
          form.gender == "1"
            ? "Perempuan"
            : form.gender == "2"
            ? "Laki laki"
            : "Tidak tau",
      };

      this.props.RegisterUser(params);
    }
  };

  renderSuccess = () => {
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-full my-4 md:text-3xl text-2xl">
          {/* <h5 className="text-center font-medium ">Berhasil</h5> */}
        </div>
        <div className="px-2 w-full flex flex-col items-center justify-center space-y-2.5">
          <CheckCircleRounded color="success" sx={{ fontSize: "5rem" }} />
          <p className="text-md md:text-lg text-center">
            Anda telah berhasil membuat akun. Silahkan lanjut ke halaman utama
          </p>
          <div className="my-4">
            <Stack direction={"row"} spacing={2}>
              <Button variant="contained" color="primary" href="/">
                Halaman Utama
              </Button>
              <Button variant="outlined" color="primary" href="/register/shop">
                Buka Toko
              </Button>
            </Stack>
          </div>
        </div>
        <div className="mt-4 p-2 flex items-center justify-center flex-col">
          {/* <p className="text-md">Tidak mendapat token? Klik disini</p> */}
        </div>
      </div>
    );
  };

  render() {
    const { progressIndex } = this.props.auth;

    return (
      <ThemeProvider theme={theme}>
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3
                className={`${playfair.className} text-gray-800 font-bold text-center text-4xl md:text-6xl`}
              >
                Popping Marketplace
              </h3>
              <p
                className={`${playfair.className} text-gray-500 font-light text-center text-xl md:text-2xl`}
              >
                Tempat berbelanja secara daring
              </p>
            </div>
            <div>
              <Paper className="relative p-4">
                <Backdrop
                  open={this.props.auth.isLoading}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: theme.zIndex.modal + 1,
                    backgroundColor: "rgba(236, 236, 236, 0.3)",
                  }}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>

                {progressIndex === 0
                  ? this.renderInputEmailOrTelp()
                  : progressIndex === 1
                  ? this.renderCodeOTP()
                  : progressIndex === 2
                  ? this.renderInformation()
                  : progressIndex === 3
                  ? this.renderMoreInformation()
                  : this.renderSuccess()}
              </Paper>
            </div>
          </div>
        </div>
        {/* <Container sx={{ paddingY: 8 }}>
          <Grid2 container>
            <Grid2 size={6} className="flex items-center justify-center">
              <Box>
                <Typography
                  textAlign="center"
                  variant="h3"
                  className={`${playfair.className} text-gray-800`}
                >
                  Popping Marketplace
                </Typography>
                <Typography
                  textAlign="center"
                  variant="body1"
                  marginY={2}
                  className={`${playfair.className} text-gray-500`}
                >
                  Tempat berbelanja secara daring
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={6} className="px-8">
              <Paper className="relative p-4">
                <Backdrop
                  open={this.props.auth.isLoading}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: this.theme.zIndex.modal + 1,
                    backgroundColor: "rgba(236, 236, 236, 0.3)",
                  }}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>

                {progressIndex === 0
                  ? this.renderInputEmailOrTelp()
                  : progressIndex === 1
                  ? this.renderCodeOTP()
                  : progressIndex === 2
                  ? this.renderInformation()
                  : progressIndex === 3
                  ? this.renderMoreInformation()
                  : this.renderSuccess()}
              </Paper>
            </Grid2>
          </Grid2>
        </Container> */}
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    data: state.auth.data,
    token: state.auth.token,
    isSuccessToken: state.auth.isSuccessToken,
    isSuccessSend: state.auth.isSuccessSend,
    progressIndex: state.auth.progressIndex,
  },
});

const mapDispatchToProps = {
  SendCodeOtp,
  VerifyCodeOtp,
  upProgress,
  RegisterUser,
  resetProgress,
  setProgress,
  downProgress,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));

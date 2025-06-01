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
    this.theme = createTheme({
      pallete: {
        ...palleteV1.palette,
      },
    });
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
        <h5 className="text-center font-medium my-4 text-4xl">
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
          <p className="text-sm">
            Dengan mendaftar, anda dinyatakan menyetujui{" "}
            <b>Syarat dan Ketentuan</b> serta <b>Kebijakan Privasi Popping</b>
          </p>
        </div>
        <div className="mt-6 p-2 flex items-center justify-center flex-col">
          <p className="text-md">
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
    let error = "";

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

    const hasNoErrors = Object.values(errorMessage).every((v) => v !== null);

    if (hasNoErrors) {
      this.props.upProgress();
      // this.props.SendCodeOtp({ email: form.credential });
    }
  };

  renderCodeOTP = () => {
    const { otp } = this.state;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-full my-4 lg:text-4xl md:text-3xl text-xl">
          <div className="absolute left-0">
            <IconButton onClick={() => this.handleBackBox()}>
              <ArrowBackIosNew />
            </IconButton>
          </div>
          <h5 className="text-center font-medium ">Kode Verifikasi</h5>
        </div>
        <div className="px-2 w-full">
          <form onSubmit={this.handleSubmitOTP} className="flex flex-col">
            <p className="text-md text-center">
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
    const { errorMessage } = this.state;

    return (
      <>
        <Typography
          variant="h5"
          textAlign={"center"}
          fontWeight={600}
          sx={{ marginY: 2 }}
        >
          Informasi Penting
        </Typography>
        <Box
          sx={{
            paddingX: 2,
          }}
        >
          <form
            onSubmit={this.handleSubmitInformation}
            className={styles.Box_main}
          >
            <InputText
              name="username"
              label="Username *"
              fullWidth
              onBlur={(event) => this.handleInputInformation(event)}
              sx={{
                marginY: 2,
              }}
              error={
                errorMessage && errorMessage.username
                  ? errorMessage.username
                  : undefined
              }
            />
            <InputPassword
              name="password"
              label="Password *"
              onBlur={(event) => this.handleInputInformation(event)}
              fullWidth
              sx={{
                marginY: 2,
              }}
              required
              error={
                errorMessage && errorMessage.username
                  ? errorMessage.username
                  : undefined
              }
            />
            <Button
              variant="contained"
              color="success"
              fullWidth
              type="submit"
              sx={{ marginY: 4 }}
            >
              Selanjutnya
            </Button>
          </form>
        </Box>
        <div className={styles.Box_footer}></div>
      </>
    );
  };

  handleInputInformation = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      if (value.length < 3) {
        this.setState({
          errorMessage: {
            [name]: `Username must have more 3 character`,
          },
        });
      } else {
        this.setState({
          form: {
            ...this.state.form,
            [name]: value,
          },
          errorMessage: null,
        });
      }
    }
    if (name === "password") {
      if (value.length < 8) {
        this.setState({
          errorMessage: {
            [name]: `Username must have more 3 character`,
          },
        });
      } else {
        this.setState({
          form: {
            ...this.state.form,
            [name]: value,
          },
          errorMessage: null,
        });
      }
    }
  };

  handleSubmitInformation = (e) => {
    e.preventDefault();
    const { errorMessage, form } = this.state;

    this.props.upProgress();
  };

  renderMoreInformation = () => {
    const { firstname, lastname, gender } = this.state.form;
    return (
      <>
        <Grid2 container spacing={2}>
          <Grid2 size={3}>
            <IconButton onClick={() => this.handleBackBox()}>
              <ArrowBackIosNew />
            </IconButton>
          </Grid2>
          <Grid2 size={6} display={"flex"} justifyContent={"center"}>
            <Typography variant="h5" textAlign={"center"} fontWeight={600}>
              Lengkapi Data Diri
            </Typography>
          </Grid2>
          <Grid2 size={3}></Grid2>
        </Grid2>
        <Box
          sx={{
            marginY: 2,
            paddingX: 2,
          }}
        >
          <form
            onSubmit={this.handleSubmitMoreInformation}
            className={styles.Box_main}
          >
            <InputText
              name="firstname"
              label="Nama depan *"
              fullWidth
              sx={{
                marginY: 2,
              }}
              onBlur={(event) => this.handleInputMoreInformation(event)}
            />
            <InputText
              name="lastname"
              label="Nama akhir *"
              fullWidth
              sx={{
                marginY: 2,
              }}
              onBlur={(event) => this.handleInputMoreInformation(event)}
            />
            <InputGender
              fullWidth
              sx={{
                marginY: 2,
              }}
              change={(event) => this.handleChangeRadioGender(event)}
            />
            <Button
              variant="contained"
              color="success"
              fullWidth
              type="submit"
              sx={{ marginY: 4 }}
            >
              Kirim
            </Button>
          </form>
        </Box>
        <div className={styles.Box_footer} style={{ marginTop: "0.5rem" }}>
          {/* <p style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>Lewati isi data tersebut</p> */}
        </div>
      </>
    );
  };

  handleInputMoreInformation = (event) => {
    const { name, value } = event.target;

    if (name === "firstname") {
      if (value.length < 3) {
        console.log("error");
      } else {
        this.setState({
          form: {
            ...this.state.form,
            [name]: value,
          },
        });
      }
    } else if (name === "lastname") {
      if (value.length < 3) {
        console.log("error");
      } else {
        this.setState({
          form: {
            ...this.state.form,
            [name]: value,
          },
        });
      }
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
  };

  renderSuccess = () => {
    return (
      <>
        <div className={styles.Box_title}></div>
        <div className={styles.Box_main}>
          <CheckCircleRounded color="success" sx={{ fontSize: "5rem" }} />
          <p>Anda telah berhasil membuat akun. Lanjutkan ke menu Login</p>
          <Stack direction={"row"} spacing={2}>
            <Button variant="contained" color="success" href="/">
              Login
            </Button>
            {/* <Button variant="outlined" href="/register/shop">Buka Toko</Button> */}
          </Stack>
        </div>
      </>
    );
  };

  render() {
    const { progressIndex } = this.props.auth;

    return (
      <ThemeProvider theme={this.theme}>
        <div className="px-6 py-8">
          <div className="grid grid-cols-2 gap-8 items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3
                className={`${playfair.className} text-gray-800 font-bold text-6xl`}
              >
                Popping Marketplace
              </h3>
              <p
                className={`${playfair.className} text-gray-500 font-light text-2xl`}
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

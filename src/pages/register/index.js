import { AppBar, createTheme, ThemeProvider, Toolbar, Box, Button, IconButton, Grid2, FormGroup, FormControlLabel, Typography, Divider, Container, Paper, Backdrop, CircularProgress, Stack } from "@mui/material"
import styles from "./style.module.css";
import React from "react"
import Link from "next/link";
import { palleteV1 } from "@/assets/css/template";
import { box } from "./theme";
import { InputGender, InputOTP, InputPassword, InputText } from "@/components/input";
import { ArrowBackIosNew, CheckBox, CheckCircleRounded, EmailOutlined, Google } from "@mui/icons-material";
import OtpInput from 'react-otp-input';
import { Playfair_Display, Poppins } from "next/font/google";
import { LoginGoogle } from "@/services/auth";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { RegisterUser, SendCodeOtp, upProgress, VerifyCodeOtp } from "@/store/auth";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            form: {
                credential: null,
                username: '',
                password: '',
                firstname: '',
                lastname: '',
                telephone: '',
                gender: null,
                role_id: null,
            },
            boxIndex: 0,
            otp: '',
            errorMessage: null,
        }
        this.theme = createTheme({
            pallete: {
                ...palleteV1.palette
            }
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {auth} = nextProps

        if (auth.error) {
            this.setState({
                errorMessage: {
                    ...this.state.errorMessage,
                    ...auth.error
                }
            })
        }
    }

    handleNextBox = () => {
        const {boxIndex} = this.state

        this.setState({
            boxIndex: boxIndex + 1
        })
    }

    handleBackBox = () => {
        const {boxIndex} = this.state

        this.setState({
            boxIndex: boxIndex-1 < 0 ? 0 : boxIndex-1
        })
    }

    renderInputEmailOrTelp = () => {
        const {credential, errorMessage} = this.state

        return (
            <Box
                sx={{
                    px: 2
                }}
            >
                <Typography variant="h5" textAlign={'center'} fontWeight={600} marginY={2}>Daftar Alamat Email</Typography>
                <Box
                    sx={{
                        paddingX: 2,
                    }}
                >
                    <form onSubmit={this.handleSubmitCredential} className={styles.Box_main}>
                        <InputText
                            name="credential"
                            label="Email *"
                            value={credential}
                            onBlur={this.handleInputCredential}
                            error={
                                errorMessage && errorMessage.credential ? errorMessage.credential : undefined
                            }
                            helperText={
                                errorMessage && errorMessage.credential ? errorMessage.credential : ''
                            }
                            fullWidth={true}
                        />
                        <Button variant="contained" color="success" fullWidth type="submit" sx={{marginTop: 2}}>Selanjutnya</Button>
                    </form>
                </Box>
                <Divider/>
                <Box
                    sx={{
                        marginY: 2,
                        paddingX: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<Google/>}
                        fullWidth
                        sx={{
                            textTransform: 'capitalize'
                        }}
                        href="http://localhost:3001/api/auth/google"
                    >
                        Google
                    </Button>
                </Box>
                <Typography sx={{fontSize: '0.75rem'}} textAlign={'center'}>Dengan mendaftar, anda dinyatakan menyetujui <b>Syarat dan Ketentuan</b> serta <b>Kebijakan Privasi Popping</b></Typography>
                <div className={styles.Box_footer}>
                    <p>Sudah Memiliki Akun? <Link href='/'>Login sekarang</Link> </p>
                </div>
            </Box>
        )
    }

    handleInputCredential = (event) => {
        const {name, value} = event.target
        if (value.length < 3 && value.length > 0) {
            this.setState({
                errorMessage: {
                    credential: 'Email must have more 3 character'
                }
            })
        } else {
            this.setState({
                form: {
                    ...this.state.form,
                    credential: value,
                },
                errorMessage: {
                    credential: null
                }
            })
        }
    }

    handleSubmitCredential = (e) => {
        e.preventDefault()
        const {errorMessage, form} = this.state

        if (!errorMessage.credential) {
            this.props.SendCodeOtp({email: form.credential})
        }
    }

    renderCodeOTP = () => {
        const {otp} = this.state

        return (
            <>
                <Grid2 container spacing={2}>
                    <Grid2 size={3}>
                        <IconButton onClick={() => this.handleBackBox()}>
                            <ArrowBackIosNew/>
                        </IconButton>
                    </Grid2>
                    <Grid2 size={6} display={'flex'} alignItems={'center'}>
                        <Typography variant="h5" textAlign={'center'} fontWeight={600}>Kode Verifikasi</Typography>
                    </Grid2>
                    <Grid2 size={3}>

                    </Grid2>
                </Grid2>
                <div className={styles.Box_main}>
                    <p>Kode telah dikirimkan ke email {`${this.state.form.credential}`}. Silahkan cek email tersebut</p>
                    <form onSubmit={this.handleSubmitOTP} className={styles.Box_main}>
                        <InputOTP
                            value={otp}
                            name="otp"
                            onChange={(event) => this.handleOTPinput(event)}
                            style={{
                                marginBottom: 50
                            }}
                        />
                        <Button variant="contained" color="success" sx={{width: '85%'}} type="submit" loading={this.props.auth.isLoading}>Selanjutnya</Button>
                    </form>
                </div>
                <div className={styles.Box_footer}>
                    <p>Tidak mendapat token? Klik disini</p>
                </div>
            </>
        )
    }

    handleOTPinput = (event) => {
        const {name, value} = event.target
        const {otp} = this.state

        if (!value.match('\\D', 'g')) {
            this.setState({
                otp: value
            })
        }
    }

    handleSubmitOTP = (e) => {
        e.preventDefault()
        const {otp} = this.state

        this.props.VerifyCodeOtp({code: otp})
    }

    renderInformation = () => {
        const {errorMessage} = this.state

        return (
            <>
                <Typography variant="h5" textAlign={'center'} fontWeight={600} sx={{marginY: 2}}>Informasi Penting</Typography>
                <Box
                    sx={{
                        paddingX: 2
                    }}
                >
                    <form onSubmit={this.handleSubmitInformation} className={styles.Box_main}>
                        <InputText
                            name="username"
                            label="Username *"
                            fullWidth
                            onBlur={(event) => this.handleInputInformation(event)}
                            sx={{
                                marginY: 2
                            }}
                            error={errorMessage && errorMessage.username ? errorMessage.username : undefined}
                        />
                        <InputPassword
                            name="password"
                            label="Password *"
                            onBlur={(event) => this.handleInputInformation(event)}
                            fullWidth
                            sx={{
                                marginY: 2
                            }}
                            error={errorMessage && errorMessage.username ? errorMessage.username : undefined}
                        />
                        <Button variant="contained" color="success" fullWidth type="submit" sx={{marginY: 4}}>Selanjutnya</Button>
                    </form>
                </Box>
                <div className={styles.Box_footer}>
                    
                </div>
            </>
        )
    }

    handleInputInformation = (event) => {
        const {name, value} = event.target
        if (name === 'username') {
            if (value.length < 3) {
                this.setState({
                    errorMessage: {
                        [name]: `Username must have more 3 character`
                    }
                })
            } else {
                this.setState({
                    form: {
                        ...this.state.form,
                        [name]: value
                    },
                    errorMessage: null
                })
            }
        } if (name === 'password') {
            if (value.length < 8) {
                this.setState({
                    errorMessage: {
                        [name]: `Username must have more 3 character`
                    }
                })
            } else {    
                this.setState({
                    form: {
                        ...this.state.form,
                        [name]: value
                    },
                    errorMessage: null
                })
            }
        }
    }

    handleSubmitInformation = (e) => {
        e.preventDefault()
        const {errorMessage, form} = this.state

        this.props.upProgress()
    }
    
    renderMoreInformation = () => {
        const {firstname, lastname, gender} = this.state.form
        return (
            <>
                <Typography variant="h5" textAlign={'center'} fontWeight={600} sx={{marginY: 2}}>Lengkapi Data Diri</Typography>
                <Box
                    sx={{
                        marginY: 2,
                        paddingX: 2,
                    }}
                >
                    <form onSubmit={this.handleSubmitMoreInformation} className={styles.Box_main}>
                        <InputText
                            name="firstname"
                            label="Nama depan *"
                            fullWidth
                            sx={{
                                marginY: 2
                            }}
                            onBlur={(event) => this.handleInputMoreInformation(event)}
                        />
                        <InputText
                            name="lastname"
                            label="Nama akhir *"
                            fullWidth
                            sx={{
                                marginY: 2
                            }}
                            onBlur={(event) => this.handleInputMoreInformation(event)}
                        />
                        <InputGender
                            fullWidth
                            sx={{
                                marginY: 2
                            }}
                            change={(event) => this.handleChangeRadioGender(event)}
                        />
                        <Button variant="contained" color="success" fullWidth type="submit" sx={{marginY: 4}}>Kirim</Button>
                    </form>
                </Box>
                <div className={styles.Box_footer} style={{marginTop: '0.5rem'}}>
                    {/* <p style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>Lewati isi data tersebut</p> */}
                </div>
            </>
        )
    }

    handleInputMoreInformation = (event) => {
        const {name, value} = event.target

        if (name === 'firstname') {
            if (value.length < 3) {
                console.log('error')
            } else {
                this.setState({
                    form: {
                        ...this.state.form,
                        [name]: value
                    }
                })
            }
        } else if (name === 'lastname') {
            if (value.length < 3) {
                console.log('error')
            } else {
                this.setState({
                    form: {
                        ...this.state.form,
                        [name]: value
                    }
                })
            }
        }
    }
    
    handleChangeRadioGender = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                gender: event.target.value
            }
        })
    }

    handleSubmitMoreInformation = (e) => {
        e.preventDefault()
        const {errorMessage, form} = this.state

        const params = {
            role: 'user',
            email: form.credential,
            username: form.username,
            firstname: form.firstname || form.username,
            lastname: form.lastname,
            password: form.password,
            gender: form.gender == '1' ? "Perempuan" : form.gender == '2' ? "Laki laki" : 'Tidak tau'
        }

        this.props.RegisterUser(params)
    }

    renderSuccess = () => {
        return(
            <>
                <div className={styles.Box_title}>
                </div>
                <div className={styles.Box_main}>
                    <CheckCircleRounded color="success" sx={{fontSize: '5rem'}}/>
                    <p>Anda telah berhasil membuat akun. Lanjutkan ke menu Login</p>
                    <Stack
                        direction={'row'}
                        spacing={2}
                    >
                        <Button variant="contained" color="success" href="/">Login</Button>
                        <Button variant="outlined" href="/register/shop">Buka Toko</Button>
                    </Stack>
                </div>
            </>
        )
    }

    render(){
        const {progressIndex} = this.props.auth

        return(
            <ThemeProvider theme={this.theme}>
                <Container sx={{paddingY: 8}}>
                    <Grid2 container>
                        <Grid2 size={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Box>
                                <Typography textAlign={'center'} variant="h3" className={playfair.className}>Popping E-Commerce</Typography>
                                <Typography textAlign={'center'} variant="body1" marginY={2} className={playfair.className}>Tempat berbelanja secara daring</Typography>
                            </Box>
                        </Grid2>
                        <Grid2 size={6} sx={{paddingX: 8}}>
                            <Paper
                                sx={{
                                    p: 2,
                                    position: 'relative'
                                }}
                            >
                                <Backdrop
                                    open={this.props.auth.isLoading}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        zIndex: this.theme.zIndex.modal + 1,
                                        backgroundColor: 'rgba(236, 236, 236, 0.3)'
                                    }}
                                >
                                    <CircularProgress color="white"/>
                                </Backdrop>
                                {
                                    progressIndex === 0 ? this.renderInputEmailOrTelp() :
                                    progressIndex === 1 ? this.renderCodeOTP() :
                                    progressIndex === 2 ? this.renderInformation() :
                                    progressIndex === 3 ? this.renderMoreInformation() :
                                    this.renderSuccess()
                                }
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Container>
            </ThemeProvider>
        )
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
    }
})

const mapDispatchToProps = {
    SendCodeOtp,
    VerifyCodeOtp,
    upProgress,
    RegisterUser,
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Register))

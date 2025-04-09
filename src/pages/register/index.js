import { AppBar, createTheme, ThemeProvider, Toolbar, Box, Button, IconButton, Grid2, FormGroup, FormControlLabel, Typography, Divider, Container, Paper } from "@mui/material"
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
                <div className={styles.Box_title}>
                    <h2>Daftar</h2>
                </div>
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
        // const { credential } = this.state.form
        const {name, value} = event.target
        console.log(`${name}: ${value}`)
        console.log(value.length)
        if (value.length < 3 && value.length > 0) {
            this.setState({
                errorMessage: {
                    credential: 'Email must have more 3 character'
                }
            })
            console.log(this.state.errorMessage)
        } else {
            this.setState({
                form: {
                    ...this.state.form,
                    credential: value,
                },
                errorMessage: null
            })
        }
    }

    handleSubmitCredential = (e) => {
        e.preventDefault()
        const {errorMessage, form} = this.state

        if (!errorMessage) {
            this.handleNextBox()
        }
    }

    renderCodeOTP = () => {
        const {otp} = this.state

        return (
            <>
                <div className={styles.Box_title} style={{width: '85%'}}>
                    <Grid2 container spacing={2}>
                        <Grid2 xs={3}>
                            <IconButton onClick={() => this.handleBackBox()}>
                                <ArrowBackIosNew/>
                            </IconButton>
                        </Grid2>
                        <Grid2 xs sx={{marginLeft: '1rem'}}>
                            <h2>Kode Verifikasi</h2>
                        </Grid2>
                    </Grid2>
                </div>
                <div className={styles.Box_main}>
                    <p>Kode telah dikirimkan ke email {`${this.state.form.credential}`}. Silahkan cek email tersebut</p>
                    <form onSubmit={this.handleSubmitOTP} className={styles.Box_main}>
                        <InputOTP
                            value={otp}
                            name="otp"
                            onChange={(event) => this.handleOTPinput(event)}
                            onBlur={() => console.log(this.state.otp)}
                            style={{
                                marginBottom: 50
                            }}
                        />
                        <Button variant="contained" color="success" sx={{width: '85%'}} type="submit">Selanjutnya</Button>
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

        if (!value.match('\\D', 'g') && otp.length < 6) {
            this.setState({
                otp: value
            })
        }
    }

    handleSubmitOTP = (e) => {
        e.preventDefault()
        const {otp} = this.state
        const dummy_token = `012432`

        if (otp === `${dummy_token}`) {
            alert('success')
            this.handleNextBox()
        } else {
            alert('error')
            this.setState({
                otp: ''
            })
        }
    }

    renderInformation = () => {
        const {credential, telephone, username, password} = this.state.form

        return (
            <>
                <div className={styles.Box_title}>
                    <h2>Information</h2>
                </div>
                <div className={styles.Box_main}>
                    <form onSubmit={this.handleSubmitInformation} className={styles.Box_main}>
                        <InputText
                            name="telephone"
                            label="No Telephone *"
                            style={{width: '85%', marginBottom: 24}}
                            onBlur={(event) => this.handleInputInformation(event)}
                        />
                        <InputText
                            name="username"
                            label="Username *"
                            style={{width: '85%', marginBottom: 24}}
                            onBlur={(event) => this.handleInputInformation(event)}
                        />
                        <InputPassword
                            name="password"
                            label="Password *"
                            style={{width: '85%', marginBottom: 6}}
                            onBlur={(event) => this.handleInputInformation(event)}
                        />
                        <Button variant="contained" color="success" sx={{width: '85%'}} type="submit">Selanjutnya</Button>
                    </form>
                </div>
                <div className={styles.Box_footer}>
                    
                </div>
            </>
        )
    }

    handleInputInformation = (event) => {
        const {name, value} = event.target

        console.log(name)
        console.log(value)

        if (name === 'username') {
            if (value.length < 3) {
                console.log('error')
            } else {
                this.setState({
                    form: {
                        ...this.state.form,
                        [name]: value
                    },
                    errorMessage: null
                })
                console.log(this.state.form.username)
            }
        } else if (name === 'telephone') {
            if (value.length < 3) {
                console.log('error')
            } else {
                this.setState({
                    form: {
                        ...this.state.form,
                        [name]: value
                    },
                    errorMessage: null
                })
                console.log(this.state.form.telephone)
            }
        } else if (name === 'password') {
            if (value.length < 8) {
                console.log('error password')
            } else {    
                this.setState({
                    form: {
                        ...this.state.form,
                        [name]: value
                    },
                    errorMessage: null
                })
                console.log(this.state.form.password)
            }
        }
    }

    handleSubmitInformation = (e) => {
        e.preventDefault()
        const {errorMessage, form} = this.state
        console.log(form)

        if (!errorMessage) {
            this.handleNextBox()
        }
    }
    
    renderMoreInformation = () => {
        const {firstname, lastname, gender} = this.state.form
        return (
            <>
                <div className={styles.Box_title}>
                    <h2>More Information</h2>
                </div>
                <div className={styles.Box_main}>
                    <form onSubmit={this.handleSubmitMoreInformation} className={styles.Box_main}>
                        <InputText
                            name="firstname"
                            label="Nama depan *"
                            style={{width: '85%', marginBottom: 24}}
                            onBlur={(event) => this.handleInputMoreInformation(event)}
                        />
                        <InputText
                            name="lastname"
                            label="Nama akhir *"
                            style={{width: '85%', marginBottom: 24}}
                            onBlur={(event) => this.handleInputMoreInformation(event)}
                        />
                        <InputGender
                            style={{width: '85%', marginBottom: 24}}
                            change={(event) => this.handleChangeRadioGender(event)}
                        />
                        <Button variant="contained" color="success" sx={{width: '85%'}} type="submit">Kirim</Button>
                    </form>
                </div>
                <div className={styles.Box_footer} style={{marginTop: '0.5rem'}}>
                    <p style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => this.handleNextBox()}>Lewati isi data tersebut</p>
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
        console.log(event.target)
        console.log(event.target.value)
        this.setState({
            form: {
                ...this.state.form,
                gender: event.target.value
            }
        })
    }

    handleSubmitMoreInformation = (e) => {
        e.preventDefault()
        const {errorMessage} = this.state
        
        console.log(this.state.form)

        if (!errorMessage) {
            this.handleNextBox()
        }
    }

    renderSuccess = () => {
        return(
            <>
                <div className={styles.Box_title}>
                </div>
                <div className={styles.Box_main}>
                    <CheckCircleRounded color="success" sx={{fontSize: '5rem'}}/>
                    <p>Anda telah berhasil membuat akun. Lanjutkan ke menu Login</p>
                    <Link href="/"><Button variant="contained" color="success" sx={{marginBottom: 4}}>Login</Button></Link>
                    <Button variant="contained">Lanjutkan untuk membuka Toko</Button>
                </div>
            </>
        )
    }

    renderBox = () => {
        const list = [
            this.renderInputEmailOrTelp(),
            this.renderCodeOTP(),
            this.renderInformation(),
            this.renderMoreInformation(),
            this.renderSuccess()
        ]
        const {boxIndex} = this.state

        return (
            <>
                {list[boxIndex]}
            </>
        )
        
    }

    render(){
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
                                    p: 2
                                }}
                            >
                                {this.renderBox()}
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Container>
            </ThemeProvider>
        )
    }
}

export default Register

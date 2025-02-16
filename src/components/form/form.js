'use client'

import { Box, Button, createTheme, Divider, IconButton, Modal, ThemeProvider, Backdrop, CircularProgress } from "@mui/material";
import { buttonPrimary, container, input, mainItem } from "./theme";
import { useState, Component } from "react";
import styles from './style.module.css'
import { Close } from "@mui/icons-material";
import { Input, InputEmail, InputPassword } from "../input";
import { Poppins } from "next/font/google";
import { palleteV1 } from "@/assets/css/template";
import Link from "next/link";
import { connect } from "react-redux";
import { login } from "@/store/auth";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '500'],
  style: ['normal']
})

const theme = createTheme({
  ...palleteV1
})

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      email: '',
      password: '',
      errorMessage: null,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {email, password, errorMessage} = this.state
    if (!errorMessage) {
      this.props.login({user: email, password})
    } else {
      console.log('cannot')
    }
  }

  handleModal = () => {
    const {open} = this.state

    this.setState({
      open: !open
    })
  }

  handleInput = (event) => {
    const {name, value} = event.target

    if (name === 'email') {
      this.setState({
        [name]: value
      })
    } else if (name === 'password') {
      this.setState({
        [name]: value
      })
    }
  }

  render() {
    const {open} = this.state
    
    return(
      <ThemeProvider theme={theme}>
        <Button variant="outlined" onClick={this.handleModal} color="white" sx={{marginRight: 1}}>Login</Button>
        <Modal 
        open={open} 
        sx={container}
        onClose={this.handleModal}
        keepMounted
        >
          <Box
            sx={mainItem}
          >
              <div className={styles.head}>
                  <h2>Login</h2>
                  <IconButton onClick={this.handleModal}>
                    <Close/>
                  </IconButton>
              </div>
              <form className={styles.body} onSubmit={this.handleSubmit}>
                <InputEmail name="email" type="text" label="Email" style={input} onBlur={(event) => this.handleInput(event)}/>
                <InputPassword name="password" type="password" label="Password" style={input} blur={(event) => this.handleInput(event)}/>
                <p>Forgot Password</p>
                <Button variant="contained" color="success" sx={{width: '85%', marginTop: 6}} type="submit">
                    Submit
                </Button>
              </form>
              <div className={styles.footer}>
                    <p>Tidak memiliki Akun? <Link href="/register">Daftar sekarang</Link></p>
              </div>
          </Box>
        </Modal>
                  <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.modal + 100 })}
                    open={this.props.isLoading}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
  data: state.auth.data,
})

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
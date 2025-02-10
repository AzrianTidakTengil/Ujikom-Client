'use client'

import { Box, Button, createTheme, Divider, IconButton, Modal, ThemeProvider } from "@mui/material";
import { buttonPrimary, container, input, mainItem } from "./theme";
import { useState, Component } from "react";
import styles from './style.module.css'
import { Close } from "@mui/icons-material";
import { Input, InputEmail, InputPassword } from "../input";
import { Poppins } from "next/font/google";
import { palleteV1 } from "@/assets/css/template";
import Link from "next/link";
import LoginLib from "@/lib/auth";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '500'],
  style: ['normal']
})

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      email: '',
      password: '',
      errorMessage: null
    }
  }
  
  theme = () => createTheme({
    ...palleteV1
  })

  handleSubmit = (e) => {
    e.preventDefault()
    const {email, password, errorMessage} = this.state
    const {post, isLoading, data} = LoginLib.getState()

    if (isLoading) {
      console.log(isLoading)
    }

    if (!errorMessage) {
      post({user: email, password})
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
    const {post, isLoading} = LoginLib.getState()
    
    return(
      <ThemeProvider theme={this.theme()}>
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
                <Button variant="contained" color="success" sx={{width: '85%', marginTop: 6}} type="submit" loading={isLoading}>
                    Submit
                </Button>
              </form>
              <div className={styles.footer}>
                    <p>Tidak memiliki Akun? <Link href="/register">Daftar sekarang</Link></p>
              </div>
          </Box>
        </Modal>
      </ThemeProvider>
    )
  }
}

export default Auth
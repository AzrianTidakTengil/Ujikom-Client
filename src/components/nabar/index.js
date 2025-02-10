import {
  AppBar,
  Box,
  createTheme,
  Divider,
  InputAdornment,
  Modal,
  TextField,
  ThemeProvider,
  Toolbar,
  Button
} from "@mui/material";
import styles from "./style.module.css";
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { SearchOutlined } from "@mui/icons-material";
import Auth from "../form/form";
import { palleteV1 } from "@/assets/css/template";
import React, { useState } from "react";
import { containerModal, mainItem } from "./theme";
import Link from "next/link";


class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      disableInput: false,
    }
  }
  
  theme = () => createTheme({
    palette: {
      ...palleteV1.palette,
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
    }
  })

  componentDidMount() {
    const {showModal} = this.state
    if (showModal) {
      setTimeout(() => {
        this.setState({
          showModal: false
        }, 12000)
      })
    }
  }

  handleFocus() {
    const {showModal} = this.state
    
    this.setState({
      showModal: true
    })
  }

  handleOutFocus() {
    const {showModal} = this.state
    
    this.setState({
      showModal: false
    })
  }

  handleChange(val) {
    console.log(val)
  }

  render() {
    const {showModal} = this.state
    const dummy_search = [
      {
        id: 1,
        name: 'infinix'
      },{
        id: 2,
        name: 'infinix gt 20 pro'
      },{
        id: 3,
        name: 'handphone'
      },{
        id: 4,
        name: 'mainan'
      },
    ]

    return (
      <ThemeProvider theme={this.theme()}>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Link href='/'><h1 className={styles.title}>Popping</h1></Link>
            <TextField
              sx={{ width: '40%' }}
              size="small"
              hiddenLabel
              slotProps={{ input: {
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchOutlined color="white"/>
                    </InputAdornment>
                )
              }}}
              onChange={(event) => this.handleChange(event.target.value)}
              onClick={() => this.handleFocus()}
            />
            <div className={styles.item}>
              <div>
                <Auth/>
                <Link href="/register"><Button variant="contained" color="white">Register</Button></Link>
              </div>
            </div>
          </Toolbar>
        </AppBar>
          <Modal
              open={showModal}
              onClose={() => this.handleOutFocus()}
              sx={containerModal}
              disableAutoFocus
          >
              <Box
                sx={mainItem}
              >
                  <div className={styles.listItem}>
                    {dummy_search.map((val) => <Link 
                    href={{
                      pathname: '/search',
                      query: {keyword: val.name}
                    }}
                    scroll={true}
                    prefetch={true}
                    onClick={() => this.handleOutFocus()}
                    >
                      <div key={val.id}>{val.name}</div>
                    </Link>)}
                  </div>
              </Box>
          </Modal>
      </ThemeProvider>
    )
  }
}

export default Navbar
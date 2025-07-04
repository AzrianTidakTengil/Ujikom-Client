"use client";

const { Component } = require("react");
import {
  Container,
  Typography,
  Box,
  IconButton,
  Grid2 as Grid,
  Divider,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import { palleteV1 } from "@/assets/css/template";
import Link from "next/link";
import { Facebook, Twitter, X } from "@mui/icons-material";

const theme = createTheme({
  ...palleteV1,
});

class Footer extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
          }}
          className="w-full p-6"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="px-4">
              <h5 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Help</h5>
              <Link href={"/"}>
                <p className="text-md font-light">Customer Support</p>
              </Link>
              <Link href={"/"}>
                <p className="text-md font-light">FAQs</p>
              </Link>
              <Link href={"/"}>
                <p className="text-md font-light">Contact Us</p>
              </Link>
            </div>
            <div className="px-4">
              <h5 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">About</h5>
              <Link href={"/"}>
                <p className="text-md font-light">Our Story</p>
              </Link>
              <Link href={"/"}>
                <p className="text-md font-light">Careers</p>
              </Link>
              <Link href={"/"}>
                <p className="text-md font-light">Press</p>
              </Link>
            </div>
            <div className="px-4">
              <h5 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Follow</h5>
              <div className="flex space-x-2 flex-col md:flex-row">
                <IconButton
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon/>
                </IconButton>
                <IconButton
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook/>
                </IconButton>
                <IconButton
                  href="https://www.x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <X/>
                </IconButton>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <p className="text-center">
            &copy; Azrian Muhammadin Hanif {new Date().getFullYear()}
          </p>
        </Box>
      </ThemeProvider>
    );
  }
}

export default Footer;

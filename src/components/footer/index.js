const { Component } = require("react");
import { Container, Typography, Box, IconButton, Grid2 as Grid, Divider } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

class Footer extends Component{
    constructor(props) {
        super()
        this.state ={

        }
    }

    render() {
        return(
            <Box component="footer" sx={{ bgcolor: "#333", color: "white", py: 3, mt: 5,  width: "100%" }}>
            <Container maxWidth="xl">
                <Grid container spacing={4} justifyContent="space-around">
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Help</Typography>
                    <Typography variant="body2">Customer Support</Typography>
                    <Typography variant="body2">FAQs</Typography>
                    <Typography variant="body2">Contact Us</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6">About the Company</Typography>
                    <Typography variant="body2">Our Story</Typography>
                    <Typography variant="body2">Careers</Typography>
                    <Typography variant="body2">Press</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Follow Us</Typography>
                    <IconButton
                    href="https://www.instagram.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "white" }}
                    >
                        <InstagramIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="body2" sx={{ mt: 1 }}>Stay connected with us on social media</Typography>
                </Grid>
                </Grid>
                <Divider sx={{ bgcolor: "white", my: 2 }} />
                <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                    &copy; Azrian Muhammadin Hanif {new Date().getFullYear()}
                </Typography>
            </Container>
            </Box>
        )
    }
}

export default Footer
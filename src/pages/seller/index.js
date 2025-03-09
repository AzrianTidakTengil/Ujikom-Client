import { palleteV1 } from "@/assets/css/template";
import { SellerLayout } from "@/components";
import { Container, createTheme, Paper, ThemeProvider } from "@mui/material";
import { Component } from "react";

const theme = createTheme()

class Seller extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <ThemeProvider theme={theme}>
                <Container>
                    <Paper
                        sx={{
                            p:2
                        }}
                    >
                        Yo haloo
                    </Paper>
                </Container>
            </ThemeProvider>
        )
    }
}

Seller.getLayout = (page) => {
    return (
        <SellerLayout>
            {page}
        </SellerLayout>
    )
}

export default Seller
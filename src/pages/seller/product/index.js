import { palleteV1 } from "@/assets/css/template"
import { Container, createTheme, Paper, ThemeProvider, Typography } from "@mui/material"
import { withRouter } from "next/router"
import {Component} from "react"
import { connect } from "react-redux"
import { SellerLayout } from "@/components"


class SellerProduct extends Component {
    constructor(props) {
        super(props)
        this.theme = createTheme({
            palette: {
                ...palleteV1.palette
            }
        })
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Container>
                    <Typography variant="h4" fontWeight={600} sx={{marginBottom: 2}}>Produk toko anda</Typography>
                    <Paper
                        sx={{
                            p: 2
                        }}
                    >
                        
                    </Paper>
                </Container>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SellerProduct))
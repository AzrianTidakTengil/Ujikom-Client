import { Component } from "react";
import { Container, createTheme, ThemeProvider, Typography, Box, Paper } from "@mui/material";
import { palleteV1 } from "@/assets/css/template";
import { connect } from "react-redux";
import { withRouter } from "next/router";

class Transaction extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    theme = () => createTheme({
        palette: {
            ...palleteV1.palette
        }
    })

    renderListTransaction = (data, index = 0) => {
        return (
            <Box
                sx={{
                    marginY: 2
                }}
            >
                <Paper
                    sx={{
                        p: 4
                    }}
                >

                </Paper>
            </Box>
        )
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Container>
                    <Typography variant="h4" fontWeight={600}>Transaksi</Typography>
                    {this.renderListTransaction()}
                </Container>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    transaction: {
        isLoading: state.transaction.isLoading,
        isSuccess: state.transaction.isSuccess,
        data: state.transaction.data
    }
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Transaction))
import { palleteV1 } from "@/assets/css/template";
import { Container, createTheme, Paper, ThemeProvider } from "@mui/material";
import { withRouter } from "next/router";
import { Component } from "react";
import { connect } from "react-redux";

class ItemsTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    theme = () => createTheme({
        palette: {
            ...palleteV1.palette
        }
    })

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Container>
                    <Paper
                        sx={{
                            p: 4
                        }}
                    >
                        
                    </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ItemsTransaction))

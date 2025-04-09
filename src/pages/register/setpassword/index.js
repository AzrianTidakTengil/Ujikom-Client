import { palleteV1 } from '@/assets/css/template'
import { Container, createTheme, ThemeProvider, AppBar, Toolbar, Box, Typography, Grid2, Paper, Button } from '@mui/material'
import {Component} from 'react'
import Link from "next/link";
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Playfair_Display, Poppins } from "next/font/google";
import { InputPassword } from '@/components/input';
const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });

class SetPassword extends Component {
    constructor(props){
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
                                <Typography variant='h5'>Atur password anda</Typography>
                                <form>
                                    <InputPassword
                                        label={'password'}
                                        sx={{
                                            marginY: 2
                                        }}
                                        fullWidth
                                    />
                                    <InputPassword
                                        label={'ulang password'}
                                        sx={{
                                            marginY: 2
                                        }}
                                        fullWidth
                                    />
                                    <Button variant='contained' fullWidth type='submit'>Simpan</Button>
                                </form>
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Container>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SetPassword))
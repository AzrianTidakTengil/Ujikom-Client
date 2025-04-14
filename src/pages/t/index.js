import { palleteV1 } from "@/assets/css/template";
import { Container, createTheme, Paper, ThemeProvider, Box, Grid2 as Grid, Divider, Typography, Card, Chip, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { withRouter } from "next/router";
import { Component } from "react";
import { connect } from "react-redux";
import { getTransaction } from "@/store/transaction";
import { ExpandMore } from "@mui/icons-material";

class ItemsTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            payment: {
                id: 0,
                method: '',
                type: '',
                order: '',
                code: '',
                status: '',
                amount: 0
            }
        }
    }

    theme = () => createTheme({
        palette: {
            ...palleteV1.palette
        }
    })

    UNSAFE_componentWillMount() {
        const {router} = this.props
        const idPath = router.asPath.match(/id=(\d+)/)

        if (router.query.id) {
            this.props.getTransaction({id: parseInt(router.query.id)})
        } else if (idPath) {
            if (idPath[1]) {
                this.props.getTransaction({id: parseInt(idPath[1])})
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {transaction} = this.props

        if (transaction.isSuccess) {
            this.setState({
                payment: {
                    id: transaction.data.transaction.id,
                    method: transaction.data.transaction.transactionToPayment.payment_method,
                    type: transaction.data.transaction.transactionToPayment.subtype,
                    order: transaction.data.transaction.transactionToPayment.order_id,
                    code: transaction.data.transaction.transactionToPayment.payment_code,
                    status: transaction.data.transaction.transactionToPayment.status,
                    amount: transaction.data.transaction.total_price
                }
            })
        }
    }

    renderPayment = () => {
        const {id, code, method, type, order, status, amount} = this.state.payment

        const mandiri = method === 'echannel' ? code.split(' ') : null
        const indomaret = type === 'indomaret' ? code.split(' ') : null

        return(
            <Box
                sx={{
                    paddingX: 2
                }}
            >
                <Typography variant="h6">{this.handleTitle({method, type})}</Typography>
                <Grid
                    container
                    spacing={2}
                    direction={'row'}
                >
                    <Grid size={12}>
                        {
                            (method === 'echannel') || (type === 'indomaret') ? 
                                <Paper
                                    sx={{
                                        width: 'fit-content',
                                        marginX: 'auto',
                                        p: 2,
                                    }}
                                >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-around'
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{marginRight: 2}}>{mandiri ? 'Biller code:' : indomaret ? 'Payment code:' : ''}</Typography>
                                    <Typography variant="h6" fontWeight={600}>{mandiri && mandiri[1] ? mandiri[1] : indomaret && indomaret[1] ? indomaret[1] : null}</Typography>
                                </Box>
                                <Divider sx={{marginY: 2}}/>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-around'
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{marginRight: 2}}>{mandiri ? 'Bill key:' : indomaret ? 'Merchant id:' : ''}</Typography>
                                    <Typography variant="h6" fontWeight={600}>{mandiri && mandiri[0] ? mandiri[0] : indomaret && indomaret[0] ? indomaret[0] : null}</Typography>
                                </Box>
                                </Paper>
                            : 
                                <Paper
                                    sx={{
                                        width: 'fit-content',
                                        marginX: 'auto',
                                        p: (method === 'bank_transfer') || (method === 'cstore') ? 2 : 0
                                    }}
                                >
                                    {
                                        method === 'qris' ? <img src={code} width={240} height={240}/> :
                                        (method === 'bank_transfer') || (method === 'cstore') ? <Typography variant="h6" fontWeight={600}>{code}</Typography> :
                                        ''
                                    }
                                    {/* <Typography variant="subtitl2" fontWeight={300} textAlign={'center'}>Powered By Qris</Typography> */}
                                </Paper>
                        }
                    </Grid>
                    <Grid size={12} display={'flex'} justifyContent={'center'}>
                        <Chip color="primary" sx={{fontSize:'1.2rem'}} {...this.handleAttributeChipStatus(status)}/>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    handleAttributeChipStatus = (status) => {
        return {
            label: status === 'settlement' ? 'menunggu konfirmasi' : status === 'onSeller' ? 'sedang proses' : status === 'delivery' ? 'sedang diantar' : status === 'expired' ? 'kadaluarsa' : status === 'rejectedBySeller' ? 'ditolak' : status === 'success' ? 'diterima' : 'menunggu',
            color: status === 'settlement' ? 'warning' : status === 'onSeller' ? 'primary' : status === 'delivery' ? 'info' : status === 'expired' ? 'error' : status === 'rejectedBySeller' ? 'error' : status === 'success' ? 'success' : 'default',
        }
    }

    handleTitle = (val) => {
        const {method, type} = val
        
        if (method === 'qris') {
            return 'QR code by Qris'
        } else if (method === 'bank_transfer') {
            if (type === 'permata') {
                return 'Permata Virtual Account'
            } else if (type === 'bni') {
                return 'BNI Virtual Account'
            } else if (type === 'bri') {
                return 'BRI Virtual Account'
            } else if (type === 'cimb') {
                return 'CIMB Virtual Account'
            }
        } else if (method === 'echannel') {
            return 'Mandiri Bill Payment'
        } else if (method === 'cstore') {
            if (type === 'alfamart') {
                return 'Alfamart'
            } else if (type === 'indomaret') {
                return 'Indomaret'
            }
        }
    }

    renderAmount = () => {
        const {amount} = this.state.payment
        return (
            <Paper
                sx={{
                    p: 4,
                    marginY: 4
                }}
            >
                <Typography variant="h5" textAlign={'center'} fontWeight={400}>
                            Total Harga:
                </Typography>
                <Typography variant="h5" fontWeight={600} textAlign={'center'}>
                    {
                        new Intl.NumberFormat('id-ID', {
                            style: "currency",
                            currency: "IDR"
                        }).format(amount)
                    }
                </Typography>
            </Paper>
        )
    }

    renderAccordian = () => {
        return (
            <Box
                sx={{
                    marginY: 4,
                }}
            >
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                    >
                        <Typography component={'span'}>Cara Pembayaran</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                    >
                        <Typography component={'span'}>Cara Pembayaran</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </AccordionDetails>
                </Accordion>
            </Box>
        )
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Container>
                    <Paper
                        sx={{
                            p: 4
                        }}
                    >
                        <Typography variant="h4" fontWeight={600}>Bayar Sekarang</Typography>
                        <Divider sx={{marginY: 2}}/>
                        {this.renderPayment()}
                    </Paper>
                    {this.renderAmount()}
                    {this.renderAccordian()}
                </Container>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    transaction: {
        isLoading: state.transaction.isLoading,
        isSuccess: state.transaction.isSuccess,
        data: state.transaction.data.data
    }
})

const mapDispatchToProps = {
    getTransaction
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ItemsTransaction))

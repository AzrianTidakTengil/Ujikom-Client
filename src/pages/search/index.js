import { Component } from 'react';
import { Container, Typography, Grid2 as Grid, Card, CardActionArea, CardContent, CardMedia, Pagination, Button, Rating, Divider, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails, FormControl, Select, MenuItem } from '@mui/material';
import { Playfair_Display, Poppins } from "next/font/google";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter, withRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { ExpandMore, Filter, FilterAlt, SearchOff, SearchOutlined } from '@mui/icons-material';
import { InputText } from '@/components/input';

const products = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: "This is a great product.",
    price: `$${(29.99 + i).toFixed(2)}`,
    image: "https://via.placeholder.com/150"
}));

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            keyword: null,
            offeringProduct: 1,
            limitProduct: 50,
            visibleProducts: products.slice(0, 50)
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {keyword} = nextProps.router.query

        this.setState({
            keyword
        })
    }



    renderProducts = () => {
        const {visibleProducts, offeringProduct, limitProduct, keyword} = this.state

        return(
            <>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <SearchOutlined/>
                        <Typography variant='subtitle1'>Hasil pencarian untuk <b>{keyword}</b></Typography>
                    </div>
                    <div>
                        <FormControl>
                            <Select
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                defaultValue={1}
                            >
                                <MenuItem value={1}>Terkait</MenuItem>
                                <MenuItem value={2}>Terbaik</MenuItem>
                                <MenuItem value={3}>Terlaris</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <Grid container spacing={4} rowSpacing={2} columnSpacing={2} columns={10}>
                    {visibleProducts.map((product) => (
                        <Grid item key={product.id} size={{xs:3, sm:2}}>
                            <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                {product.description}
                                </Typography>
                                <Typography variant="h6" color="primary">
                                {product.price}
                                </Typography>
                            </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={Math.ceil(products.length / limitProduct)}
                    page={offeringProduct}
                    onChange={this.handlePageChange}
                    color="primary"
                    sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
                />
            </>
        )
    }

    handlePageChange = (event, value) => {
        const {limitProduct} = this.state
        const startIndex = (value - 1) * limitProduct

        this.setState({
            offeringProduct: value,
            visibleProducts: products.slice(startIndex, startIndex + limitProduct)
        });

        window.scroll(0,0)
    };

    renderFilter = () => {
        return (
            <Card>
                <CardContent>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <FilterAlt/>
                        <Typography variant='h5'>Filter</Typography>
                    </div>
                    <Grid container rowSpacing={2} columns={1} sx={{marginTop: 4}}>
                        <Grid size={1}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMore/>}
                                    aria-controls="panel-content"
                                >
                                    <Typography variant='subtitle1' sx={{marginBottom: 2}}>Kategori bersangkutan</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} label="Handphone" />
                                        <FormControlLabel control={<Checkbox />} label="Eletronic" />
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid size={1}>
                            <Typography variant='subtitle1' sx={{marginBottom: 2}}>Rating</Typography>
                            <div style={{width: '100%', margin: 'auto'}}>
                                <Rating
                                    name='rating'
                                    defaultValue={4}
                                />
                            </div>
                        </Grid>
                        <Grid size={1}>
                            <Typography variant='subtitle1'>Harga</Typography>
                            <InputText label="Min. Harga" style={{marginTop: 5}}/>
                            <InputText label="Max. Harga" style={{marginTop: 5}}/>
                        </Grid>
                        <Grid size={1}>
                            <Typography variant='subtitle1'>Tipe Toko</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Official" />
                                <FormControlLabel control={<Checkbox />} label="Top Star" />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Button variant='contained' sx={{marginTop: 6, width: '100%'}}>Riset</Button>
                </CardContent>
            </Card>
        )
    }

    render() {
        return(
            <Container maxWidth="xl">
                <Grid container columnSpacing={3}>
                    <Grid item size={2.5}>
                        {this.renderFilter()}
                    </Grid>
                    <Grid item size="grow">
                        {this.renderProducts()}
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default withRouter(Search)
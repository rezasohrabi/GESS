import React from 'react';
import { Card, CardContent, CardMedia, Typography, makeStyles, Grid, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from './../../../redux/Cart/cart.actions'

const useStyles = makeStyles((theme) => ({
    card: {
        flexGrow: 1,
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    media: {
        height: '0',
        paddingTop: '56.25%',
        backgroundSize: 'contain',
    },
}));

const ProductItem = product => {

    const {
        productId,
        productThumbnail,
        productName,
        productPrice
      } = product;

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();


    if(!productId || !productName || !productThumbnail || 
        typeof productPrice === 'undefined') return null;

    const handleAddToCart = () => {
        if (!product) return;
        dispatch(
            addToCart(product)
        )
        history.push('/cart')
    }

    return (
        <Grid 
        container 
        item 
        xs={12} 
        sm={6} 
        md={4}
        className={classes.root}>
            <Card className={classes.card}>
                <Link to={`/product/${productId}`}>
                    <CardMedia 
                    className={classes.media}
                    image={productThumbnail}
                    title={productName} />
                </Link>
                <CardContent>
                    <Link to={`/product/${productId}`}>
                        <Typography 
                        variant='body1' 
                        color='textPrimary' 
                        component='p'>{productName}</Typography>
                    </Link>
                    <Typography
                    variant='subtitle1'
                    color='primary'
                    >{productPrice} $</Typography>
                    <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleAddToCart}
                    size='small'>add to cart</Button>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ProductItem;
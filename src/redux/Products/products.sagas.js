import { all, call, takeLatest, put } from 'redux-saga/effects';
import productTypes from './products.types';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct, handleFetchProduct } from './products.helpers'
import { auth } from '../../firebase/utils';
import { fetchProductsStart, setProducts, setProduct } from './products.actions';

export function* addNewProduct({payload}) {

    try {
        const timeStamp = new Date();
        yield handleAddProduct({
            ...payload,
            adminUserUid: auth.currentUser.uid,
            createdDate: timeStamp,
        });
        yield put(
            fetchProductsStart()
        );
    } catch(err) {
        console.error(err);
    }
}

export function* onAddNewProductStart() {
    yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addNewProduct);
}

export function* fetchProducts({payload}) {
    try {
        const products = yield handleFetchProducts(payload);
        yield put(
            setProducts(products)
        )
    } catch(err) {
        console.error(err);
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({payload}) {
    try {
        yield handleDeleteProduct(payload);
        yield put(
            fetchProductsStart()
        );
    } catch(err) {
        console.error(err);
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* fetchProduct({payload}) {
    try {
        const product = yield handleFetchProduct(payload);
        yield put(
            setProduct(product)
        );
    } catch (err) {
        console.error(err)
    }
}

export function* onFetchProductStart() {
    yield takeLatest(productTypes.FETCH_PRODUCT_START, fetchProduct)
}

export default function* productsSagas() {
    yield all([
        call(onAddNewProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
        call(onFetchProductStart),
    ])
};
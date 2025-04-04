import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/services";
import { CreateProduct, CreateSubVariant, CreateVariant, SubVariant, TreeCateogories, Variant } from "@/services/product";
import ProductMessage from './message'

export const getAll = createAsyncThunk('productSlice/getAll', async (params) => {
    const response = await Product.ALl(params)
    return response.data
})

export const getOne = createAsyncThunk('productSlice/getOne', async (params) => {
    const response = await Product.One(params)
    return response.data
})

export const findProduct = createAsyncThunk('productSlice/findProduct', async () => {
    const response = await Product.Find()
    return response.data
})

export const createProduct = createAsyncThunk('productSlice/createProduct', async (params) => {
    const response = await CreateProduct(params)
    return response.data
})

export const listCategoriesProduct = createAsyncThunk('productSlice/listCategoriesProduct', async (params) => {
    const response = await TreeCateogories()
    return response.data
})

export const listVariantProduct = createAsyncThunk('productSlice/listVariantProduct', async (params) => {
    const response = await Variant()
    return response.data
})

export const listSubVariantProduct = createAsyncThunk('productSlice/listSubVariantProduct', async (params) => {
    const response = await SubVariant(params)
    return response.data
})

export const createVariantProduct = createAsyncThunk('productSlice/createVariantProduct', async (params) => {
    const response = await CreateVariant(params)
    return response.data
})

export const createSubVariantProduct = createAsyncThunk('productSlice/createSubVariantProduct', async (params) => {
    const response = await CreateSubVariant(params)
    return response.data
})

const initialState = {
    isLoading: false,
    isSuccess: false,
    error: null,
    show: [],
    totalItems: 0,
    data: {
        isLoading: false,
        isSuccess: false,
        product: {
            id: null,
            name: '',
            description: '',
            price: 0,
            stock: 0,
            shop: {
                id: null,
                name: '',
                address: ''
            }
        }
    },
    listCategories: [],
    listVariant: [],
    listSubVariant: [],
    message: '',
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.show = action.payload.data
                state.totalItems = action.payload.total_products
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(getOne.pending, (state) => {
                state.data.isLoading = true
                state.data.isSuccess = false
            })
            .addCase(getOne.fulfilled, (state, action) => {
                state.data.isLoading = false
                state.data.isSuccess = true
                state.data.product.id = action.payload.data.id
                state.data.product.name = action.payload.data.name
                state.data.product.description = action.payload.data.description
                state.data.product.price = action.payload.data.price
                state.data.product.stock = action.payload.data.stock
                state.data.product.shop.id = action.payload.data.productToOwner.ownerToStore.id
                state.data.product.shop.name = action.payload.data.productToOwner.ownerToStore.name
                state.data.product.shop.address = action.payload.data.productToOwner.ownerToStore.address
            })
            .addCase(getOne.rejected, (state, action) => {
                state.data.isLoading = false
                state.error = action.error.message
            })
            .addCase(findProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(findProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.show = action.payload.data
            }).addCase(findProduct.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(createProduct.pending, (state) => {
                state.message = ProductMessage.PRODUCTS.CREATE
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.error =  action.error.message
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.message = ProductMessage.PRODUCTS.CREATE
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(listCategoriesProduct.pending, (state, action) => {
                state.isLoading = true
                state.message = ''
                state.isSuccess = false
            })
            .addCase(listCategoriesProduct.rejected, (state, action) => {
                state.isLoading = false
                state.message = ''
                state.error = action.error.message
            })
            .addCase(listCategoriesProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = ''
                state.isSuccess = true
                state.listCategories = action.payload.data
            })
            .addCase(listVariantProduct.pending, (state, action) => {
                state.isLoading = true
                state.message = ''
                state.isSuccess = false
            })
            .addCase(listVariantProduct.rejected, (state, action) => {
                state.isLoading = false
                state.message = ''
                state.error = action.error.message
            })
            .addCase(listVariantProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = ''
                state.isSuccess = true
                state.listVariant = action.payload.data
            })
            .addCase(listSubVariantProduct.pending, (state, action) => {
                state.isLoading = true
                state.message = ''
                state.isSuccess = false
            })
            .addCase(listSubVariantProduct.rejected, (state, action) => {
                state.isLoading = false
                state.message = ''
                state.error = action.error.message
            })
            .addCase(listSubVariantProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = ''
                state.isSuccess = true
                state.listSubVariant = action.payload.data
            })
            .addCase(createVariantProduct.pending, (state, action) => {
                state.isLoading = true
                state.message = ''
                state.isSuccess = false
            })
            .addCase(createVariantProduct.rejected, (state, action) => {
                state.isLoading = false
                state.message = ''
                state.error = action.error.message
            })
            .addCase(createVariantProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = 
                state.isSuccess = true
            })
            .addCase(createSubVariantProduct.pending, (state, action) => {
                state.isLoading = true
                state.message = ''
                state.isSuccess = false
            })
            .addCase(createSubVariantProduct.rejected, (state, action) => {
                state.isLoading = false
                state.message = ''
                state.error = action.error.message
            })
            .addCase(createSubVariantProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = ''
                state.isSuccess = true
            })
    }
})

export default productSlice.reducer
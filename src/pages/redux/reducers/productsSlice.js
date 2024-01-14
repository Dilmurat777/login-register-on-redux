import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getProducts = createAsyncThunk(
	'get/getProducts',
	async (_, {rejectWithValue}) => {
		try {
			const res = await axios('https://api.escuelajs.co/api/v1/products?offset=10&limit=21')

			if (res.status !== 200) {
				throw new Error('Ошибка при получение продуктов')
			}

			return res.data

		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)


const initialState = {
	products: [],
	error: null,
	status: 'Idle'
}


const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
			state.error = null
			state.status = 'loading'
		})
		builder.addCase(getProducts.rejected, (state, action) => {
			state.error = action.payload
			state.status = 'error'
		})
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.status = 'done'
			state.products = action.payload 
		})
	}
})

export default productsSlice.reducer








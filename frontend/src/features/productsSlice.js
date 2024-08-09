import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const productsEdit = createAsyncThunk(
  "products/productsEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/${values.product._id}`,
        values,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const productsDelete = createAsyncThunk(
  "products/productsDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/products/${id}`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(productsFetch.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(productsCreate.pending, (state) => {
        state.createStatus = "pending";
      })
      .addCase(productsCreate.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.createStatus = "success";
        toast.success("Product Created");
      })
      .addCase(productsCreate.rejected, (state) => {
        state.createStatus = "rejected";
      })
      .addCase(productsEdit.pending, (state) => {
        state.editStatus = "pending";
      })
      .addCase(productsEdit.fulfilled, (state, action) => {
        const updatedProducts = state.items.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
        state.items = updatedProducts;
        state.editStatus = "success";
        toast.info("Product Edited");
      })
      .addCase(productsEdit.rejected, (state) => {
        state.editStatus = "rejected";
      })
      .addCase(productsDelete.pending, (state) => {
        state.deleteStatus = "pending";
      })
      .addCase(productsDelete.fulfilled, (state, action) => {
        const newList = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        state.items = newList;
        state.deleteStatus = "success";
        toast.error("Product Deleted");
      })
      .addCase(productsDelete.rejected, (state) => {
        state.deleteStatus = "rejected";
      });
  },
});

export default productsSlice.reducer;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Obtener el host actual
const host = window.location.hostname;

// Obtener el protocolo actual (http o https)
const protocol = window.location.protocol;

// Accede a la variable de entorno para obtener la URL base de la API
//const API_BASE_URL = `https://backend-production-670d.up.railway.app/api`;

const VITE_API_URL = `https://ecommerce-mern-production-572d.up.railway.app/api`;

// Cambiar la URL base de la API para el entorno local
//const API_BASE_URL = `http://localhost:3001/api`;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: VITE_API_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;

import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './Features/api/apiSlice'
import { employeApiSlice } from './Features/api/employeApiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'


const reducer =  {
    [apiSlice.reducerPath]: apiSlice.reducer,
    employee: employeApiSlice
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)

export default store
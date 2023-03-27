import { apiSlice } from "./apiSlice";

export const employeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployeList: builder.query({
            query: () => 'Employer'
        }),
        getEmployeDetail: builder.query({
            query: (id) => `Employer/${id}`
        }),
        newEmployee: builder.mutation({
            query: payload => ({
                url: 'Employer',
                method: 'POST',
                body: payload
            })
        }),
        editEmployee: builder.mutation({
            query: payload => ({
                url: `Employer/${payload.id}`,
                method: 'PUT',
                body: payload 
            })
        }),
        deleteEmployee: builder.mutation({
            query: id => ({
                url: `Employer/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useGetEmployeListQuery,
    useGetEmployeDetailQuery,
    useEditEmployeeMutation,
    useDeleteEmployeeMutation,
    useNewEmployeeMutation
} = employeApiSlice
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/` }),
  tagTypes: ["empData"],

  endpoints: (builder) => ({
    // Fetch Employee Data
    empData: builder.query({
      query: () => ({
        url: "employees",
        credentials: "include",
      }),
      providesTags: ["empData"],
    }),

    // Add New Employee
    addEmp: builder.mutation({
      query: (data) => ({
        url: "employees/add",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["empData"],
    }),

    // Edit Existing Employee
    editEmp: builder.mutation({
      query: ({ id, data }) => ({
        url: `employees/edit/${id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["empData"],
    }),

    // Edit Existing Employee
    deleteEmp: builder.mutation({
      query: ({ id }) => ({
        url: `employees/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["empData"],
    }),
  }),
});

export default api;

export const {
  useEmpDataQuery,
  useAddEmpMutation,
  useEditEmpMutation,
  useDeleteEmpMutation,
} = api;

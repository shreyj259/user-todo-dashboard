import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({skip,search}) =>{
        if(search){
          return `users/search?q=${search}&limit=10&skip=${skip}&select=firstName`
        }
        return `users?limit=10&skip=${skip}&search=${search}&select=firstName`;
      } 
    }),
    getUserDetails:builder.query({
      query: ({userId}) => `users/${userId}`,
    }),
    getUserTodos: builder.query({
      query: ({userId}) => `todos/user/${userId}`,
    }),
    addUserTodo: builder.mutation({
      query: (todo) => ({
        url: 'todos/add',
        method: 'POST',
        body: todo,
      }),
    }),
    deleteUserTodo: builder.mutation({
      query: ({todoId}) => ({
        url: `todos/${todoId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserTodosQuery,
  useGetUserDetailsQuery,
  useAddUserTodoMutation,
  useDeleteUserTodoMutation,
} = api;

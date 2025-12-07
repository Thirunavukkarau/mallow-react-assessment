import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page) => {
    const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
      headers: {
        "x-api-key": "reqres_6cf8afaefcc045c4b4df337b8755b1ee"
      }
    });
    const data = await res.json();
    return data;
  }
);


const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    totalPages: 1,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload.data;
        state.totalPages = action.payload.total_pages;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;

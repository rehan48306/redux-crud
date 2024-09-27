import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../Service/api';


export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employee/list');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching users');
    }
  }
);


export const createEmployee = createAsyncThunk(
  'users/createEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employee/create', employeeData);
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error creating employee');
    }
  }
);


export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/employee/${userId}`);
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching user details');
    }
  }
);


export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, employeeData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/employee-update/${userId}`, employeeData);
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error updating user');
    }
  }
);


export const deleteUserById = createAsyncThunk(
  'users/deleteUserById',
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/employee-remove/${userId}`);
      return userId; 
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error deleting user');
    }
  }
);


const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
    userDetails: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload); 
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload; 
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload; 
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload); 
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

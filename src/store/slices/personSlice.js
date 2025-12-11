import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as personApi from '../../services/personApi';

// Load settings from localStorage
const loadSettings = () => {
  try {
    const limit = localStorage.getItem('personLimit');
    const sortBy = localStorage.getItem('personSortBy');
    const order = localStorage.getItem('personOrder');
    
    return {
      limit: limit ? parseInt(limit) : 10,
      sortBy: sortBy || 'createdAt',
      order: order || 'desc'
    };
  } catch {
    return { limit: 10, sortBy: 'createdAt', order: 'desc' };
  }
};

// Save settings to localStorage
const saveSettings = (limit, sortBy, order) => {
  try {
    localStorage.setItem('personLimit', limit.toString());
    localStorage.setItem('personSortBy', sortBy);
    localStorage.setItem('personOrder', order);
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
};

const settings = loadSettings();

// Initial state
const initialState = {
  persons: [], 
  loading: false,
  error: null,
  currentPage: 1,
  limit: settings.limit,
  sortBy: settings.sortBy,
  order: settings.order,
  hasMore: true,
};

// Async thunk: Fetch persons (for initial load or page change)
export const fetchPersonsThunk = createAsyncThunk(
  'persons/fetchPersons',
  async ({ page, limit, sortBy, order }, { rejectWithValue }) => {
    try {
      const data = await personApi.fetchPersons(page, limit, sortBy, order);
      return { data, page, limit };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk: Load more persons (for infinite scroll)
export const loadMorePersonsThunk = createAsyncThunk(
  'persons/loadMorePersons',
  async ({ page, limit, sortBy, order }, { rejectWithValue }) => {
    try {
      const data = await personApi.fetchPersons(page, limit, sortBy, order);
      return { data, page, limit };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk: Add person
export const addPersonThunk = createAsyncThunk(
  'persons/addPerson',
  async (personData, { rejectWithValue }) => {
    try {
      const newPerson = await personApi.createPerson(personData);
      return newPerson;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk: Update person
export const updatePersonThunk = createAsyncThunk(
  'persons/updatePerson',
  async ({ id, personData }, { rejectWithValue }) => {
    try {
      const updatedPerson = await personApi.updatePerson(id, personData);
      return updatedPerson;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk: Delete person
export const deletePersonThunk = createAsyncThunk(
  'persons/deletePerson',
  async (id, { rejectWithValue }) => {
    try {
      await personApi.deletePerson(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    // Change limit
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.currentPage = 1;
      state.hasMore = true;
      saveSettings(action.payload, state.sortBy, state.order);
    },
    // Change sort field
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
      state.hasMore = true;
      saveSettings(state.limit, action.payload, state.order);
    },
    // Change sort order
    setOrder: (state, action) => {
      state.order = action.payload;
      state.currentPage = 1;
      state.hasMore = true;
      saveSettings(state.limit, state.sortBy, action.payload);
    },
    // Go to next page
    nextPage: (state) => {
      if (state.hasMore) {
        state.currentPage += 1;
      }
    },
    // Go to previous page
    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch persons (initial load or reset)
    builder
      .addCase(fetchPersonsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.persons = action.payload.data;
        state.currentPage = action.payload.page;
        // Check if there are more pages
        state.hasMore = action.payload.data.length === action.payload.limit;
      })
      .addCase(fetchPersonsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch persons';
      });



    // Add person
    builder
      .addCase(addPersonThunk.fulfilled, (state) => {
        // Reload current page after add
        state.currentPage = 1;
      });

    // Update person
    builder
      .addCase(updatePersonThunk.fulfilled, (state, action) => {
        const index = state.persons.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.persons[index] = action.payload;
        }
      });

    // Delete person
    builder
      .addCase(deletePersonThunk.fulfilled, (state, action) => {
        state.persons = state.persons.filter(p => p.id !== action.payload);
      });
  },
});

export const { setLimit, setSortBy, setOrder, nextPage, prevPage, clearError } = personSlice.actions;
export default personSlice.reducer;

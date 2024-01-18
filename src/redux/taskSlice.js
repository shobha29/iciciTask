import {createSlice} from '@reduxjs/toolkit';
import {fetchLeadData, fetchTaskData} from './reducers';

const initialState = {tasksData: [], leadsData: [], loading: {}};

const taskSlice = createSlice({
  name: 'counter',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchTaskData.pending, (state, action) => {
      const {key = 'tasklist'} = action?.meta?.arg || {};

      return {
        ...state,
        loading: {
          ...state.loading,
          [key]: true,
        },
      };
    });
    builder.addCase(fetchTaskData.fulfilled, (state, action) => {
      const {key = 'tasklist'} = action?.meta.arg || {};
      const list = action?.payload?.entries.slice(0, 100) || [];

      return {
        ...state,
        tasksData: list,
        loading: {
          ...state.loading,
          [key]: false,
        },
      };
    });
    builder.addCase(fetchTaskData.rejected, (state, action) => {
      const {key = 'tasklist'} = action?.meta?.arg || {};

      return {
        ...state,
        loading: {
          ...state.loading,
          [key]: false,
        },
      };
    });
    builder.addCase(fetchLeadData.pending, (state, action) => {
      return {
        ...state,
        loading: {
          ...state.loading,
          leadlist: true,
        },
      };
    });
    builder.addCase(fetchLeadData.fulfilled, (state, action) => {
      const list = action.payload.data;

      return {
        ...state,
        leadsData: list,
        loading: {
          ...state.loading,
          leadlist: false,
        },
      };
    });
  },
});

export default taskSlice.reducer;

import {createAsyncThunk} from '@reduxjs/toolkit';

const fetchData = url => {
  return new Promise((res, rej) => {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(response => {
        res(response);
      })
      .catch(err => {
        console.log({err});
        rej([]);
      });
  });
};

export const fetchTaskData = createAsyncThunk(
  'tasks/fetchTaskData',
  async () => {
    try {
      const data = await fetchData('https://api.publicapis.org/entries');
      return data;
    } catch (error) {
      console.log({error});
      return error;
    }
  },
);

export const fetchLeadData = createAsyncThunk(
  'tasks/fetchLeadData',
  async () => {
    try {
      const data = await fetchData(
        'https://datausa.io/api/data?drilldowns=Nation&measures=Population',
      );
      return data;
    } catch (error) {
      console.log({error});
      return error;
    }
  },
);

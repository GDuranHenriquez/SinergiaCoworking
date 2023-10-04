import { configureStore } from '@reduxjs/toolkit';


//import Slices
import buildingReducer from '../slices/building';
import officeReducer from '../slices/offices';

const store = configureStore({
  reducer: {
    buildin: buildingReducer,
    office: officeReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;


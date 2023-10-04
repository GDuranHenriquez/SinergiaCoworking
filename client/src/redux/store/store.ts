import { configureStore } from '@reduxjs/toolkit';


//import Slices
import buildingReducer from '../slices/building'


const store = configureStore({
  reducer: {
    buildin: buildingReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;


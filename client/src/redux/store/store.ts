import { configureStore } from '@reduxjs/toolkit';


//import Slices
import buildingReducer from '../slices/building';
import officeReducer from '../slices/offices';
import cityReducer from '../slices/city'
import serviceReducer from '../slices/services'

const store = configureStore({
  reducer: {
    buildin: buildingReducer,
    office: officeReducer,
    city: cityReducer,
    service: serviceReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;


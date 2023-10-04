import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuildingState, ObjectBuilding } from './typesBuilding';


const initialState: BuildingState = {
  allBuildings: []
}

const buildingSlices = createSlice({
  name: 'building',
  initialState,
  reducers: {
    setAllBuilding: (state, action: PayloadAction<ObjectBuilding[] | []>) => {
      state.allBuildings = action.payload;
    }
  }
});


export const { setAllBuilding } = buildingSlices.actions;

export default buildingSlices.reducer;

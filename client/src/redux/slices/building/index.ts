import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuildingState, ObjectBuilding } from './typesBuilding';


const initialState: BuildingState = {
  allBuildings: [],
  noDeletedBuildings: [],
}

const buildingSlices = createSlice({
  name: 'building',
  initialState,
  reducers: {
    setAllBuilding: (state, action: PayloadAction<ObjectBuilding[] | []>) => {
      state.allBuildings = action.payload;
    },
    setNoDeletedBuildings: (state, action: PayloadAction<ObjectBuilding[] | []>) => {
      state.noDeletedBuildings = action.payload;
    }
  }
});


export const { setAllBuilding, setNoDeletedBuildings } = buildingSlices.actions;

export default buildingSlices.reducer;

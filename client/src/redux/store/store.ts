import { legacy_createStore as createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducer/reducer';
import { configureStore } from "@reduxjs/toolkit";
import { BuildingAction, InitialState } from '../reducer/typeActions';
import { DispatchType } from '../reducer/typeActions';

declare global {
    interface Window {
      REDUX_DEVTOOLS_EXTENSION_COMPOSE?: typeof compose;
    }
  }

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store: Store<InitialState, BuildingAction> & {dispatch: DispatchType} = createStore(
    userReducer,
    composeEnhancers(applyMiddleware(thunk))
    );
    export default store;
    


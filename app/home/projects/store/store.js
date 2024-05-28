import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const initialState = {
  selectedProducts: 'all',
  coords: [],
  searchString: '',
  sideMenuOpen: false,
  headerReduced: false,
  pageSize: {width: 0, height: 0}
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSelectedProducts: (state, action) => ({...state,selectedProducts:action.payload}),
    setSearchString: (state, action) => ({...state, searchString: action.payload}),
    toggleSideMenu: (state, action) => {
      return {...state, sideMenuOpen: !state.sideMenuOpen }
    },
    setHeaderReduced: (state, action) => ({...state, headerReduced: action.payload}),
    setPageSize:(state, action) => ({...state, pageSize: action.payload}),
    setCoords:(state, action) => ({...state, coords:action.payload})

  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.main
      };
    })
  }
});

export const makeStore = () => configureStore({
  reducer: {
    [mainSlice.name]: mainSlice.reducer
  }
});

export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();
export const wrapper = createWrapper(makeStore);
export const { setSelectedProducts, setCoords, setSearchString, toggleSideMenu, setHeaderReduced, setPageSize } = mainSlice.actions;

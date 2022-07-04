import { createSlice } from "@reduxjs/toolkit"; 

const Search = createSlice({
    name : 'search',
    initialState : {
        searchGlobalC : [],
        searchGlobalJ : [],

        searchSeekers : [],
        searchSeekersC : []

    },
    reducers : {
        ssearchGlobalC : (state, action) => {
            state.searchGlobalC = action.payload;
        },
        ssearchGlobalJ : (state, action) => {
            state.searchGlobalJ = action.payload;
        },
        ssearchSeekers : (state, action) => {
            state.searchSeekers = action.payload;
        },
        ssearchSeekersC : (state, action) => {
            state.searchSeekersC = action.payload;
        }
        
    }
})

export const {ssearchGlobalC, ssearchGlobalJ, ssearchSeekers, ssearchSeekersC} = Search.actions;
export default Search.reducer;
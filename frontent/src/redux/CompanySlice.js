// import React from 'react'
// import { createSlice } from '@reduxjs/toolkit'
// const companySlice = createSlice({
//     name : 'company',
//     initialState  : {
//         singleCompany : null,
//         allCompanies : null,
//         editCompany : true,
//         searchCompanyByText : ""
//     },
//     reducers : {
//         setSingleCompany : (state , action)=>{
//             state.singleCompany = action.payload;
//         },
//         setAllCompanies : (state , action) =>{
//             state.allCompanies = action.payload;
//         },
//         setEditCompany : (state , action) =>{
//             state.editCompany = action.payload;
//         },
//         setSearchCompanyByText : (state , action) => {
//             state.searchCompanyByText =action.payload;
//         }
//     }
// });
// export const {  setSearchCompanyByText , setEditCompany,setSingleCompany , setAllCompanies} = companySlice.actions;
// export default companySlice.reducer;
import { createSlice } from '@reduxjs/toolkit'

const companySlice = createSlice({
    name: 'company',
    initialState: {
        singleCompany: null,
        allCompanies: null,
        editCompany: true,
        searchCompanyByText: ""
    },
    reducers: {
        setSingleCompany: (state, action) => { state.singleCompany = action.payload; },
        setAllCompanies: (state, action) => { state.allCompanies = action.payload; },
        setEditCompany: (state, action) => { state.editCompany = action.payload; },
        setSearchCompanyByText: (state, action) => { state.searchCompanyByText = action.payload; },
        // ■ NEW: Action to clear data on logout
        clearAllCompanyData: (state) => {
            state.singleCompany = null;
            state.allCompanies = null;
            state.editCompany = true;
            state.searchCompanyByText = "";
        }
    }
});

export const { setSearchCompanyByText, setEditCompany, setSingleCompany, setAllCompanies, clearAllCompanyData } = companySlice.actions;
export default companySlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";
// const userSlice  = createSlice({
//     name : 'user',
//     initialState :{
//         user : null,
//         loading : false,
//         editUserProfile : true
//     },
//     reducers : {
//         setUserSlice : (state , action)=>{
//             state.user = action.payload;
//         },
//         setLoading : (state , action)=>{
//             state.loading = action.payload
//         },
//         setEditUserProfile : (state , action)=>{
//             state.editUserProfile = action.payload ;
//         }
//     }
// });
// export const { setEditUserProfile , setUserSlice , setLoading} = userSlice.actions;
// export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        editUserProfile: true,
        interviewUpdateFlag: false, // ■ NEW: Triggers refetch for interviews
    },
    reducers: {
        setUserSlice: (state, action) => { state.user = action.payload; },
        setLoading: (state, action) => { state.loading = action.payload; },
        setEditUserProfile: (state, action) => { state.editUserProfile = action.payload; },
        // ■ NEW: Toggle this flag to force UpcomingInterviews to refetch
        toggleInterviewUpdate: (state) => { 
            state.interviewUpdateFlag = !state.interviewUpdateFlag; 
        }
    }
});

export const { setEditUserProfile, setUserSlice, setLoading, toggleInterviewUpdate } = userSlice.actions;
export default userSlice.reducer;
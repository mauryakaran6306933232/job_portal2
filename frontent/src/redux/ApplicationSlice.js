import { createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applicants: null, // This is where the Kanban board will read from
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        }
    }
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
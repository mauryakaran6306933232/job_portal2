
// import { createSlice } from "@reduxjs/toolkit";

// const jobSlice = createSlice({
//     name: 'job',
//     initialState: {
//         jobs: null,
//         singleJob: null,
//         allAdminJobs: [],
//         appliedJob: null,
//         searchJobByText: "",
//     },
//     reducers: {
//         setJob: (state, action) => { state.jobs = action.payload; },
//         setSingleJob: (state, action) => { state.singleJob = action.payload; },
//         setAppliedJob: (state, action) => { state.appliedJob = action.payload; },
//         setAllAdminJobs: (state, action) => { state.allAdminJobs = action.payload; },
//         setSearchJobByText: (state, action) => { state.searchJobByText = action.payload },
//         // ■ NEW: Action to clear data on logout so the next user doesn't see it!
//         clearAllJobData: (state) => {
//             state.jobs = null;
//             state.singleJob = null;
//             state.allAdminJobs = [];
//             state.appliedJob = null;
//             state.searchJobByText = "";
//         }
//     }
// });

// export const { setSearchJobByText, setAllAdminJobs, setJob, setSingleJob, setAppliedJob, clearAllJobData } = jobSlice.actions;
// export default jobSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        jobs: null,
        singleJob: null,
        allAdminJobs: [],
        appliedJob: null,
        searchJobByText: "",
        jobListUpdateFlag: false, // ■ NEW: Triggers refetch when a new job is posted
    },
    reducers: {
        setJob: (state, action) => { state.jobs = action.payload; },
        setSingleJob: (state, action) => { state.singleJob = action.payload; },
        setAppliedJob: (state, action) => { state.appliedJob = action.payload; },
        setAllAdminJobs: (state, action) => { state.allAdminJobs = action.payload; },
        setSearchJobByText: (state, action) => { state.searchJobByText = action.payload },
        clearAllJobData: (state) => {
            state.jobs = null;
            state.singleJob = null;
            state.allAdminJobs = [];
            state.appliedJob = null;
            state.searchJobByText = "";
        },
        // ■ NEW: Toggle this flag to force useGetAllJobs to refetch
        toggleJobListUpdate: (state) => { 
            state.jobListUpdateFlag = !state.jobListUpdateFlag; 
        },
        // ■ NEW: Update the specific application status in the tracker instantly
        updateAppliedJobStatus: (state, action) => {
            const { jobId, status } = action.payload;
            const app = state.appliedJob?.find(app => app.job?._id === jobId);
            if (app) {
                app.status = status;
            }
        }
    }
});

export const { 
    setSearchJobByText, setAllAdminJobs, setJob, setSingleJob, setAppliedJob, 
    clearAllJobData, toggleJobListUpdate, updateAppliedJobStatus 
} = jobSlice.actions;

export default jobSlice.reducer;
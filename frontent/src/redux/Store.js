// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // uses localStorage by default
// import companyReducer from './CompanySlice'
// import userReducer from './userSlice';
// import jobReducer from './JobSlice';

// // Step 1: Create root reducer
// const rootReducer = combineReducers({
//   user: userReducer,
//   jobs: jobReducer,
//   company : companyReducer
// });

// // Step 2: Configure persist
// const persistConfig = {
//   key: 'root',
//   storage,
  
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Step 3: Configure store with persisted reducer
// const Store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Required by redux-persist
//     }),
// });

// // Step 4: Create persistor
// export const persistor = persistStore(Store);
// export default Store;
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage by default
import companyReducer from './CompanySlice';
import userReducer from './userSlice';
import jobReducer from './JobSlice';
import applicationReducer from './ApplicationSlice'; // 🔥 NEW IMPORT

// Step 1: Create root reducer
const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobReducer,
  company: companyReducer,
  application: applicationReducer // 🔥 ADDED APPLICATION REDUCER HERE
});

// Step 2: Configure persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 3: Configure store with persisted reducer
const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required by redux-persist
    }),
});

// Step 4: Create persistor
export const persistor = persistStore(Store);
export default Store;
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Import some reducers/slices 

const rootReducer = combineReducers({
  //  Add imported reducers below to include them in the store.
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Allow Date object in store
          ignoredActions: ["datetime/setDatetime"],
          ignoredPaths: ["datetime"],
        },
      }),
    preloadedState,
  });
};

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;

export default store;

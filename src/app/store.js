import { configureStore } from '@reduxjs/toolkit';
import memoryReducer from '../features/memory/memorySlice';
import memory from '../features/memory/memoryMiddleware';

export const store = configureStore({
  reducer: {
    memory: memoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(memory),
});

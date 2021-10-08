import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import galleryReducer from "../features/gallery/gallerySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    gallery: galleryReducer,
  },
});

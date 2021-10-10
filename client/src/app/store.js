import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "../features/gallery/gallerySlice";

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});

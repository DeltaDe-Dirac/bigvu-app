import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageList: [],
  itemIndex: -1,
  status: "idle",
  message: "",
  imageSrc: "",
  userText: "",
};

export const getImageListAsync = createAsyncThunk("gallery/fetchImageList", async (endpoint) => {
  const res = await fetch("/callExApi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: endpoint }),
  });
  const data = await res.json();

  return data;
});

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,

  reducers: {
    setImageSource: (state, action) => {
      state.imageSrc = action.payload;
      state.status = "loading";
    },
    setImageLoaded: (state) => {
      state.status = "idle";
    },
    setSelectedItem: (state, action) => {
      state.itemIndex = action.payload;
    },
    setUserText: (state, action) => {
      state.userText = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getImageListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getImageListAsync.fulfilled, (state, action) => {
        state.status = "idle";

        if (Array.isArray(action.payload)) {
          state.imageList = action.payload;
        } else if (action.payload.message) {
          console.warn(action.payload.message);
          state.message = action.payload.message;
        }
      });
  },
});

export const { setImageLoaded, setImageSource, setSelectedItem, setUserText } = gallerySlice.actions;
// ------------------------------------------------------------------------------------------

export const selectIndex = (state) => state.gallery.itemIndex;
export const selectImgList = (state) => state.gallery.imageList;
export const selectImgSrc = (state) => state.gallery.imageSrc;
export const selectStatus = (state) => state.gallery.status;
export const selectUserText = (state) => state.gallery.userText;

export default gallerySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageList: [],
  value: 0,
  itemIndex: -1,
  status: "idle",
  message: "",
  imageSrc: "", //https://bigvu-interviews-assets.s3.amazonaws.com/images/Daisi.png
};

export const getImageListAsync = createAsyncThunk("gallery/fetchImageList", async (endpoint) => {
  // console.log("gallery/fetchImageList", endpoint);
  const res = await fetch("/test", {
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
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getImageListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getImageListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += 2;
        if (Array.isArray(action.payload)) {
          state.imageList = action.payload;
        } else if (action.payload.message) {
          console.warn(action.payload.message);
          state.message = action.payload.message;
        }
      });
  },
});

export const { increment, decrement, setImageLoaded, setImageSource, setSelectedItem } = gallerySlice.actions;
// ------------------------------------------------------------------------------------------

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGallery = (state) => state.gallery.value;
export const selectIndex = (state) => state.gallery.itemIndex;
export const selectImgList = (state) => state.gallery.imageList;
export const selectImgSrc = (state) => state.gallery.imageSrc;
export const selectStatus = (state) => state.gallery.status;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectGallery(getState());
  if (currentValue % 2 === 1) {
    // dispatch(incrementByAmount(amount));
  }
};

export default gallerySlice.reducer;

import "./ImageDisplayer.scss";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setImageLoaded, selectStatus } from "../../../features/gallery/gallerySlice";
import { Image } from "react-bootstrap";

const ImageDisplayer = ({ src }) => {
  const dispatch = useDispatch();
  const imageStatus = useSelector(selectStatus);

  return (
    <Image
      className={imageStatus === "loading" ? "hideImage" : ""}
      src={src}
      fluid
      onLoad={() => dispatch(setImageLoaded())}
    />
  );
};

export default ImageDisplayer;

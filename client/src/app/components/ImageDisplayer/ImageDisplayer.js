import styles from "./ImageDisplayer.module.scss";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setImageLoaded, selectStatus } from "../../../features/gallery/gallerySlice";
import { Image } from "react-bootstrap";

const ImageDisplayer = ({ src }) => {
  const dispatch = useDispatch();
  const imageStatus = useSelector(selectStatus);

  return (
    <>
      <Image
        className={imageStatus === "loading" ? styles.displayNone : ""}
        src={src}
        fluid
        onLoad={() => dispatch(setImageLoaded())}
      />
      <div className={imageStatus === "loading" ? styles.loader : ""}></div>
    </>
  );
};

export default ImageDisplayer;

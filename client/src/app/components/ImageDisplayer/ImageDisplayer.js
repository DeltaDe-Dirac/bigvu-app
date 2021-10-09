import styles from "./ImageDisplayer.module.scss";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setImageLoaded, selectStatus, selectIndex } from "../../../features/gallery/gallerySlice";
import { Image } from "react-bootstrap";

const ImageDisplayer = ({ src, width, height }) => {
  // console.log(src);
  const canvasRef = useRef();
  const imageRef = useRef();
  const dispatch = useDispatch();
  const imageStatus = useSelector(selectStatus);
  const selectedItem = useSelector(selectIndex);

  const handleOnLoad = () => {
    dispatch(setImageLoaded());
    console.log(canvasRef);
    let ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(imageRef.current, 10, 10);
  };

  return (
    <>
      <div className={imageStatus === "loading" ? styles.loader : ""}>
        <canvas
          ref={canvasRef}
          className={
            imageStatus === "loading" || selectedItem === -1 ? styles.displayTransparent : styles.displayBlueCanvas
          }
          width="640"
          height="360"
        >
          Your browser does not support the HTML canvas tag.
        </canvas>
      </div>
      <div>
        <Image ref={imageRef} className={styles.displayNone} src={src} fluid onLoad={() => handleOnLoad()} />
      </div>
    </>
  );
};

export default ImageDisplayer;

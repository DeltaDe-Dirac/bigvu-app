import styles from "./ImageDisplayer.module.scss";
import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setImageLoaded, selectStatus, selectIndex, selectUserText } from "../../../features/gallery/gallerySlice";

const ImageDisplayer = ({ src, width, height, imgOffsetX, imgOffsetY }) => {
  // console.log(src);
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const imageStatus = useSelector(selectStatus);
  const selectedItem = useSelector(selectIndex);
  const inputText = useSelector(selectUserText);

  // --------------- FUNCTOINS ---------------
  // --------------- FUNCTOINS ---------------

  // --------------- REACT HOOKS ---------------
  const memoizedCallback = useCallback(() => {
    // console.log(canvasRef);
    let ctx = canvasRef.current.getContext("2d");
    // ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const image = new Image();
    image.src = src;
    image.onload = () => {
      ctx.drawImage(image, 10, 10);
      ctx.font = "50px Arial";
      ctx.fillText(inputText, 10, 100);
      // ctx.textAlign = "center";
      dispatch(setImageLoaded());
    };

    // console.log(ctx.measureText(text));
    console.log("handleOnLoad");
  }, [inputText, src, dispatch]);

  useEffect(() => {
    memoizedCallback();
  }, [memoizedCallback]);
  // --------------- REACT HOOKS ---------------

  // --------------- DOCUMENT ---------------
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
    </>
  );
};
// --------------- DOCUMENT ---------------

export default ImageDisplayer;

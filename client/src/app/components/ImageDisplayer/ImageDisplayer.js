import styles from "./ImageDisplayer.module.scss";
import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setImageLoaded, selectStatus, selectIndex, selectUserText } from "../../../features/gallery/gallerySlice";

const ImageDisplayer = ({ src, width, height, borderWidth, frameColor }) => {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const imageStatus = useSelector(selectStatus);
  const selectedItem = useSelector(selectIndex);
  const inputText = useSelector(selectUserText);

  // --------------- FUNCTIONS ---------------
  const canvasStyle = () => {
    if (imageStatus === "loading" || selectedItem === -1) {
      if (frameColor === "white") {
        return styles.whiteTransparent;
      } else {
        return styles.blueTransparent;
      }
    } else if (frameColor === "white") {
      return styles.whiteCanvas;
    }
    return styles.blueCanvas;
  };
  // --------------- FUNCTIONS ---------------

  // --------------- REACT HOOKS ---------------
  const memoizedCallback = useCallback(() => {
    let ctx = canvasRef.current.getContext("2d");
    let yPos = 60;
    const yStep = 60;
    const metrics = {
      sx: width / 3,
      sy: 0,
      sWidth: width,
      sHeight: height,
      xStretch: width,
      yStretch: height + 2 * borderWidth,
    };

    ctx.clearRect(metrics.sWidth - metrics.sx, 0, canvasRef.current.width, canvasRef.current.height);

    const image = new Image();
    image.src = src;
    image.onload = () => {
      ctx.drawImage(
        image,
        metrics.sx,
        metrics.sy,
        metrics.sWidth,
        metrics.sHeight,
        0,
        0,
        metrics.xStretch,
        metrics.yStretch
      );

      ctx.font = "bold 40px Verdana, sans-serif";
      const wordsArr = inputText.split(" ");
      let line = "";
      const linesArr = [];

      wordsArr.forEach((word) => {
        if (ctx.measureText(line + word + " ").width < metrics.sx) {
          line += word + " ";
        } else if (ctx.measureText(word).width < metrics.sx) {
          linesArr.push(line);
          line = word + " ";
        }
      });

      linesArr.push(line);
      linesArr.forEach((line) => {
        if (line && yPos < height) {
          ctx.fillText(line, metrics.sWidth - metrics.sx + borderWidth, yPos);
          yPos += yStep;
        }
      });

      dispatch(setImageLoaded());
    };
  }, [inputText, src, dispatch, width, height, borderWidth]);

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
          className={canvasStyle()}
          width={width + 2 * borderWidth}
          height={height + 2 * borderWidth}
        >
          Your browser does not support the HTML canvas tag.
        </canvas>
      </div>
    </>
  );
};
// --------------- DOCUMENT ---------------

export default ImageDisplayer;

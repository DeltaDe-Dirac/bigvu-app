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
      ctx.drawImage(image, imgOffsetX, imgOffsetY);
      ctx.font = "50px Verdana, sans-serif";

      const wordsArr = inputText.split(" ");
      let line = "";
      let yPos = 60;
      const yStep = 60;

      const linesArr = [];
      wordsArr.forEach((word) => {
        if (ctx.measureText(line + word + " ").width < width - imgOffsetX * 2) {
          line += word + " ";
        } else if (ctx.measureText(word).width < width - imgOffsetX * 2) {
          linesArr.push(line);
          line = word + " ";
        }
      });
      linesArr.push(line);

      linesArr.forEach((line) => {
        if (yPos < height) {
          ctx.fillText(line, imgOffsetX, yPos);
          yPos += yStep;
        }
      });

      // ctx.textAlign = "center";
      dispatch(setImageLoaded());
    };
  }, [inputText, src, dispatch, width, height, imgOffsetX, imgOffsetY]);

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
          width={width}
          height={height}
        >
          Your browser does not support the HTML canvas tag.
        </canvas>
      </div>
    </>
  );
};
// --------------- DOCUMENT ---------------

export default ImageDisplayer;

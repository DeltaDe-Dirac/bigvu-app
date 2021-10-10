import "./Gallery.module.scss";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getImageListAsync, selectImgList, selectImgSrc } from "./gallerySlice";
import NavTab from "../../app/components/NavTab/NavTab";
import ImageSelector from "../../app/components/ImageSelector/ImageSelector";
import ImageDisplayer from "../../app/components/ImageDisplayer/ImageDisplayer";

export function Gallery({ frameColor }) {
  const imageList = useSelector(selectImgList);
  const imageSource = useSelector(selectImgSrc);
  const dispatch = useDispatch();
  const metrics = { imgWidth: 620, imgHeight: 340, borderWidth: 10 };

  useEffect(() => {
    dispatch(getImageListAsync("https://bigvu-interviews-assets.s3.amazonaws.com/presenters.json"));
  }, [dispatch]);

  return (
    <>
      <NavTab frameColor={frameColor}></NavTab>
      <ImageSelector itemList={imageList}></ImageSelector>
      <ImageDisplayer
        src={imageSource}
        width={metrics.imgWidth}
        height={metrics.imgHeight}
        borderWidth={metrics.borderWidth}
        frameColor={frameColor}
      ></ImageDisplayer>
    </>
  );
}

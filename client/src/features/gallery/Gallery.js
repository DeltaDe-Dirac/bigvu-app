import "./Gallery.module.scss";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getImageListAsync, selectImgList } from "./gallerySlice";
import NavTab from "../../app/components/NavTab/NavTab";
import ImageSelector from "../../app/components/ImageSelector/ImageSelector";

export function Gallery() {
  const imageList = useSelector(selectImgList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImageListAsync("https://bigvu-interviews-assets.s3.amazonaws.com/presenters.json"));
  }, [dispatch]);

  return (
    <>
      <NavTab></NavTab>
      <ImageSelector itemList={imageList.map((obj) => obj.name)}></ImageSelector>
    </>
  );
}
import "./ImageDisplayer.scss";
import React from "react";
import { Image } from "react-bootstrap";

const ImageDisplayer = ({ src }) => {
  return <Image src={src} fluid />;
};

export default ImageDisplayer;

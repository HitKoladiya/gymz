"use client";
import React from "react";
import { DynamicStar } from "react-dynamic-star";
const RatingStars = (props: { rating: number }) => {
  return (
    <DynamicStar
      rating={props.rating}
      outlined={true}
      sharpnessStar={2}
      width={30}
      fullStarColor={"#fca311"}
      outlineWidth={2}
    />
  );
};

export default RatingStars;

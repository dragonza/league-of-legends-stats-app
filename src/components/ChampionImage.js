import React from "react";
// import champion1 from 'resources/images/champion1.png';

import { championsMapByKey } from "../containers/HomePage/staticData";
const ChampionImage = ({ championId, size }) => {

  const champion = championsMapByKey[championId];
  const imageSize = size === 'large' ? '' : 'tiny_';
  const ratio = size === 'large' ? 1 : 2;
  const imageUrl = require(`../resources/images/${imageSize}${champion.image.sprite}`);
  const objectPosition = `-${champion.image.x / ratio }px -${champion.image.y / ratio}px`;
  return (
    <img
      alt="champion"
      style={{
        objectFit: "none",
        objectPosition: objectPosition
      }}
      src={imageUrl}
      width={champion.image.w / ratio}
      height={champion.image.h / ratio}
    />
  );
};

export default ChampionImage;

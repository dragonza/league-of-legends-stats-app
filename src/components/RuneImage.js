import React from "react";
// import champion1 from 'resources/images/champion1.png';

import { runeMapByKey } from "../containers/HomePage/staticData";
const RuneImage = ({ runeId }) => {
  const item = runeMapByKey[runeId];
  if (!item) return null;
  const imageUrl = `http://ddragon.leagueoflegends.com/cdn/img/${item.icon}`;
  return (
    <img
      alt="rune"
      // style={{
      //   objectFit: "none",
      //   objectPosition: objectPosition
      // }}
      src={imageUrl}
      width={24}
      height={24}
    />
  );
};

export default RuneImage;

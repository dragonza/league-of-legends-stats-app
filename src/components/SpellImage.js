import React from "react";
// import champion1 from 'resources/images/champion1.png';

import { spellMapByKey } from "../containers/HomePage/staticData";
const SpellImage = ({ spellId }) => {
  const item = spellMapByKey[spellId];
  if (!item) return null;
  const objectPosition = `-${item.sprite.x / 2}px -${item.sprite.y /2 }px`;
  return (
    <img
      alt="rune"
      style={{
        objectFit: "none",
        objectPosition: objectPosition
      }}
      src={item.sprite.url}
      width={24}
      height={24}
    />
  );
};

export default SpellImage;

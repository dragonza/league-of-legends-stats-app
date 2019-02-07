import React from "react";
// import champion1 from 'resources/images/champion1.png';

import { itemMapByKey } from "../containers/HomePage/staticData";
const ItemImage = ({ itemId }) => {
  const item = itemMapByKey[itemId];
  if (!item) return null;
  const imageUrl = require(`../resources/images/small_${item.image.sprite}`);
  const objectPosition = `-${item.image.x * 3 / 4 }px -${item.image.y  * 3 / 4 }px`;
  return (
    <img
      alt="item"
      style={{
        objectFit: "none",
        objectPosition: objectPosition
      }}
      src={imageUrl}
      width={item.image.w  * 3 / 4 }
      height={item.image.h  * 3 / 4 }
    />
  );
};

export default ItemImage;

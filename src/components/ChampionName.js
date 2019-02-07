import React from "react";
// import champion1 from 'resources/images/champion1.png';

import { championsMapByKey } from "../containers/HomePage/staticData";
const ChampionName = ({ championId }) => {
  const champion = championsMapByKey[championId];
  return (
    <span>{champion.name}</span>
  );
};

export default ChampionName;

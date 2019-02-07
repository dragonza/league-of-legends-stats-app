import React from "react";
// import champion1 from 'resources/images/champion1.png';

import { spellMapByKey } from "../containers/HomePage/staticData";
const SpellName = ({ spellId }) => {
  const spell = spellMapByKey[spellId];
  if (!spell) return null;
  return (
    <span className="spell-name">{spell.name}</span>
  );
};

export default SpellName;

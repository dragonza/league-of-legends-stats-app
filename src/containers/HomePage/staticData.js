import { normalize, schema } from 'normalizr';
import championData from '../../resources/data/champion';
import itemData from '../../resources/data/item';
import spellsData from '../../resources/data/spells';
import runesData from  '../../resources/data/runesReforged';
import { groupArrayByName } from "../../utils/arrayHelper";


const subRuneSchema = new schema.Entity('subRunes');
const slotSchema = new schema.Entity('slots', {
  runes: [subRuneSchema]
});
const runeSchema = new schema.Entity('mainRunes', {
  slots: [slotSchema]
});
const runeListSchema = [runeSchema];
const normalizedData = normalize(runesData, runeListSchema).entities;
const runeMapByKey = {
  ...normalizedData.mainRunes,
  ...normalizedData.subRunes,
};

const championsMapByKey = groupArrayByName(Object.values(championData.data), 'key');
const spellMapByKey = groupArrayByName(spellsData, 'key');
const itemMapByKey = itemData.data;
export {
  championsMapByKey,
  itemMapByKey,
  spellMapByKey,
  runeMapByKey,
}

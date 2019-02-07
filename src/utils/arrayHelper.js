export function groupArrayByName(array, name) {
  if (!array.length || name === undefined) return [];
  const map = {};
  array.forEach(item => {
    map[item[name]] = item
  });
  return map;
}

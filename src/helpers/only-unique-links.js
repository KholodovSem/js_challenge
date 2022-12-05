export default function onlyUniqLinks(arr) {
  const normalizeLinks = arr.map(el => {
    if (!el.endsWith('/')) {
      return el + '/';
    }
    return el;
  });
  const uniqLinks = new Set(normalizeLinks);
  return Array.from(uniqLinks);
}
export function toCurrentColor(svg: string) {
  if (!svg) return svg;
  return svg
    .replace(/fill="#121212"/gi, 'fill="currentColor"')
    .replace(/stroke="#121212"/gi, 'stroke="currentColor"')
    .replace(/fill="#000000"/gi, 'fill="currentColor"')
    .replace(/stroke="#000000"/gi, 'stroke="currentColor"');
}

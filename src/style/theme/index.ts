export const color = {
  shadow: 'rgba(0, 0, 0, 0.2)',
  darkShadow: 'rgba(0,0,0,0.8)',

  black: '#0e100f',
  white: '#ffffff',
  gray: '#A0A0A0',
  red: '#eb2f06',
};

export const media = {
  mobile: '767px',
  tablet: '1120px',
  notebook: '1680px',
};

export const font = (px: number) => {
  return `${px / 16}rem`;
};

export type ColorType = typeof color;
export type MediaType = typeof media;
export type FontType = typeof font;

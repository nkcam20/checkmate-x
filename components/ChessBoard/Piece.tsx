import React from 'react';
import Svg, { Path, G, Circle, Rect, Ellipse } from 'react-native-svg';

const PieceSVG: Record<string, (size: number) => React.JSX.Element> = {
  wP: (size) => (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round">
        <Path d="M22 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38-1.95 1.12-3.28 3.21-3.28 5.62 0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
      </G>
    </Svg>
  ),
  bP: (size) => (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
        <Path d="M22 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38-1.95 1.12-3.28 3.21-3.28 5.62 0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
      </G>
    </Svg>
  ),
  wN: (size) => (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
        <Path d="M24 18c.38 2.43-4.66 2.01-5 0" />
        <Path d="M9.5 25.5A.5.5 0 1 1 9 25.5a.5.5 0 1 1 .5 0" />
        <Path d="M15 15.5c4.5 2 5 2 5 2 3 0 5-2 5-2" />
        <Path d="M15 16s4.5 2 5 2c3 0 5-2 5-2" />
      </G>
    </Svg>
  ),
  bN: (size) => (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
        <Path d="M24 18c.38 2.43-4.66 2.01-5 0" />
        <Path d="M9.5 25.5A.5.5 0 1 1 9 25.5a.5.5 0 1 1 .5 0" />
        <Path d="M15 15.5c4.5 2 5 2 5 2 3 0 5-2 5-2" />
        <Path d="M15 16s4.5 2 5 2c3 0 5-2 5-2" />
      </G>
    </Svg>
  ),
  wB: (size) => (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 0 5-2.25 5h-22.5c-2.25 0-2.25-5-2.25-5z" />
        <Path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
        <Path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" />
      </G>
    </Svg>
  ),
  bB: (size) => (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 0 5-2.25 5h-22.5c-2.25 0-2.25-5-2.25-5z" />
        <Path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
        <Path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" />
      </G>
    </Svg>
  ),
  wR: (size) => (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M9 39h27v-3H9v3zM12 36l1.5-21h18l1.5 21H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" />
        <Path d="M34 14l.33-7H10.67l.33 7" strokeLinecap="butt" />
        <Path d="M31 17H14M31 21H14M31 25H14M31 29H14M31 33H14" fill="none" stroke="#000" strokeWidth="1" />
      </G>
    </Svg>
  ),
  bR: (size) => (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M9 39h27v-3H9v3zM12 36l1.5-21h18l1.5 21H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" />
        <Path d="M34 14l.33-7H10.67l.33 7" strokeLinecap="butt" />
        <Path d="M31 17H14M31 21H14M31 25H14M31 29H14M31 33H14" fill="none" stroke="#fff" strokeWidth="1" />
      </G>
    </Svg>
  ),
  wQ: (size) => (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM11 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM38 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" />
        <Path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11 2 12z" />
        <Path d="M9 26c0 2 1.5 2 2.5 4 2.5 4 2.5 5 13.5 5s11-1 13.5-5c1-2 2.5-2 2.5-4h-32z" />
        <Path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" />
      </G>
    </Svg>
  ),
  bQ: (size) => (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM11 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM38 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" />
        <Path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11 2 12z" />
        <Path d="M9 26c0 2 1.5 2 2.5 4 2.5 4 2.5 5 13.5 5s11-1 13.5-5c1-2 2.5-2 2.5-4h-32z" />
        <Path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" />
      </G>
    </Svg>
  ),
  wK: (size) => (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M22.5 11.63V6M20 8h5" stroke="#000" />
        <Path d="M22.5 25s4.5-7.5 4.5-11c0-2.48-2.02-4.5-4.5-4.5s-4.5 2.02-4.5 4.5c0 3.5 4.5 11 4.5 11z" fill="#fff" />
        <Path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-1-4-1-4 0-4-3.5-7.5-7.5-7.5-4 0-7.5 3.5-7.5 7.5l-.5 4.5L21 20l-.5-4.5c0-4-3.5-7.5-7.5-7.5-4 0-7.5 3.5-7.5 7.5 0 0 3 3-1 4-3 6.5 6 11 6 11v7z" fill="#fff" />
        <Path d="M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0" />
      </G>
    </Svg>
  ),
  bK: (size) => (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M22.5 11.63V6M20 8h5" stroke="#fff" />
        <Path d="M22.5 25s4.5-7.5 4.5-11c0-2.48-2.02-4.5-4.5-4.5s-4.5 2.02-4.5 4.5c0 3.5 4.5 11 4.5 11z" fill="#000" />
        <Path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-1-4-1-4 0-4-3.5-7.5-7.5-7.5-4 0-7.5 3.5-7.5 7.5l-.5 4.5L21 20l-.5-4.5c0-4-3.5-7.5-7.5-7.5-4 0-7.5 3.5-7.5 7.5 0 0 3 3-1 4-3 6.5 6 11 6 11v7z" fill="#000" />
        <Path d="M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0" />
      </G>
    </Svg>
  ),
};

const Piece = ({ type, color, size }: { type: string, color: string, size: number }) => {
    const key = `${color}${type.toUpperCase()}`;
    return PieceSVG[key] ? PieceSVG[key](size * 0.9) : null;
};
export default Piece;

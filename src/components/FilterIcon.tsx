import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const FilterIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#clip0_8_1649)">
      <Path
        d="M19.9101 9H4.09009"
        stroke="#EB4D2A"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.202 13.036V17.796C15.202 18.468 14.822 19.085 14.219 19.385L11.371 20.809C10.189 21.401 8.799 20.541 8.799 19.22V13.036L4.692 9.868C4.256 9.531 4 9.012 4 8.46V5.778C4 4.796 4.796 4 5.778 4H18.222C19.204 4 20 4.796 20 5.778V8.46C20 9.011 19.744 9.53 19.308 9.868L15.202 13.036Z"
        stroke="#EB4D2A"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_8_1649">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FilterIcon;
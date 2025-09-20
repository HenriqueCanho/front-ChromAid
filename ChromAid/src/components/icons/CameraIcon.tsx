import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors } from '@/theme/tokens';

type CameraIconProps = {
  size?: number;
};

export const CameraIcon = ({ size = 22 }: CameraIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3}
      y={5}
      width={18}
      height={14}
      rx={4}
      stroke={colors.surface}
      strokeWidth={1.8}
    />
    <Path
      d="M9 5.5L10 4C10.3 3.4 10.9 3 11.6 3H12.4C13.1 3 13.7 3.4 14 4L15 5.5"
      stroke={colors.surface}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Circle cx={12} cy={12} r={3.4} stroke={colors.surface} strokeWidth={1.8} />
    <Circle cx={16.8} cy={8.4} r={1} fill={colors.surface} />
  </Svg>
);

import Svg, { Path } from 'react-native-svg';

import { colors } from '@/theme/tokens';

type SparkleIconProps = {
  size?: number;
};

export const SparkleIcon = ({ size = 22 }: SparkleIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3L13.6 8.4L19 10L13.6 11.6L12 17L10.4 11.6L5 10L10.4 8.4L12 3Z"
      fill={colors.textPrimary}
      opacity={0.86}
    />
    <Path d="M5 18L5.6 20L7.6 20.6L5.6 21.2L5 23L4.4 21.2L2.4 20.6L4.4 20L5 18Z" fill={colors.textPrimary} opacity={0.6} />
    <Path d="M19 16L19.8 18.8L22.6 19.6L19.8 20.4L19 23.2L18.2 20.4L15.4 19.6L18.2 18.8L19 16Z" fill={colors.textPrimary} opacity={0.6} />
  </Svg>
);

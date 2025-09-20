import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '@/theme/tokens';

type LogoMarkProps = {
  size?: number;
};

const toRadians = (degrees: number) => (Math.PI / 180) * degrees;

const createSegmentPath = (
  startAngle: number,
  endAngle: number,
  radius: number,
  cx: number,
  cy: number
) => {
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  const startRad = toRadians(startAngle);
  const endRad = toRadians(endAngle);
  const startX = cx + radius * Math.cos(startRad);
  const startY = cy + radius * Math.sin(startRad);
  const endX = cx + radius * Math.cos(endRad);
  const endY = cy + radius * Math.sin(endRad);

  return `M ${cx} ${cy} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
};

export const LogoMark = ({ size = 180 }: LogoMarkProps) => {
  const cx = 100;
  const cy = 100;
  const radius = 55;

  const segments: Array<{ start: number; end: number; fill: string }> = [
    { start: -90, end: -30, fill: colors.accentAqua },
    { start: -30, end: 30, fill: colors.accentGreen },
    { start: 30, end: 90, fill: colors.accentYellow },
    { start: 90, end: 150, fill: colors.accentCoral },
    { start: 150, end: 210, fill: colors.primaryMuted },
    { start: 210, end: 270, fill: colors.accentPurple }
  ];

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" accessibilityRole="image">
      <Circle cx={cx} cy={cy} r={96} fill="#E6EAF3" />
      <Path
        d="M30 100C42 56 74 32 100 32C126 32 158 56 170 100C158 144 126 168 100 168C74 168 42 144 30 100Z"
        fill={colors.surface}
      />
      <Path
        d="M48 100C58 72 79 56 100 56C121 56 142 72 152 100C142 128 121 144 100 144C79 144 58 128 48 100Z"
        fill="#EEF2FC"
      />
      {segments.map(({ start, end, fill }, index) => (
        <Path key={index} d={createSegmentPath(start, end, radius, cx, cy)} fill={fill} />
      ))}
      <Circle cx={cx} cy={cy} r={22} fill={colors.textPrimary} opacity={0.9} />
      <Circle cx={cx} cy={cy} r={10} fill={colors.surface} opacity={0.9} />
      <Path
        d="M44 64L60 64C63 64 66 61 66 58V50"
        stroke={colors.textPrimary}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <Path
        d="M156 64L140 64C137 64 134 61 134 58V50"
        stroke={colors.textPrimary}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <Path
        d="M44 136L60 136C63 136 66 139 66 142V150"
        stroke={colors.textPrimary}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <Path
        d="M156 136L140 136C137 136 134 139 134 142V150"
        stroke={colors.textPrimary}
        strokeWidth={6}
        strokeLinecap="round"
      />
    </Svg>
  );
};

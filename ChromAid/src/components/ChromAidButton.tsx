import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  type PressableStateCallbackType
} from 'react-native';

import { colors, radii, spacing } from '@/theme/tokens';

type ChromAidButtonProps = PressableProps & {
  label: string;
  caption?: string;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
};

export const ChromAidButton = ({
  label,
  caption,
  variant = 'primary',
  icon,
  style,
  disabled,
  ...pressableProps
}: ChromAidButtonProps) => {
  const isPrimary = variant === 'primary';
  const isDisabled = Boolean(disabled);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={(state) => buildStyleLayer({ state, style, disabled: isDisabled, isPrimary })}
      {...pressableProps}
    >
      <View style={styles.content}>
        {icon ? <View style={[styles.icon, isPrimary ? styles.iconPrimary : styles.iconSecondary]}>{icon}</View> : null}
        <View>
          <Text
            style={[
              styles.label,
              isPrimary ? styles.labelPrimary : styles.labelSecondary,
              isDisabled && styles.labelDisabled
            ]}
          >
            {label}
          </Text>
          {caption ? (
            <Text
              style={[
                styles.caption,
                isPrimary ? styles.captionPrimary : styles.captionSecondary,
                isDisabled && styles.captionDisabled
              ]}
            >
              {caption}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

const buildStyleLayer = ({
  state,
  style,
  disabled,
  isPrimary
}: {
  state: PressableStateCallbackType;
  style: ChromAidButtonProps['style'];
  disabled: boolean;
  isPrimary: boolean;
}): StyleProp<ViewStyle> => {
  const layers: Array<StyleProp<ViewStyle>> = [
    styles.base,
    isPrimary ? styles.primary : styles.secondary,
    disabled ? styles.disabled : undefined
  ];

  if (state.pressed && !disabled) {
    layers.push(isPrimary ? styles.primaryPressed : styles.secondaryPressed);
  }

  const providedStyle =
    typeof style === 'function' ? style(state) : (style as StyleProp<ViewStyle> | undefined);

  if (providedStyle) {
    layers.push(providedStyle);
  }

  return layers;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4
  },
  disabled: {
    shadowOpacity: 0
  },
  primary: {
    backgroundColor: colors.primary
  },
  primaryPressed: {
    backgroundColor: '#4F5FD6'
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.outline,
    borderWidth: 1
  },
  secondaryPressed: {
    backgroundColor: '#E4E9F5'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconPrimary: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  iconSecondary: {
    backgroundColor: '#E8ECF7'
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3
  },
  caption: {
    marginTop: spacing.xs,
    fontSize: 13
  },
  labelPrimary: {
    color: colors.surface
  },
  captionPrimary: {
    color: 'rgba(255, 255, 255, 0.85)'
  },
  labelSecondary: {
    color: colors.textPrimary
  },
  captionSecondary: {
    color: colors.textSecondary
  },
  labelDisabled: {
    color: 'rgba(15, 23, 42, 0.4)'
  },
  captionDisabled: {
    color: 'rgba(95, 108, 139, 0.4)'
  }
});

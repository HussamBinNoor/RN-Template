import React from 'react';
import {
  AlertCircle,
  ArrowRight,
  AtSign,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Eye,
  EyeOff,
  FormInput,
  Home,
  Inbox,
  Info,
  LayoutGrid,
  Lock,
  Mail,
  Menu,
  Monitor,
  Moon,
  Palette,
  Search,
  Settings,
  Sparkles,
  Star,
  Sun,
  User,
  X,
  Calendar,
  ListFilter,
  type LucideIcon,
} from 'lucide-react-native';
import { useAppTheme } from '@/providers/ThemeProvider';

/**
 * Map of icon names to their Lucide components. Add new icons here and to the
 * `AppIconName` union to make them type-safe across the app.
 */
export const iconMap = {
  AlertCircle,
  ArrowRight,
  AtSign,
  BookOpen,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Eye,
  EyeOff,
  FormInput,
  Home,
  Inbox,
  Info,
  LayoutGrid,
  ListFilter,
  Lock,
  Mail,
  Menu,
  Monitor,
  Moon,
  Palette,
  Search,
  Settings,
  Sparkles,
  Star,
  Sun,
  User,
  X,
} as const satisfies Record<string, LucideIcon>;

export type AppIconName = keyof typeof iconMap;

export type AppIconProps = {
  name: AppIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  accessibilityLabel?: string;
  style?: { marginRight?: number };
};

export function AppIcon({
  name,
  size,
  color,
  strokeWidth = 2,
  accessibilityLabel,
  style,
}: AppIconProps): React.JSX.Element {
  const theme = useAppTheme();
  const Icon = iconMap[name];
  const computedSize = size ?? theme.layout.iconSize.lg;
  const computedColor = color ?? theme.colors.text;
  return (
    <Icon
      size={computedSize}
      color={computedColor}
      strokeWidth={strokeWidth}
      accessibilityLabel={accessibilityLabel ?? name}
      style={style as never}
    />
  );
}

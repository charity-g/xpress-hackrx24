import {StyleSheet, Text} from 'react-native';
import { Link, type LinkProps} from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ScreenLinkProps = LinkProps & {
  text?: string
  bordercolor?:string;
  color?:string;
};

export function ScreenButton({
  href,
  bordercolor,
  color = '#6BF2E5',
  style,
  text,
  ...rest
}: ScreenLinkProps) {
  const fontcolor = { color: bordercolor? bordercolor:"#ffffff" };
  const buttoncolor = {backgroundColor: color?color:"#fefefe", borderColor: fontcolor['color']};

  return (
    <Link href={href} style={[styles.button, buttoncolor, style]}>
      <Text style={[styles.defaultSemiBold, fontcolor]}>{text}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
   button: {
      borderRadius: 6,
      padding: 20,
      borderWidth: 2,
   },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
});

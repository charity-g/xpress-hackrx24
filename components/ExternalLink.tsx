import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform, StyleSheet} from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string, linkText: string };

export function ExternalLink({ href, linkText, ...rest }: Props) {
  return (
    <Link
      style={styles.link}
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href);
        }
      }}
    >
      {linkText}
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
  padding: "4%",
  color: 'black',
  backgroundColor: '#10fffd'
}
});
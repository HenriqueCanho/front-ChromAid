// src/components/external-link.tsx
import { Link, Href } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import type { ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

export function ExternalLink({ href, ...rest }: Props) {
  if (Platform.OS === 'web') {
    // open in a new tab on web
    return <Link {...rest} href={href} target="_blank" />;
  }

  return (
    <Link
      {...rest}
      href={href}
      onPress={async (e) => {
        e.preventDefault();
        await WebBrowser.openBrowserAsync(href, {
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.POPOVER,
        });
      }}
    />
  );
}

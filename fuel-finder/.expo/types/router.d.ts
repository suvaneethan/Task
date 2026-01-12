/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/../src/utils/preferences`; params?: Router.UnknownInputParams; } | { pathname: `/../src/utils/ThemeContext`; params?: Router.UnknownInputParams; } | { pathname: `/../src/utils/useTheme`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/../src/utils/preferences`; params?: Router.UnknownOutputParams; } | { pathname: `/../src/utils/ThemeContext`; params?: Router.UnknownOutputParams; } | { pathname: `/../src/utils/useTheme`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/../src/utils/preferences${`?${string}` | `#${string}` | ''}` | `/../src/utils/ThemeContext${`?${string}` | `#${string}` | ''}` | `/../src/utils/useTheme${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/../src/utils/preferences`; params?: Router.UnknownInputParams; } | { pathname: `/../src/utils/ThemeContext`; params?: Router.UnknownInputParams; } | { pathname: `/../src/utils/useTheme`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}

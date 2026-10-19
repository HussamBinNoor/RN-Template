import type { LinkingOptions } from '@react-navigation/native';
import type { RootStackParamList } from './types';

/**
 * Deep-linking config — wires URLs to screens.
 * Add more routes as the app grows.
 */
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['hbnrntemplate://', 'https://hbnrntemplate.app'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          Home: '',
          Components: 'components',
          FormExample: 'form',
          Settings: 'settings',
        },
      },
      Details: 'details/:id',
    },
  },
};

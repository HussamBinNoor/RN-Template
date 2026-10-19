import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabsParamList = {
  Home: undefined;
  Components: undefined;
  FormExample: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  Details: { id: string; title?: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

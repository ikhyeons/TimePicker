import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";

export namespace NavigationParam {
  export type all = Auth | Root | Main;

  export type Main = {
    MySchedule: undefined;
    Request: undefined;
    History: undefined;
    Group: undefined;
  };

  export type Root = {
    TabNav: undefined;
    SendRequest: undefined;
    SendResponse: undefined;
  };
  export type Auth = {
    Login: undefined;
    Join: undefined;
  };
}

export type RootSNFC<T extends keyof NavigationParam.Root> = React.FC<
  NativeStackScreenProps<NavigationParam.Root, T>
>;

export type AuthSNFC<T extends keyof NavigationParam.Auth> = React.FC<
  NativeStackScreenProps<NavigationParam.Auth, T>
>;

export type MainBTNFC<T extends keyof NavigationParam.Main> = React.FC<
  MaterialBottomTabScreenProps<NavigationParam.Main, T>
>;

export default {};

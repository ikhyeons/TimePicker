import { NativeStackScreenProps } from "@react-navigation/native-stack";

export namespace NavigationParam {
  export type all = Auth | Root;

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

export type RFC<T extends keyof NavigationParam.Root> = React.FC<
  NativeStackScreenProps<NavigationParam.Root, T>
>;

export type AFC<T extends keyof NavigationParam.Auth> = React.FC<
  NativeStackScreenProps<NavigationParam.Auth, T>
>;

export default {};

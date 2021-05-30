import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { useDispatch } from "react-redux";

import NguoivaoDetailScreen from "../screens/NguoivaoDetailScreen";
import NguoinhaOverviewScreen from "../screens/NguoinhaOverviewScreen";
import NguoilaOverviewScreen from "../screens/NguoilaOverviewScreen";
import AuthScreen from "../screens/AuthScreen";
import * as authActions from "../store/actions/auth";
import Colors from "../constants/Colors";
import StartupScreen from "../screens/StartupScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  headerBackTitleStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const NguoinhaNavigator = createStackNavigator(
  {
    NguoinhaOverview: NguoinhaOverviewScreen,
    NguoivaoDetail: NguoivaoDetailScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const NguoilaNavigator = createStackNavigator(
  {
    NguoilaOverview: NguoilaOverviewScreen,
    NguoivaoDetail: NguoivaoDetailScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);


const NhaNavigator = createDrawerNavigator(
  {
    NguoinhaNavigator: NguoinhaNavigator,
    NguoilaNavigator: NguoilaNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#c6cbef' }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Nha: NhaNavigator,
});

export default createAppContainer(MainNavigator);

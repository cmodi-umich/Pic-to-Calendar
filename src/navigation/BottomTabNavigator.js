import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";

const BottomTab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = "Home";

const tabBarOptions = {
  style: {
    height: 65,
  },
  labelStyle: {
    marginBottom: 15,
  },
};

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  return (
    <BottomTab.Navigator tabBarOptions={tabBarOptions}>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon size={30} focused={focused} name='home' />
          ),
        }}
      />
      <BottomTab.Screen
        name='About'
        component={LinksScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon size={30} focused={focused} name='link' />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Home";
    case "About":
      return "Links to learn more";
  }
}

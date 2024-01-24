import React from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { FontAwesome6 } from "@expo/vector-icons";

import QuestionScreen from "./screens/QuestionScreen";
import LeaderBoardScreen from "./screens/LeaderBoardScreen";
import colors from "./config/colors";

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Question"
        screenOptions={{
          tabBarStyle: {
            height: 100,
            paddingTop: 20,
          },
          tabBarActiveTintColor: colors.primary,
        }}
      >
        <Tab.Screen
          name="Question"
          component={QuestionScreen}
          options={{
            tabBarLabel: "Question",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="list-ol" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="LeaderBoard"
          component={LeaderBoardScreen}
          options={{
            tabBarLabel: "Leader board",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="chart-simple" color={color} size={size} />
            ),
          }}
          initialParams={{ user: null, totalPoints: [], userResponses: [], questions: [] }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;

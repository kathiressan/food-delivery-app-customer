import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastProvider } from "react-native-toast-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <ToastProvider
              placement="top"
              offsetTop={80}
              duration={1500}
              animationType="slide-in"
              swipeEnabled={true}
              textStyle={{ fontSize: 17 }}
            >
              <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                {/* <Stack.Screen
                  name="RegisterScreen"
                  component={RegisterScreen}
                  options={{
                    headerShown: false,
                  }}
                /> */}
              </Stack.Navigator>
            </ToastProvider>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

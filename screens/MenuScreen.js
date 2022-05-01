import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

const MenuScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-orange-300 h-full flex`}>
      <Header />
      <View tyle={tw`flex mt-5`}>
        <TouchableOpacity>
          <Text
            onPress={() => {
              navigation.navigate("OrderHistoryListScreen");
            }}
            style={tw`ml-6 text-white text-xl`}
          >
            Order History
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderColor: "white",
            borderStyle: "dotted",
            borderWidth: 1,
            borderRadius: 1,
            marginBottom: 15,
          }}
        />
        <TouchableOpacity>
          <Text
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
            style={tw`ml-6 text-white text-xl`}
          >
            Logout
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderColor: "white",
            borderStyle: "dotted",
            borderWidth: 1,
            borderRadius: 1,
            marginBottom: 15,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;

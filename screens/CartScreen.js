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

import { useDispatch, useSelector } from "react-redux";
import { selectCart, setCart, selectTotalAmount } from "../slices/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalAmount = useSelector(selectTotalAmount);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-orange-300 h-full flex`}>
      <Header />
      <ScrollView style={tw`p-5`}>
        {cart.map((item, index) => (
          <View style={tw`p-5`} key={item.id}>
            <View style={tw`flex flex-row`}>
              <Text style={tw`mr-3 text-xl`}>{index + 1}</Text>
              <Text style={tw`text-xl`}>{item.productName}</Text>
            </View>
            <View style={tw`flex flex-row justify-between`}>
              <Image
                style={[
                  tw`mb-2`,
                  {
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                  },
                ]}
                source={{
                  uri: item.image,
                }}
              />
              <View>
                <Text
                  style={tw`text-white text-lg`}
                >{`Unit: ${item.unit}`}</Text>
                <Text
                  style={tw`text-white text-lg`}
                >{`Price: ${item.price}`}</Text>
                <Text style={tw`text-white text-lg`}>{`Subtotal: ${
                  item.price * item.unit
                }`}</Text>
              </View>
            </View>
          </View>
        ))}
        <Text
          style={tw`text-right text-white text-lg`}
        >{`Total Amount: ${totalAmount}`}</Text>
        <TouchableOpacity>
          <Text
            style={tw`text-xl mx-auto text-center rounded-xl border overflow-hidden mt-10 mb-10 bg-orange-400 w-[40%]`}
            onPress={() => {
              navigation.navigate("CheckoutScreen");
            }}
          >
            Check Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

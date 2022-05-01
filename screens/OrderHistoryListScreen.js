import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectAccount } from "../slices/accountSlice";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

const OrderHistoryListScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);

  const account = useSelector(selectAccount);

  const ratingPageFunc = (order) => {
    navigation.navigate("RatingScreen", { order: order });
  };

  useEffect(() => {
    setOrders([]);
    async function getOrders() {
      const q = query(
        collection(db, "orders"),
        where("userID", "==", account.id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        try {
          const docObj = doc.data();
          docObj.id = doc.id;
          setOrders((oldArray) => [...oldArray, docObj]);
        } catch (err) {
          alert(err);
        }
      });
    }
    getOrders();
  }, []);

  return (
    <SafeAreaView style={tw`flex bg-orange-300 h-full`}>
      <Header />
      <ScrollView style={tw`p-1`}>
        {orders.length > 0 &&
          orders.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={tw`border mb-2 p-2 rounded-lg`}
              onPress={() => {
                order.rated == false && ratingPageFunc(order);
              }}
            >
              {order.rated == false && (
                <Text style={tw`mb-2 text-red-600 text-center`}>
                  Pending Rating
                </Text>
              )}
              <Text style={tw`mb-1`}>{`Order ID: ${order.id}`}</Text>
              {order.items.map((prod, index) => (
                <Text key={prod.productName}>{`${index + 1}. ${
                  prod.productName
                }`}</Text>
              ))}
              <Text style={tw`mt-1`}>{`Subtotal: ${order.subTotal}`}</Text>
              <Text>{`Delivery Fee: ${order.deliveryFee}`}</Text>
              <Text>{`Total: ${order.totalAmount}`}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderHistoryListScreen;

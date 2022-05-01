import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import Header from "../components/Header";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  setCart,
  selectTotalAmount,
  incrementTotalAmount,
} from "../slices/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { useToast } from "react-native-toast-notifications";
import { db } from "../firebase";
import { selectAccount } from "../slices/accountSlice";

const CheckoutScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  //   const [coordinates, setCoordinates] = useState({});

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalAmount = useSelector(selectTotalAmount);
  const account = useSelector(selectAccount);
  const navigation = useNavigation();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const createOrder = async () => {
    try {
      if (address) {
        const sellerID = cart[0].sellerID;
        const fetchedSeller = await getDoc(doc(db, "accounts", sellerID));
        const pickupAddress = fetchedSeller.data().shopAddress;

        for (const item of cart) {
          const productID = item.productID;
          const fetchedProduct = await getDoc(doc(db, "products", productID));
          const updatedStock = fetchedProduct.data().stock - item.unit;
          const updatedSold = fetchedProduct.data().sold + item.unit;
          if (updatedStock < 0) return alert("Not enough stock remaining");
          await updateDoc(doc(db, "products", productID), {
            stock: updatedStock,
          });
        }

        const orderObj = {
          deliveryAddress: address,
          pickupAddress: pickupAddress,
          orderStatus: "PENDING_PICKUP",
          userID: account.id,
          subTotal: Math.round(totalAmount * 100) / 100,
          deliveryFee: 5,
          totalAmount: Math.round((totalAmount + 5) * 100) / 100,
          items: cart,
          sellerID: cart[0].sellerID,
          rated: false,
        };
        await addDoc(collection(db, "orders"), orderObj);
        dispatch(setCart([]));
        dispatch(incrementTotalAmount(0.0));
        toast.show(
          "Order created successfully! Our rider will pick it up shortly.",
          {
            type: "success",
          }
        );
        navigation.navigate("HomeScreen");
      } else {
        toast.show("Please enter the delivery address", {
          type: "danger",
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SafeAreaView style={tw`bg-orange-300 h-full flex`}>
      <Header />
      <View style={tw`flex items-center justify-center`}>
        {text != "Waiting.." ? (
          //   <Text>{text}</Text>
          <MapView
            style={[tw`h-60`, styles.map]}
            initialRegion={{
              latitude: JSON.parse(text).coords.latitude,
              longitude: JSON.parse(text).coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              draggable
              //   onLayout={() => {
              //     setCoordinates({
              //       latitude: JSON.parse(text).coords.latitude,
              //       longitude: JSON.parse(text).coords.longitude,
              //     });
              //   }}
              coordinate={{
                latitude: JSON.parse(text).coords.latitude,
                longitude: JSON.parse(text).coords.longitude,
              }}
              //   onDragEnd={(e) =>
              //     setCoordinates({
              //       latitude: e.nativeEvent.coordinate.latitude,
              //       longitude: e.nativeEvent.coordinate.longitude,
              //     })
              //   }
            />
          </MapView>
        ) : (
          <Text>Map Loading...</Text>
        )}
        <TextInput
          style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
          onChangeText={setAddress}
          placeholder="Delivery address"
          value={address}
        />
        <View style={tw`mt-10 bg-orange-400 p-5 rounded-xl border`}>
          <Text style={tw`mb-4`}>Payment Method:</Text>
          <Text>Cash On Delivery (COD)</Text>
        </View>
        <View style={tw`mt-10 bg-orange-400 p-5 rounded-xl border w-[70%]`}>
          <Text style={tw`mb-4`}>Order Summary:</Text>
          <ScrollView>
            {cart.map((item) => (
              <View
                style={tw`flex flex-row justify-between`}
                key={item.productID}
              >
                <View style={tw`flex flex-row`}>
                  <Text>{`${item.unit}x `}</Text>
                  <Text>{item.productName}</Text>
                </View>
                <Text>{`RM ${item.price * item.unit}`}</Text>
              </View>
            ))}

            <View style={tw`flex flex-row justify-between mt-4`}>
              <Text>Delivery Fee</Text>
              <Text>{`RM 5`}</Text>
            </View>

            <View style={tw`flex flex-row justify-between`}>
              <Text>Subtotal</Text>
              <Text>{`RM ${Math.round((totalAmount + 5) * 100) / 100}`}</Text>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity onPress={createOrder}>
          <Text
            style={tw`mt-3 p-2 bg-orange-400 border overflow-hidden rounded-lg`}
          >
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  map: {
    width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
});

export default CheckoutScreen;

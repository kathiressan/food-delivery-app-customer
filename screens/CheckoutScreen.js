import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import Header from "../components/Header";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, setCart, selectTotalAmount } from "../slices/cartSlice";
import { useNavigation } from "@react-navigation/native";

const CheckoutScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  //   const [coordinates, setCoordinates] = useState({});

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalAmount = useSelector(selectTotalAmount);
  const navigation = useNavigation();

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

  return (
    <SafeAreaView style={tw`bg-orange-300 h-full flex`}>
      <Header />
      <View style={tw`flex items-center justify-center`}>
        {text != "Waiting.." ? (
          //   <Text>{text}</Text>
          <MapView
            style={[tw`h-70`, styles.map]}
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
        <View style={tw`mt-10 bg-orange-400 p-5 rounded-xl border`}>
          <Text style={tw`mb-4`}>Payment Method:</Text>
          <Text>Cash On Delivery (COD)</Text>
        </View>
        <View style={tw`mt-10 bg-orange-400 p-5 rounded-xl border w-[70%]`}>
          <Text style={tw`mb-4`}>Order Summary:</Text>
          <ScrollView>
            {cart.map((item) => (
              <View style={tw`flex flex-row justify-between`} key={item.id}>
                <View style={tw`flex flex-row`}>
                  <Text>{`${item.unit}x `}</Text>
                  <Text>{item.productName}</Text>
                </View>
                <Text>{`RM ${item.price * item.unit}`}</Text>
              </View>
            ))}
            <View style={tw`flex flex-row justify-between mt-4`}>
              <Text>Subtotal</Text>
              <Text>{`RM ${totalAmount}`}</Text>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity>
          <Text
            style={tw`mt-3 p-2 bg-orange-400 border overflow-hidden rounded-lg`}
          >
            Make Payment
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

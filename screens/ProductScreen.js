import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Header from "../components/Header";
import { Rating } from "react-native-rating-element";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, setCart, incrementTotalAmount } from "../slices/cartSlice";
import { useNavigation } from "@react-navigation/native";

const ProductScreen = ({
  route: {
    params: {
      item: {
        id,
        imageUrl,
        name,
        price,
        sold,
        rating,
        description,
        sellerID,
        stock,
      },
    },
  },
}) => {
  const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const navigation = useNavigation();

  const addToCart = () => {
    if (cart.length > 0 && cart[0].sellerID != sellerID) {
      dispatch(setCart([]));
    }
    const cartObj = {
      productID: id,
      sellerID: sellerID,
      productName: name,
      image: imageUrl,
      unit: itemCount,
      price: price,
    };
    let tempCart = JSON.parse(JSON.stringify(cart));
    const foundSameItem = tempCart.find((item) => item.id == id);
    if (foundSameItem) {
      foundSameItem.unit += itemCount;
    } else tempCart.push(cartObj);

    dispatch(setCart(tempCart));
    dispatch(incrementTotalAmount(itemCount * price));
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaView style={tw`bg-orange-300 h-full flex`}>
      <Header />
      <View style={tw`bg-black h-1 mt-2`}></View>
      <View style={tw`flex items-center mt-3`}>
        <Image
          style={[
            tw`mb-2`,
            {
              width: 500,
              height: 250,
              resizeMode: "contain",
            },
          ]}
          source={{
            uri: imageUrl,
          }}
        />
        <View style={tw`flex flex-row items-center`}>
          <Rating
            rated={rating}
            totalCount={5}
            ratingColor="yellow"
            ratingBackgroundColor="white"
            size={24}
            readonly // by default is false
            icon="ios-star"
            direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
          />
          <Text style={tw`text-xl ml-20`}>{`Sold: ${sold}`}</Text>
        </View>
        <View style={tw`flex flex-row items-center`}>
          <Text style={tw`text-2xl text-white`}>{name}</Text>
          {/* <Text style={tw`ml-20`}></Text> */}
        </View>
        <View style={tw`flex flex-row items-center`}>
          <Text
            style={tw`text-2xl text-left text-white`}
          >{`RM: ${price}`}</Text>
          <Text style={tw`ml-20`}></Text>
        </View>
        <View style={tw`flex flex-row items-center`}>
          <Text
            style={tw`text-2xl text-left text-white`}
          >{`Stock: ${stock}`}</Text>
          <Text style={tw`ml-20`}></Text>
        </View>
      </View>
      <View style={tw`bg-black h-1 mt-2`}></View>
      <View style={tw`flex ml-8 mt-3`}>
        <Text>{description}</Text>
      </View>
      <View style={tw`bg-black h-1 mt-2`}></View>
      <View
        style={tw`flex flex-row items-center justify-center mt-10 bg-orange-400 w-[65%] mx-auto p-2s`}
      >
        <TouchableOpacity>
          <Text
            style={tw`font-bold text-3xl bg-red-300 rounded-full w-10 h-10 border text-center mr-3`}
            onPress={() => {
              setItemCount(itemCount - 1 <= 0 ? 0 : itemCount - 1);
            }}
          >
            -
          </Text>
        </TouchableOpacity>
        <Text style={tw`font-bold text-xl`}>{itemCount}</Text>
        <TouchableOpacity>
          <Text
            style={tw`font-bold text-3xl bg-red-300 rounded-full w-10 h-10 border text-center ml-3 mr-3`}
            onPress={() => {
              setItemCount(itemCount + 1);
            }}
          >
            +
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={tw`font-bold text-xl`}
            onPress={() => itemCount > 0 && itemCount <= stock && addToCart()}
          >
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;

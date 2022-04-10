import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useToast } from "react-native-toast-notifications";
import { db } from "../firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import Header from "../components/Header";
import CategoryComponent from "../components/CategoryComponent";
import PopularProductComponent from "../components/PopularProductComponent";

const HomeScreen = () => {
  const navigation = useNavigation();
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      image:
        "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-1foodgroups_dairy_detailfeature.jpg?sfvrsn=23510b0_6",
      categoryName: "Dairy",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
      image:
        "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-1foodgroups_dairy_detailfeature.jpg?sfvrsn=23510b0_6",
      categoryName: "Dairy",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bc",
      image:
        "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-1foodgroups_dairy_detailfeature.jpg?sfvrsn=23510b0_6",
      categoryName: "Dairy",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bd",
      image:
        "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-1foodgroups_dairy_detailfeature.jpg?sfvrsn=23510b0_6",
      categoryName: "Dairy",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28be",
      image:
        "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-1foodgroups_dairy_detailfeature.jpg?sfvrsn=23510b0_6",
      categoryName: "Dairy",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bf",
      image:
        "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-1foodgroups_dairy_detailfeature.jpg?sfvrsn=23510b0_6",
      categoryName: "Dairy",
    },
  ];

  const DATA2 = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      image:
        "https://cdn-prod.medicalnewstoday.com/content/images/articles/283/283659/a-basket-of-eggs.jpg",
      productName: "Telur Kampung",
      price: 6,
      rating: 4.5,
      sold: 35,
      description: "Fresh eggs",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c8/Oat_milk_glass_and_bottles.jpg",
      productName: "Milk",
      price: 12,
      rating: 4.5,
      sold: 35,
      description: "Fresh milk",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bc",
      image:
        "https://cdn-prod.medicalnewstoday.com/content/images/articles/283/283659/a-basket-of-eggs.jpg",
      productName: "Eggs",
      price: 6,
      rating: 4.5,
      sold: 35,
      description: "Fresh eggs",
    },
  ];
  DATA2.forEach((item) => (item.navigation = navigation));

  //   const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex bg-orange-300 h-full`}>
      <Header />
      <View style={tw`bg-black h-1 mt-2`}></View>
      <View style={tw`mt-5 p-3 pl-5`}>
        <Text style={tw`text-black mb-3`}>Categories</Text>
        <FlatList
          horizontal
          data={DATA}
          renderItem={CategoryComponent}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={tw`bg-black h-1 mt-2`}></View>

      <View style={tw`mt-5 p-3 pl-5`}>
        <Text style={tw`text-black mb-3`}>Popular Products</Text>
        <View style={tw`items-center`}>
          <FlatList
            data={DATA2}
            renderItem={PopularProductComponent}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

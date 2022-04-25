import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { useToast } from "react-native-toast-notifications";
import { db } from "../firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  doc,
  getDocs,
  query,
  orderBy,
  collection,
  where,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import Header from "../components/Header";
import CategoryComponent from "../components/CategoryComponent";
import PopularProductComponent from "../components/PopularProductComponent";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    const getProducts = async () => {
      const q = query(
        collection(db, "products"),
        where("stock", ">=", 0),
        where("publish", "==", true),
        orderBy("stock", "desc"),
        orderBy("rating", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docObj = doc.data();
        docObj.id = doc.id;
        setProducts((oldArr) => [...oldArr, docObj]);
      });
    };
    getProducts();
  }, []);

  const selectProduct = (item) => {
    navigation.navigate("ProductScreen", { item: item });
  };

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
        <ScrollView>
          <View style={tw`flex flex-row flex-wrap items-start mb-90 w-[100%]`}>
            {products.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={tw`mb-2 flex items-center w-[50%]`}
                onPress={() => {
                  selectProduct(item);
                }}
              >
                <View style={tw`border`}>
                  <Image
                    style={[
                      {
                        width: 120,
                        height: 150,
                        resizeMode: "contain",
                      },
                    ]}
                    resizeMode={"cover"}
                    source={{
                      uri: item.imageUrl,
                    }}
                  />
                </View>
                <Text style={tw`items-center`}>{item.productName}</Text>
                <View style={tw`flex flex-row`}>
                  <Text style={tw`text-red-500`}>RM: </Text>
                  <Text>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {/* <Text style={tw`mb-100`}>eqr</Text> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

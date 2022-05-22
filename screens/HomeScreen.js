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
      id: "1",
      image:
        "https://focus.cbbc.org/wp-content/uploads/2020/08/baby_food_sector-1.jpg",
      categoryName: "Baby",
    },
    {
      id: "2",
      image:
        "https://i2.wp.com/media.premiumtimesng.com/wp-content/files/2022/01/Mashed.jpg?fit=1600%2C900&ssl=1",
      categoryName: "Beverages",
    },
    {
      id: "3",
      image:
        "https://www.snackandbakery.com/ext/resources/images/bakeryproducts.jpg?1432238179",
      categoryName: "Bread & Bakery",
    },
    {
      id: "4",
      image:
        "https://www.verywellhealth.com/thmb/LiEYTC9ZucAPtgIkxivHFQQpXUY=/1333x1000/smart/filters:no_upscale()/30D7A016-ABA5-48DD-BE39-3E7A223A03BF-96f2ba9e6c724dc9b2ba638b0c0f44a2.jpeg",
      categoryName: "Breakfast & Cereal",
    },
    {
      id: "5",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/000/366/324/small/ugx4_n9k4_170201.jpg",
      categoryName: "Canned Goods",
    },
    {
      id: "6",
      image:
        "https://cdn11.bigcommerce.com/s-p891vzg/images/stencil/original/uploaded_images/types-of-spices-that-are-the-most-popular-right-now.jpg?t=1517279969",
      categoryName: "Condiments/Spices",
    },
    {
      id: "7",
      image:
        "https://c4.wallpaperflare.com/wallpaper/677/705/249/color-cookies-candy-sweets-wallpaper-preview.jpg",
      categoryName: "Snacks & Candy",
    },

    {
      id: "8",
      image:
        "https://domf5oio6qrcr.cloudfront.net/medialibrary/9685/iStock-544807136.jpg",
      categoryName: "Dairy",
    },
    {
      id: "9",
      image:
        "https://www.news-medical.net/image.axd?picture=2020%2F1%2Fshutterstock_321864554.jpg",
      categoryName: "Produce",
    },
    {
      id: "10",
      image:
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/FB466C96-E47A-4C5E-A287-AB192C6CA9C0/Derivates/A6128AA4-AEDA-4DB2-BAE9-5FF187463F40.jpg",
      categoryName: "Pasta",
    },
    {
      id: "11",
      image:
        "https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg?fm=jpg&w=900&fl=progressive",
      categoryName: "Meat",
    },
    {
      id: "12",
      image:
        "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/07/24/fn_bucket-cleaning-supplies_s4x3.jpg.rend.hgtvcom.406.305.suffix/1595872347868.jpeg",
      categoryName: "Cleaning Supplies",
    },
    {
      id: "13",
      image:
        "https://www.newhope.com/sites/newhope360.com/files/natural-personal-care-ew20.jpg",
      categoryName: "Personal Care",
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

  const filteredProductList = async (categoryName) => {
    setProducts([]);
    const q = query(
      collection(db, "products"),
      where("stock", ">=", 0),
      where("publish", "==", true),
      where("category", "==", categoryName),
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

  const selectProduct = (item) => {
    navigation.navigate("ProductScreen", { item: item });
  };

  return (
    <SafeAreaView style={tw`flex bg-orange-300 h-full`}>
      <Header />
      <View style={tw`bg-black h-1 mt-2`}></View>
      <View style={tw`mt-5 p-3 pl-5`}>
        <Text style={tw`text-black mb-3`}>Categories</Text>
        <ScrollView horizontal={true} style={tw`flex flex-row`}>
          {DATA.map(({ id, image, categoryName }) => (
            <TouchableOpacity
              key={id}
              onPress={() => {
                filteredProductList(categoryName);
              }}
              style={tw`flex justify-center items-center mr-5`}
            >
              <Image
                style={[
                  tw`rounded-full mb-2`,
                  {
                    width: 55,
                    height: 55,
                    resizeMode: "contain",
                  },
                ]}
                resizeMode={"cover"}
                source={{
                  uri: image,
                }}
              />
              <Text style={tw`mb-3`}>{categoryName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
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
  getDoc,
  updateDoc,
  doc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { useToast } from "react-native-toast-notifications";

const RatingScreen = ({
  route: {
    params: { order },
  },
}) => {
  const [inputs, setInputs] = useState([]);
  const toast = useToast();
  const navigation = useNavigation();
  const account = useSelector(selectAccount);

  const submitRatings = async () => {
    let correctInputs = true;
    for (const inputx of inputs) {
      if (isNaN(inputx)) correctInputs = false;
    }
    if (!correctInputs) {
      toast.show(
        "Please rate all products and make sure ratings are between 1-5",
        {
          type: "danger",
        }
      );
    } else {
      for (let x = 0; x < order.items.length; x++) {
        const productID = order.items[x].productID;
        const rating = inputs[x];
        const fetchedProduct = await getDoc(doc(db, "products", productID));
        const currRating = fetchedProduct.data().rating;
        const ratedBy = fetchedProduct.data().ratedBy;
        ratedBy.push({
          username: account.name,
          rating: rating,
          date: new Date().toISOString().split("T")[0],
        });
        const newRating =
          currRating == 0
            ? parseFloat(rating)
            : (parseFloat(rating) + parseFloat(currRating)) / 2;
        await updateDoc(doc(db, "products", productID), {
          rating: newRating,
          ratedBy: ratedBy,
        });
      }
      await updateDoc(doc(db, "orders", order.id), {
        rated: true,
      });
      toast.show("Products rated successfully!", {
        type: "success",
      });
      navigation.navigate("MenuScreen");
    }
  };

  //   useEffect(() => {
  //     order.items.forEach((item) => {
  //       setInputs(...inputs, "");
  //     });
  //   }, []);
  return (
    <SafeAreaView style={tw`flex bg-orange-300 h-full`}>
      <Header />
      <View style={tw`p-3`}>
        {order.items.map((item, index) => (
          <View
            key={item.productID}
            style={tw`flex flex-row items-center justify-center`}
          >
            <Text style={tw`mr-3`}>{`${index + 1}. ${item.productName}`}</Text>
            <TextInput
              style={tw`bg-white w-[25%] p-1 border mt-2 text-center`}
              onChangeText={(text) => {
                setInputs([
                  ...inputs.slice(0, index),
                  text,
                  ...inputs.slice(index + 1, inputs.length),
                ]);
              }}
              placeholder="Rate 1-5"
              value={inputs[index]}
            />
          </View>
        ))}
        <TouchableOpacity
          onPress={submitRatings}
          style={tw`text-center mt-5 bg-black text-white w-[30%] mx-auto p-2`}
        >
          <Text style={tw`text-white`}>Submit Ratings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RatingScreen;

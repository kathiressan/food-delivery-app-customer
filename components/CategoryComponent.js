import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";

const CategoryComponent = ({ item: { id, image, categoryName } }) => {
  return (
    <TouchableOpacity style={tw`flex justify-center items-center mr-5`}>
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
  );
};

export default CategoryComponent;

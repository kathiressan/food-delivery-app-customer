import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const PopularProductComponent = ({
  item: {
    id,
    image,
    productName,
    price,
    sold,
    navigation,
    rating,
    description,
  },
}) => {
  return (
    <TouchableOpacity
      style={tw`mb-2 flex items-center`}
      onPress={() => {
        navigation.navigate("ProductScreen", {
          id: id,
          image: image,
          productName: productName,
          price: price,
          rating: rating,
          sold: sold,
          description: description,
        });
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
            uri: image,
          }}
        />
      </View>
      <Text style={tw`items-center`}>{productName}</Text>
      <View style={tw`flex flex-row`}>
        <Text style={tw`text-red-500`}>RM: </Text>
        <Text>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularProductComponent;

import { View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const menuScreenFunc = () => {
    navigation.navigate("MenuScreen");
  };
  const homeScreenNav = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={tw`flex flex-row p-5 justify-between`}>
      <TouchableOpacity onPress={homeScreenNav}>
        <Image
          on
          style={[
            tw`rounded-full`,
            { width: 55, height: 55, resizeMode: "contain" },
          ]}
          source={{
            uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8jHyAAAABPTU7W1dUcGBkZExVqaGgfGxwHAAAbFhf29vYQCAofGhsUDhDy8vKxsLAxLS7o6OgMAAWOjI18enteXFxFQ0PCwcG3trbq6urc3NxVU1OWlJSHhoZycHClpKVCP0A5Nje9vLzJyMiAfn5samooJCWopqcI4FBKAAAC1UlEQVR4nO3c2XaqQBCFYWknhhZxwijBIdHE93/CYBYSxT7nisK1iv+7rQvYgEiPvR4AAAAAAAAAAAAAAAAAAAAAAAAAAAAANeaDLHr1OciJkndzNcvnrz4VGZuZCb0r3y6WGm/kzvheJVhPa+V5nr73RaTLQSsBV8a7F88e7+LO2FE4lBCG1uxbeGQOjwGLiOl9Oa2Xm2WP9UemcVP7dFSz+SvvAtGARcT03+fWjN1zwslHVR3I3sEr8ymc8DlgcdDqBbCPxRP6M9mAzptkl2U1kg9YXE/Z/+BPV8LRuKxm8g9pkfBNNOFh4Tjm5FhW39pIGCTtJxyuy+pJQUL9T6n7TZPfyhPfUW464VY0Yc93ZDDZrXqWf5mG6/+dXgPy54+WsF9VM+lPmuJynoQTRs838f6HkUv/EoO9cMCicVjPsHg45sqI/hRN2kLjonabbP+xfPFMPJIRB3HuPqeGHcoW/pVvxvWLOt2cv8YiVonwa7Ry6pv491kMjXdp6ZhtO50nQRDYNNHYS1OZq04HAAA6Ibssv84H6cbo62w+TGBH8cIEufhAySts+3+t3MB77vmKsoGMrKXLmX2P7hrAE1NrP0W7mTUyFrN9Gw3E6XfoPXgcDBoYK9eN4cfiI0+FtN5h6Id3F3Yg203j+fIRHR339lxVo2PoOK1GI4bSD2rfEcFUb4BEvlvf7mQDTl0RTDVWsh6KJ/SMbELn+Fm8KqvbVkZmZL8zEle3/fC9rLYyunY/MUJA7hrH929TFdoZIZXtwNR/D/X/DvW/S/X/H3bgm0b/d2kH2hb624cdaOP39PfTXGnvawMAAJ2he06U9nlt6ucmqp9fqn6OsPp53vrn6utfb6F+zYz+dU/6167pX3+ofw2p/qdU/1pu/evxO7Cngv59MfTvbdKB/Wk6sMdQB/aJ6sBeX79079cGAAAAAAAAAAAAAAAAAAAAAAAAAAAAQNQPclNNNX+giAMAAAAASUVORK5CYII=",
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CartScreen");
        }}
      >
        <Image
          style={[
            tw`rounded-full`,
            { width: 55, height: 55, resizeMode: "contain" },
          ]}
          source={{
            uri: "https://thumbs.dreamstime.com/b/shopping-cart-orange-background-icon-vector-illustration-stock-80754940.jpg",
          }}
        />
      </TouchableOpacity>
      <Avatar
        onPress={menuScreenFunc}
        size={55}
        rounded
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
        }}
        containerStyle={{ backgroundColor: "#6733b9" }}
      />
    </View>
  );
};
export default Header;

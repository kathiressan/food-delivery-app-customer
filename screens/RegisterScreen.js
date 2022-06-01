import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useToast } from "react-native-toast-notifications";
import { db } from "../firebase";
import { collection, addDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const toast = useToast();
  const accountsRef = collection(db, "accounts");
  const navigation = useNavigation();

  const registerFunc = async () => {
    try {
      if (name == null || phoneNumber == null || email == null || password == null || confirmPassword == null) {
        toast.show("Please fill up all fields", {
          type: "danger",
        });
      } else {
        await addDoc(accountsRef, {
          name: name,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
          accountType: "Customer",
        });
        toast.show("Registration Successful!", {
          type: "success",
        });
        navigation.navigate("LoginScreen");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SafeAreaView style={tw`bg-orange-300 h-full flex items-center`}>
      <View style={tw`flex items-center`}>
        <Image
          style={[
            tw`mt-20 rounded-full`,
            { width: 100, height: 100, resizeMode: "contain" },
          ]}
          source={{
            uri: "https://thumbs.dreamstime.com/b/shopping-cart-orange-background-icon-vector-illustration-stock-80754940.jpg",
          }}
        />
        <Text style={tw`font-bold text-4xl`}>Hello</Text>
        <Text style={tw`font-bold text-lg`}>Create your account below</Text>
      </View>
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-4`}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="black"
        value={name}
      />
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        placeholderTextColor="black"
        value={phoneNumber}
      />
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="black"
        value={email}
      />
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="black"
        secureTextEntry={true}
        value={password}
      />
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        placeholderTextColor="black"
        secureTextEntry={true}
        value={confirmPassword}
      />
      <TouchableOpacity style={tw`w-[20%]`}>
        <Text
          style={tw`bg-gray-100 text-center border p-2 rounded overflow-hidden mt-2 mb-4`}
          onPress={registerFunc}
        >
          Register
        </Text>
      </TouchableOpacity>
      <View style={tw`flex flex-row mt-6`}>
        <Text style={tw`mr-2`}>Already have an account?</Text>
        <TouchableOpacity>
          <Text
            style={tw`text-blue-600`}
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

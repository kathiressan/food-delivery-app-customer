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
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setAccount } from "../slices/accountSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const accountsRef = collection(db, "accounts");
  const navigation = useNavigation();

  const loginFunc = async () => {
    const q = query(accountsRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let validAcc = false;
    querySnapshot.forEach((doc) => {
      if (doc.data().email == email && doc.data().password == password) {
        validAcc = true;
        const acc = doc.data();
        acc.id = doc.id;
        dispatch(setAccount(acc));
      }
    });
    if (validAcc) {
      toast.show("Login Successful!", {
        type: "success",
      });
      navigation.navigate("HomeScreen");
    } else {
      toast.show("Invalid email or password!", {
        type: "danger",
      });
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
        <Text style={tw`font-bold text-4xl`}>Welcome Back!</Text>
        <Text style={tw`font-bold text-lg`}>Continue shopping with us</Text>
      </View>

      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-4`}
        onChangeText={setEmail}
        placeholder="Email"
        value={email}
      />
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
      />

      <TouchableOpacity style={tw`w-[20%]`}>
        <Text
          style={tw`bg-gray-100 text-center border p-2 rounded overflow-hidden mt-2 mb-4`}
          onPress={loginFunc}
        >
          Login
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <View>
          <Text style={{ width: 100, textAlign: "center" }}>or login with</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>

      <View style={tw`flex flex-row mt-10`}>
        <TouchableOpacity>
          <Image
            style={[
              tw`rounded-full mr-10`,
              { width: 70, height: 70, resizeMode: "contain" },
            ]}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={[
              tw`rounded-full bg-white`,
              { width: 70, height: 70, resizeMode: "contain" },
            ]}
            source={{
              uri: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png",
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={tw`flex flex-row mt-6`}>
        <Text style={tw`mr-2`}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text
            style={tw`text-blue-600`}
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            Click here
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

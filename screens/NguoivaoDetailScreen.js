import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";

const NguoivaoDetailScreen = (props) => {
  const nguoivaoId = props.navigation.getParam("nguoivaoId");
  const selectedNguoivao = useSelector((state) =>
    state.nguoivao.availableNguoivao.find((prod) => prod.id === nguoivaoId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedNguoivao.image }} />
      <View style={styles.actions}>
        {/* <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedNguoivao));
          }}
        /> */}
      </View>
      <Text style={styles.description}>{selectedNguoivao.realname}</Text>
      <Text style={styles.description}>{new Date(selectedNguoivao.date).toLocaleString()}</Text>
    </ScrollView>
  );
};

NguoivaoDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("nguoivaoRealname"),
    // headerRight: () => (
    //   <TouchableOpacity
    //     onPress={() => {
    //       navData.navigation.navigate("Cart");
    //     }}
    //   >
    //     <Text style={styles.displayText}>Cart</Text>
    //   </TouchableOpacity>
    // ),
  };
};

const styles = StyleSheet.create({
  displayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Platform.OS === "android" ? "white" : Colors.primary,
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    marginHorizontal: 20,
  },
  type: {
    fontSize: 15,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default NguoivaoDetailScreen;

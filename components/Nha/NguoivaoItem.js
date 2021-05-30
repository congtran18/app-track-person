import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "../UI/Card";

const NguoivaoItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.nguoivao}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.realname}</Text>
              <Text style={styles.date}>{props.date}</Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  nguoivao: {
    height: 330,
    margin: 10,
  },
  touchable: {
    borderRadius: 15,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "65%",
    marginTop: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
    date: {
    fontSize: 16,
    color: "#888",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 1,
    textAlign: "center",
  },
  price: {
    fontSize: 18,
    color: "#888",
    marginVertical: 10,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    paddingHorizontal: 18,
  },
});

export default NguoivaoItem;

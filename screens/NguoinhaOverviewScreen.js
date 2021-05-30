import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import NguoivaoItem from "../components/Nha/NguoivaoItem";
import * as nguoivaoActions from "../store/actions/nguoivao";
import Colors from "../constants/Colors";
/* import HeaderButton from "../../components/UI/HeaderButton"; */

const NguoinhaOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const nguoivao = useSelector((state) => state.nguoivao.availableNguoivao.filter((prod) => prod.realname !== "unknown"));
  const dispatch = useDispatch();

  const loadNguoivao = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(nguoivaoActions.fetchNguoivao()); 
    } catch (err) {
      setError("TEST" + err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadNguoivao
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadNguoivao]);

  useEffect(() => {
    setIsLoading(true);
    loadNguoivao().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadNguoivao]);

  const selectItemHandler = (id, realname) => {
    props.navigation.navigate("NguoivaoDetail", {
      nguoivaoId: id,
      nguoivaoRealname: realname,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occuerd!</Text>
        <Button
          title="Try again"
          onPress={loadNguoivao}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && nguoivao.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Danh sach hien dang trong!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadNguoivao}
      refreshing={isRefreshing}
      data={nguoivao}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <NguoivaoItem
          image={itemData.item.image}
          realname={itemData.item.realname}
          date={new Date(itemData.item.date).toLocaleString()}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.realname);
          }}
        >
          {/* <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          /> */}
        </NguoivaoItem>
      )}
    />
  );
};

NguoinhaOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "    Danh sach nguoi nha",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NguoinhaOverviewScreen;

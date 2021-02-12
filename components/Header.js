import React from "react";
import { StyleSheet, View, Platform } from "react-native";

import Colors from "../constants/colors";
import TitleText from "./TitleText";

const Header = (props) => {
  return (
    <View style={{...styles.headerBase, ...Platform.select({
        ios: styles.headerIOS,
        android: styles.headerAndroid
    })}}>
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  headerIOS: {
    backgroundColor: Colors.primary,
    borderBottomColor: 'transparent',
    borderBottomWidth:  0
  },
  headerAndroid: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth:  1
  },
  title: {
      color: Platform.OS === 'android' ? Colors.primary : 'white'
  }
});

export default Header;

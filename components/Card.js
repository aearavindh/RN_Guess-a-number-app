import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 25, // Only for android (without this shadow property won't work)
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10
    }
});

export default Card;


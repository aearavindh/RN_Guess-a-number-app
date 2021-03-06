import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from "react-native";

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
 
    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
    };
 
    Dimensions.addEventListener('change', updateLayout);
 
    return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

  return (
  <ScrollView>
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={
        {
          ...styles.imageContainer,
          width: availableDeviceWidth * 0.7,
          height: availableDeviceWidth * 0.7,
          borderRadius: availableDeviceWidth / 2,
          marginVertical: availableDeviceHeight / 30
        }
        }>
        <Image
        fadeDuration={1000}
        //  source={require('../assets/success.png')}
         source={{uri: 'https://st.depositphotos.com/1408467/4408/v/950/depositphotos_44083265-stock-illustration-abstract-successful-man.jpg'}}
         style={styles.image}
         resizeMode="cover"
        />
      </View>
      <View style={
        {
          ...styles.resultContainer,
          marginVertical: availableDeviceHeight / 60
        }
        }>
        <BodyText style={
          {
            ...styles.resultText,
            fontSize: availableDeviceHeight < 400 ? 16 : 20
          }
          }>Your phone needed <Text style={styles.highlight}>{props.rounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.number}</Text>.</BodyText>
      </View>
      <MainButton onPress={props.onRestart} >NEW GAME</MainButton>
    </View>
  </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    image: {
      width: '100%',
      height: '100%'
    },
    imageContainer: {
      borderWidth: 3,
      borderColor: 'black',
      overflow: 'hidden'
    },
    highlight: {
      color: Colors.primary,
      fontFamily: 'open-sans-bold'
    },
    resultContainer: {
      marginHorizontal: 20
    },
    resultText: {
      textAlign: 'center'
    }
});

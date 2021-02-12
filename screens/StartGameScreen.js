import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from "react-native";

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from "../components/NumberContainer";
import Colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setselectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);


    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
    
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };

    }, [])

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 
                        'Number has to be a number between 1 and 99',
                        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
                        );
            return;
        }
        setConfirmed(true);
        setselectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = 
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>;
    }

  return (
   <ScrollView>
   <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
    <View style={styles.screen}>
      <TitleText style={styles.title}>Start a New Game!</TitleText>
      <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} onChangeText={numberInputHandler} value={enteredValue} />
          <View style={styles.buttonContainer}>
              <View style={{width: buttonWidth}}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
              <View style={{width: buttonWidth}}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
          </View>
      </Card>
      <Text>{confirmedOutput}</Text>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: '80%',
        // maxWidth: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     // flex: 1,
    //     // padding: 15,
    //     // or
    //     // width: 100
    //     width: Dimensions.get('window').width / 4
    // },
    input: {
        width: '15%',
        textAlign: 'center'
    },
    summaryContainer: {
        alignItems: 'center'
    }
});

export default StartGameScreen;

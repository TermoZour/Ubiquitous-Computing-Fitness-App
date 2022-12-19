import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WIZARD_STATUS, WIZARD_NAME, WIZARD_TRUE_STATE } from './StorageKeys';


export default function Dashboard({ navigation }) {
  const [wizardDone, setWizardDone] = useState(false);
  const [name, setName] = useState("Human");

  const checkWizardStatus = async () => {
    try {
      const wizardState = await AsyncStorage.getItem(WIZARD_STATUS);
      if (wizardState == WIZARD_TRUE_STATE) {
        console.log(wizardState);
        setWizardDone(true);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch wizard status");
    }
  }

  const getName = async () => {
    try {
      const name = await AsyncStorage.getItem(WIZARD_NAME);
      if (name !== null) {
        setName(name);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch name");
    }
  }


  useEffect(() => {
    checkWizardStatus().then(() => {
      if (!wizardDone) // TODO: Fix wizard error. Somehow the state is not set to true before this check.
        navigation.navigate("Wizard")
    })

    getName();


  })

  return (
    <View>
      <Text>Hello, {name}</Text>
      <Button onPress={() => navigation.navigate('ScanBarcode')}>Stuff</Button>
    </View>
  )
}
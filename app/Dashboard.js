import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WIZARD_STATUS, WIZARD_NAME, WIZARD_TRUE_STATE } from './StorageKeys';

import VerticalBarGraph from './VerticalBarGraph';


export default function Dashboard({ navigation }) {
  const [wizardDone, setWizardDone] = useState(true);
  const [name, setName] = useState("Human");

  const checkWizardStatus = () => {
    try {
      const wizardState = AsyncStorage.getItem(WIZARD_STATUS);
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
    checkWizardStatus();
    if (!wizardDone) {// TODO: Fix wizard error. Somehow the state is not set to true before this check.
      console.log("Setup wizard not done.")
      navigation.navigate("Wizard")
    }
    getName();
  }, [])

  return (
    <View style={{ padding: 10 }}>
      <Text>Hello, {name}</Text>

      <VerticalBarGraph
        columns={[
          { title: "protein", value: 120, color: "#ff0000" },
          { title: "carbs", value: 30, color: "#00ff00" },
          { title: "fiber", value: 45, color: "#0000ff" }]}
        maxRange="200" />

      <Button onPress={() => navigation.navigate('ScanBarcode')}>Stuff</Button>
    </View>
  )
}
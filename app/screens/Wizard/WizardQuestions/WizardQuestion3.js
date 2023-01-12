import { useState } from "react";
import { View, StyleSheet } from "react-native"
import { FAB, TextInput, Text } from "react-native-paper"

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WIZARD_WEIGHT } from "../../../constants/StorageKeys";

export default function WizardQuestion1({ navigation }) {
  const [weight, setWeight] = useState("");

  const saveWeight = async () => {
    try {
      await AsyncStorage.setItem(WIZARD_WEIGHT, weight)
    } catch (e) {
      console.error(e);
      alert('Failed to save the data to the storage');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>What is your weight?</Text>
      <TextInput
        label="Weight (kg)"
        value={weight}
        onChangeText={text => setWeight(text)}
        keyboardType="number-pad"
      />

      <FAB
        icon="arrow-right"
        style={styles.fab}
        onPress={() => {
          saveWeight();
          navigation.replace("WizardQuestion4");
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

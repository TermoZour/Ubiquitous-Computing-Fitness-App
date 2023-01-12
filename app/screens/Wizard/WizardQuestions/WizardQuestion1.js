import { useState } from "react";
import { View, StyleSheet } from "react-native"
import { FAB, TextInput, Text } from "react-native-paper"

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WIZARD_NAME } from "../../../constants/StorageKeys";

export default function WizardQuestion1({ navigation }) {
  const [name, setName] = useState("");

  const saveName = async () => {
    try {
      await AsyncStorage.setItem(WIZARD_NAME, name)
    } catch (e) {
      console.error(e);
      alert('Failed to save the data to the storage');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>What should I call you?</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />

      <FAB
        icon="arrow-right"
        style={styles.fab}
        onPress={() => {
          saveName();
          navigation.replace("WizardQuestion2")
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

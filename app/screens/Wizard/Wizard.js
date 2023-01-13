import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, SegmentedButtons, FAB } from "react-native-paper";
import { WIZARD_BURN, WIZARD_GAIN, WIZARD_MAINTAIN, WIZARD_NAME, WIZARD_PROGRAM, WIZARD_STATUS, WIZARD_TRUE_STATE, WIZARD_WEIGHT } from "../../constants/StorageKeys";


export default function Wizard({ navigation }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [program, setProgram] = useState(WIZARD_MAINTAIN); // use maintain state by default

  // save onboarding data to AsyncStorage
  const saveInput = async (_callback) => {
    try {
      await AsyncStorage.setItem(WIZARD_STATUS, WIZARD_TRUE_STATE);
      await AsyncStorage.setItem(WIZARD_NAME, name);
      await AsyncStorage.setItem(WIZARD_WEIGHT, weight);
      await AsyncStorage.setItem(WIZARD_PROGRAM, program);
      _callback(); // execute callback after all keys are set

    } catch (e) {
      console.error(e);
      alert("Failed to store onboarding information");
    }
  }

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <Text variant="titleLarge">Before we begin, I need some info about you!</Text>
      <TextInput
        label="What is your name?"
        value={name}
        mode="outlined"
        onChangeText={text => setName(text)}
      />
      <TextInput
        label="How much do you weight? (kg)"
        value={weight}
        mode="outlined"
        onChangeText={text => setWeight(text)}
        keyboardType="number-pad"
      />
      <Text variant="bodyLarge"
        style={{ alignSelf: "center", marginTop: 50 }}>What would you like to do?</Text>
      <SegmentedButtons
        value={program}
        onValueChange={setProgram}
        style={{ marginTop: 10, alignSelf: "center" }}
        buttons={[
          {
            value: WIZARD_BURN,
            label: 'Burn 🔥',
          },
          {
            value: WIZARD_MAINTAIN,
            label: 'Maintain ⚖️',
          },
          {
            value: WIZARD_GAIN,
            label: 'Gain 💪'
          },
        ]}
      />
      <FAB
        icon="arrow-right"
        style={styles.fab}
        onPress={() => {
          // save onboarding data to AsynStorage THEN switch screens.
          saveInput(() => navigation.replace("Dashboard"));
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
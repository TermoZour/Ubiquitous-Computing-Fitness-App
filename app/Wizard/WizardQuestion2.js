import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Text, TouchableRipple, FAB } from "react-native-paper"

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WIZARD_BURN, WIZARD_GAIN, WIZARD_MAINTAIN, WIZARD_PROGRAM } from "../StorageKeys"


export default function WizardQuestion2({ navigation }) {
  const [program, setProgram] = useState(null);

  const saveProgram = async () => {
    try {
      await AsyncStorage.setItem(WIZARD_PROGRAM, program);
    } catch (e) {
      console.error(e);
      alert('Failed to save the data to the storage');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>What would you like to do?</Text>
      <TouchableRipple style={[styles.wizardButton, styles.greenContainer]} onPress={() => {
        console.log("Touched maintain");
        setProgram(WIZARD_MAINTAIN);
      }}>
        <View>
          <Text style={styles.wizardButtonBackgroundIcon}>⚖️</Text>
          <Text style={styles.wizardButtonText}>Maintain</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple style={[styles.wizardButton, styles.redContainer]} onPress={() => {
        console.log("Touched burn");
        setProgram(WIZARD_BURN);
      }}>
        <View>
          <Text style={styles.wizardButtonBackgroundIcon}>🔥</Text>
          <Text style={styles.wizardButtonText}>Burn</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple style={[styles.wizardButton, styles.blueContainer]} onPress={() => {
        console.log("Touched gain");
        setProgram(WIZARD_GAIN);
      }}>
        <View>
          <Text style={styles.wizardButtonBackgroundIcon}>💪</Text>
          <Text style={styles.wizardButtonText}>Gain</Text>
        </View>
      </TouchableRipple>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          saveProgram();
          navigation.replace("WizardQuestion3");
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wizardButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wizardButtonText: {
    textAlign: 'center'
  },
  wizardButtonBackgroundIcon: {
    // position: 'absolute',
    textAlign: 'center',
    fontSize: 50
  },
  redContainer: {
    backgroundColor: '#FFD8E4'
  },
  greenContainer: {
    backgroundColor: '#D3E8D2'
  },
  blueContainer: {
    backgroundColor: '#BDEAF4'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
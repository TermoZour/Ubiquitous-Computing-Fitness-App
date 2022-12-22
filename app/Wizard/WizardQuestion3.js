import { StyleSheet, View } from "react-native";
import { FAB, Text } from "react-native-paper";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WIZARD_STATUS, WIZARD_TRUE_STATE } from "../StorageKeys";

export default function WizardQuestion3({ navigation }) {
  const setWizardStatus = async (state) => {
    try {
      await AsyncStorage.setItem(WIZARD_STATUS, state);
    } catch (e) {
      console.error(e);
      alert('Failed to save the data to the storage');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>That's it! Now we can begin.</Text>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          setWizardStatus(WIZARD_TRUE_STATE);
          navigation.goBack()
        }} />
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
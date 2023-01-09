import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WizardQuestion1 from "./WizardQuestions/WizardQuestion1";
import WizardQuestion2 from "./WizardQuestions/WizardQuestion2";
import WizardQuestion3 from "./WizardQuestions/WizardQuestion3";

const Stack = createNativeStackNavigator();

export default function Wizard({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="WizardQuestion1" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WizardQuestion1" component={WizardQuestion1} />
      <Stack.Screen name="WizardQuestion2" component={WizardQuestion2} />
      <Stack.Screen name="WizardQuestion3" component={WizardQuestion3} />
      {/* <Stack.Screen name="ScanBarcode" component={ScanBarcode} /> */}
    </Stack.Navigator>
  )
}
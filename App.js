import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Wizard from "./app/Wizard";
import ScanBarcode from "./app/ScanBarcode";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Wizard">
          <Stack.Screen name="Wizard" component={Wizard} />
          <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

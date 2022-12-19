import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from './app/Dashboard';
import Wizard from "./app/Wizard";
import ScanBarcode from "./app/ScanBarcode";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="Wizard"
            component={Wizard}
            options={{ headerBackVisible: false }}
          />
          <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

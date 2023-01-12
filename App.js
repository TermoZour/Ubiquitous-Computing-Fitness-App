import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from './app/screens/Dashboard/Dashboard';
import Wizard from "./app/screens/Wizard/Wizard";
import AddMeal from './app/screens/AddMeal/AddMeal';
import ScanBarcode from "./app/screens/ScanBarcode/ScanBarcode";

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
          <Stack.Screen
            name="AddMeal"
            options={{ title: "Add meal" }} // set custom screen title
          >
            {
              (props) => <AddMeal {...props} />
            }
          </Stack.Screen>
          <Stack.Screen
            name="ScanBarcode"
            options={{ title: "Scan barcode" }} // set custom screen title
          >
            {
              (props) => <ScanBarcode {...props} />
            }
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

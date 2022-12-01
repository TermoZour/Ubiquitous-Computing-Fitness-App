import {Text, View} from "react-native";
import {Button} from "react-native-paper";

export default function Wizard({ navigation }) {
  return(
    <View>
      <Text>Wizard screen here</Text>
      <Button onPress={() => navigation.navigate('ScanBarcode')}
      >Stuff</Button>
    </View>
  )
}
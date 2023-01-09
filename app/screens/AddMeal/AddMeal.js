import { ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";

export default function AddMeal({ route, navigation }) {
  const { mealType, mealData } = route.params
  console.log(mealType);
  console.log(mealData);

  return (
    <ScrollView>
      <Text>{mealType}</Text>
      <Button>Add meal</Button>
    </ScrollView>
  )
}
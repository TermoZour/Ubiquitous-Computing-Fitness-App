import { useEffect } from "react";
import { View } from "react-native";
import { Divider, Text } from "react-native-paper";

export default function MealEntry({ meal }) {
  // useEffect(() => {
  //   console.log("MealEntry:");
  //   console.log(meal);
  // }, [])

  return (
    <View>
      <Text variant="bodyLarge">{meal.name}</Text>
      <Text >{meal.energy} kcal</Text>
      <Text >{meal.grams}g</Text>
      <Text >{meal.servings} servings</Text>
      <Divider style={{ marginTop: 5 }} />
    </View>
  )
}
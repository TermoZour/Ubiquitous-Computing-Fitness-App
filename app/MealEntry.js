import { useEffect } from "react";
import { View } from "react-native";
import { Text, Title } from "react-native-paper";

export default function MealEntry({ meal }) {
  useEffect(() => {
    console.log("Meal entry:");
    console.log(meal);
  }, [])

  return (
    <View>
      <Text variant="titleLarge">{meal.name}</Text>
      <Text>{meal.energy} kcal</Text>
      <Text>{meal.grams}g</Text>
      <Text>{meal.servings} servings</Text>
    </View>
  )
}
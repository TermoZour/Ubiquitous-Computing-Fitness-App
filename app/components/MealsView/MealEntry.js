import { useEffect } from "react";
import { View } from "react-native";
import { Divider, Text } from "react-native-paper";

export default function MealEntry({ meal, entry }) {
  // useEffect(() => {
  //   console.log("meal:");
  //   console.log(meal);
  //   console.log("entry:");
  //   console.log(entry);
  // }, [])

  return (
    <View>
      <Text variant="bodyLarge">{meal.name}</Text>
      {/* calories intake */}
      {entry.isGrams ?
        <Text>{entry.amount / meal.energy_per_100g}kcal</Text> :
        <Text>{entry.amount * meal.energy_per_serving}kcal</Text>
      }

      {/* grams intake */}
      {entry.isGrams ?
        <Text>{entry.amount}g</Text> :
        <Text>{entry.amount} {entry.amount > 1 ? "servings" : "serving"} ({meal.grams / meal.servings * entry.amount}g)</Text>
      }

      {/* <Text >{meal.servings} {meal.servings > 1 ? "servings" : "serving"}</Text> */}
      <Divider style={{ marginTop: 5 }} />
    </View>
  )
}
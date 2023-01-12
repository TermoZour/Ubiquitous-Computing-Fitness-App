import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Title, Button } from "react-native-paper";
import { MEAL_DB } from "../../constants/StorageKeys";

import MealEntry from "./MealEntry";

export default function MealsView({ mealData, year, month, day, navigation }) {
  const [breakfast, setBreakfast] = useState([]); // used to store breakfast meals
  const [morningSnack, setMorningSnack] = useState([]); // used to store morning snacks
  const [lunch, setLunch] = useState([]); // used to store lunch meals
  const [afternoonSnack, setAfternoonSnack] = useState([]); // used to store afternoon snacks
  const [dinner, setDinner] = useState([]); // used to store dinner meals
  const [mealDatabase, setMealDatabase] = useState(null); // used to store meals database

  const fetchMealDatabase = async () => {
    try {
      const mealDatabase = await AsyncStorage.getItem(MEAL_DB);
      if (mealDatabase !== null) {
        setMealDatabase(JSON.parse(mealDatabase));
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch meal database");
    }
  }

  // initialize meals database
  useEffect(() => {
    fetchMealDatabase();
  }, [])


  useEffect(() => {
    if (mealData != null && mealDatabase != null) {
      // go through each meal type (breakfast, lunch, dinner, etc)
      for (const entry in mealData) {
        if (mealData[entry] != null) {
          // go through each individual entry of said meal type
          let newMealData = []
          for (const mealEntry of mealData[entry]) {
            const meal = mealDatabase.find(entry => entry.id === mealEntry.id)
            const data = {
              "meal": meal,
              "entry": mealEntry
            }

            newMealData = [...newMealData, data];
          }

          // add meal data to correct meal category
          switch (entry) {
            case "breakfast":
              setBreakfast(newMealData);
              break;
            case "morning_snack":
              setMorningSnack(newMealData);
              break;
            case "lunch":
              setLunch(newMealData);
              break;
            case "afternoon_snack":
              setAfternoonSnack(newMealData);
              break;
            case "dinner":
              setDinner(newMealData);
              break;
          }
        }
      }
    }
  }, [mealDatabase])


  return (
    <View style={{ flex: 1 }}>
      <Card style={styles.mealCard}>
        <Card.Content>
          <Title>Breakfast</Title>
          {mealData != null && breakfast.length > 0 ? breakfast.map((data, index) => <MealEntry key={index} meal={data.meal} entry={data.entry} />) : <Text>No meal recorded.</Text>}
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.replace("AddMeal", { mealType: "breakfast", year: year, month: month, day: day })}>Add meal</Button>
        </Card.Actions>
      </Card>
      <Card style={styles.mealCard} mode="contained">
        <Card.Content>
          <Title>Morning Snack</Title>
          {mealData != null && morningSnack.length > 0 ? morningSnack.map((data, index) => <MealEntry key={index} meal={data.meal} entry={data.entry} />) : <Text>No meal recorded.</Text>}
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.replace("AddMeal", { mealType: "morning_snack", year: year, month: month, day: day })}>Add meal</Button>
        </Card.Actions>
      </Card>
      <Card style={styles.mealCard}>
        <Card.Content>
          <Title>Lunch</Title>
          {mealData != null && lunch.length > 0 ? lunch.map((data, index) => <MealEntry key={index} meal={data.meal} entry={data.entry} />) : <Text>No meal recorded.</Text>}
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.replace("AddMeal", { mealType: "lunch", year: year, month: month, day: day })}>Add meal</Button>
        </Card.Actions>
      </Card>
      <Card style={styles.mealCard} mode="contained">
        <Card.Content>
          <Title>Afternoon Snack</Title>
          {mealData != null && afternoonSnack.length > 0 ? afternoonSnack.map((data, index) => <MealEntry key={index} meal={data.meal} entry={data.entry} />) : <Text>No meal recorded.</Text>}
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.replace("AddMeal", { mealType: "afternoon_snack", year: year, month: month, day: day })}>Add meal</Button>
        </Card.Actions>
      </Card>
      <Card style={styles.mealCard}>
        <Card.Content>
          <Title>Dinner</Title>
          {mealData != null && dinner.length > 0 ? dinner.map((data, index) => <MealEntry key={index} meal={data.meal} entry={data.entry} />) : <Text>No meal recorded.</Text>}
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.replace("AddMeal", { mealType: "dinner", year: year, month: month, day: day })}>Add meal</Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  mealCard: {
    marginBottom: 10,
    marginStart: 10,
    marginEnd: 10
  },
})
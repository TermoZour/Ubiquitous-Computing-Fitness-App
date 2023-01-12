import { useEffect, useState } from "react"
import { MEAL_DB } from "../../constants/StorageKeys";
import VerticalBarGraph from "./VerticalBarGraph";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function IntakeGraph({ mealData }) {
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fibre, setFibre] = useState(0);
  const [mealDb, setMealDb] = useState(null);

  const getMealDb = async () => {
    try {
      const mealDatabase = JSON.parse(await AsyncStorage.getItem(MEAL_DB));
      setMealDb(mealDatabase);
    } catch (e) {
      console.error(e);
      alert("Failed to fetch meal database");
    }
  }

  // initialize the meals database
  useEffect(() => {
    getMealDb();
  }, [])

  const getMeal = async (mealId) => {
    try {
      const mealDatabase = JSON.parse(await AsyncStorage.getItem(MEAL_DB));
      // console.log("fetched meal database");
      // console.log(mealDatabase);
      const meal = mealDatabase.find(entry => entry.id == mealId);
      if (meal != null) {
        // console.log("found meal for ID " + mealId);
        // console.log(meal);
        return meal;


      } else {
        alert("Meal ID " + mealId + " not in database.");
        console.log("Meal ID " + mealId + " not in database.");
        return null;
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch meal database");
    }
  }

  const computeMeals = async () => {
    console.log("Graph meal data: ");
    console.log(mealData);
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFibre = 0;

    for (const category in mealData) {
      const mealEntries = mealData[category];

      if (mealEntries != null) {
        for (const mealEntry of mealEntries) {
          console.log(mealEntry);
          const mealId = mealEntry.id;
          const mealAmount = mealEntry.amount;
          const mealIsGrams = mealEntry.isGrams;

          const meal = await getMeal(mealId);
          console.log(meal);
          if (mealIsGrams) {
            // calculating based on grams
            totalProtein += (mealAmount * meal.protein_per_100g) / 100;
            totalCarbs += (mealAmount * meal.carbs_per_100g) / 100;
            totalFibre += (mealAmount * meal.fibre_per_100g) / 100;

          } else {
            // calculating based on servings

            totalProtein += meal.protein_per_serving * mealAmount;
            totalCarbs += meal.carbs_per_serving * mealAmount;
            totalFibre += meal.fibre_per_serving * mealAmount;
          }

        }
      }
    }

    setProtein(totalProtein);
    setCarbs(totalCarbs);
    setFibre(totalFibre);
    console.log("total protein: " + totalProtein);
    console.log("total carbs: " + totalCarbs);
    console.log("total fibre: " + totalFibre);
  }

  useEffect(() => {
    if (mealDb != null) {
      computeMeals();
    }
  }, [mealDb])

  return (
    <VerticalBarGraph
      columns={[
        { title: "protein", value: protein, color: "#ff0000" },
        { title: "carbs", value: carbs, color: "#00ff00" },
        { title: "fibre", value: fibre, color: "#ffff00" }]}
      maxRange="200" />
  )
}
import { useEffect, useState } from "react"
import { MEAL_DB } from "../../constants/StorageKeys";
import VerticalBarGraph from "./VerticalBarGraph";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function IntakeGraph({ mealData }) {
  const [mealDb, setMealDb] = useState(null);
  const [columns, setColumns] = useState([]);
  const [maxHeight, setMaxHeight] = useState(0);

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

    let columns = [
      { title: "protein", value: totalProtein, color: "#ff0000", percentage: 0 },
      { title: "carbs", value: totalCarbs, color: "#00ff00", percentage: 0 },
      { title: "fibre", value: totalFibre, color: "#ffff00", percentage: 0 }
    ]

    let tempMaxRange = 0;
    for (const column of columns) {
      if (column.value > tempMaxRange)
        tempMaxRange = column.value;
    }

    for (const column of columns) {
      if (column.value != tempMaxRange) {
        // console.log(column.value + " is " + (column.value / tempMaxRange) * 100 + " out of " + tempMaxRange);
        column.percentage = parseInt((column.value / tempMaxRange) * 100);
      } else {
        column.percentage = 100;
      }
    }

    setColumns(columns);
    setMaxHeight(200);
  }

  useEffect(() => {
    if (mealDb != null) {
      computeMeals();
    }
  }, [mealDb])

  return (
    <VerticalBarGraph
      columns={columns}
      maxHeight={maxHeight} />
  )
}
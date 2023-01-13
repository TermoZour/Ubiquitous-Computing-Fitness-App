import { useEffect, useState } from "react"
import { MEAL_DB } from "../../constants/StorageKeys";
import VerticalBarGraph from "./VerticalBarGraph";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function IntakeGraph({ mealData }) {
  const [mealDb, setMealDb] = useState(null); // used to store meal database
  const [columns, setColumns] = useState([]); // used to store the 3 columns of the graph - protein, carbs, fibre
  const [maxHeight, setMaxHeight] = useState(0); // used to store max height of the Intake Graph box

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

  // fetch meal from database given an ID (or barcode)
  const getMeal = async (mealId) => {
    try {
      const mealDatabase = JSON.parse(await AsyncStorage.getItem(MEAL_DB));
      const meal = mealDatabase.find(entry => entry.id == mealId);

      if (meal != null) {
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

  // calculate the 3 columns based on data gathered from user and meal database
  const computeMeals = async () => {
    let totalProtein = 0; // column 1
    let totalCarbs = 0; // column 2
    let totalFibre = 0; // column 3

    for (const category in mealData) { // for every meal category (breakfast, lunch, dinner, etc)
      const mealEntries = mealData[category];

      if (mealEntries != null) {
        for (const mealEntry of mealEntries) { // for every meal in a category
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

    // calculate how big a column can be in percentage in relation to the biggest column
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
      column.value = column.value.toFixed(2);
    }

    setColumns(columns);
    setMaxHeight(200); // set height of the graph view box
  }

  useEffect(() => {
    if (mealDb != null) {
      computeMeals();
    }
  }, [mealDb, mealData])

  return (
    <VerticalBarGraph
      columns={columns}
      maxHeight={maxHeight} />
  )
}
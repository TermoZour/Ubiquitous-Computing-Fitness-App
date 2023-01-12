import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, ActivityIndicator } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WIZARD_STATUS, WIZARD_NAME, WIZARD_TRUE_STATE, DayEntry, MEAL_DB, mealDatabase } from '../../constants/StorageKeys';

import VerticalBarGraph from '../../components/VerticalBarGraph/VerticalBarGraph';
import MealsView from '../../components/MealsView/MealsView';
import { MealEntry } from '../../constants/StorageKeys';

export default function Dashboard({ navigation }) {
  const [isStartingUp, setIsStartingUp] = useState(true);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [mealData, setMealData] = useState();
  const [isLoadingMealData, setIsLoadingMealData] = useState(true);

  const checkWizardStatus = async () => {
    try {
      const wizardState = await AsyncStorage.getItem(WIZARD_STATUS);
      if (wizardState == WIZARD_TRUE_STATE) {
        console.log("Wizard done");
        setIsStartingUp(false);
      } else {
        setIsStartingUp(true);
        console.log("wizard state not set");
        navigation.replace("Wizard");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch wizard status");
    }
  }

  const getName = async () => {
    try {
      const name = await AsyncStorage.getItem(WIZARD_NAME);
      if (name !== null) {
        setName(name);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch name");
    }
  }

  // get meal data from AsyncStorage to later be used for components
  const getMealData = async () => {
    try {
      month = "";
      if (date.getMonth() + 1 <= 9) {
        month = "0" + (date.getMonth() + 1);
      }

      console.log(`Fetching data from ${date.getFullYear()}${month}`);
      const data = await AsyncStorage.getItem("" + date.getFullYear() + month);
      if (data !== null) {
        // console.log("Meal data from Dashboard: ");
        // console.log(data);
        // console.log(`Today's day is: ${date.getDate()}`);
        setMealData(JSON.parse(data)[date.getDate() - 1]);
        setIsLoadingMealData(false);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch meal data");
    }
  }


  useEffect(() => {
    checkWizardStatus();

    getName();

    console.log(`Today's date: ${date}`);

    getMealData();

    const dayEntry = new DayEntry([new MealEntry(0, 4, false)], null, [new MealEntry(0, 4, false)], null, null);
    AsyncStorage.setItem("202301", JSON.stringify([null, null, null, null, null, null, null, null, null, null, null, dayEntry]));
    AsyncStorage.setItem(MEAL_DB, JSON.stringify(mealDatabase));
    // AsyncStorage.removeItem("202301");
  }, [date])

  function increaseDate() {
    const nowDay = date.getDate();
    const newDate = new Date()

    newDate.setDate(nowDay + 1);

    setDate(newDate);
  }

  function decreaseDate() {
    const nowDay = date.getDate();
    const newDate = new Date()

    newDate.setDate(nowDay - 1);

    setDate(newDate);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isStartingUp ? <ActivityIndicator /> :
        <ScrollView
        // stickyHeaderIndices={[1]}  // the header gets weird UI when this is set
        >
          <View style={{ marginStart: 10, marginEnd: 10 }}>
            <Text variant="headlineLarge">Hello, {name}</Text>

            {/* <IntakeGraph mealData={mealData} /> */}
            <VerticalBarGraph
              columns={[
                { title: "protein", value: 120, color: "#ff0000" },
                { title: "carbs", value: 30, color: "#00ff00" },
                { title: "fibre", value: 75, color: "#0000ff" }]}
              maxRange="200" />
          </View>

          <View style={styles.mealsHeaderContainer}>
            <IconButton icon="arrow-left" onPress={() => decreaseDate()} />
            <Text style={styles.mealsHeaderText} variant="headlineSmall">Meals of </Text>
            <Text style={styles.mealsHeaderText} variant="headlineSmall">{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
            <IconButton icon="arrow-right" onPress={() => increaseDate()} />
          </View>

          {isLoadingMealData ? <></> : <MealsView mealData={mealData} navigation={navigation} />}
        </ScrollView>
      }
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  mealsHeaderContainer: {
    flexDirection: "row"
  },
  mealsHeaderText: {
    alignSelf: 'center'
  }
})
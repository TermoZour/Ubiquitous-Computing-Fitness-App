import { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Button, Card, Title, IconButton } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WIZARD_STATUS, WIZARD_NAME, WIZARD_TRUE_STATE, DayEntry, Meal } from './StorageKeys';

import VerticalBarGraph from './VerticalBarGraph';
import MealsView from './MealsView';

export default function Dashboard({ navigation }) {
  const [wizardDone, setWizardDone] = useState(true);
  const [name, setName] = useState("Human");
  const [date, setDate] = useState(new Date());
  const [mealData, setMealData] = useState(null);

  const checkWizardStatus = () => {
    try {
      const wizardState = AsyncStorage.getItem(WIZARD_STATUS);
      if (wizardState == WIZARD_TRUE_STATE) {
        console.log(wizardState);
        setWizardDone(true);
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
        console.log("Meal data from Dashboard: ");
        console.log(data);
        console.log(`Today's day is: ${date.getDate()}`);
        setMealData(JSON.parse(data)[date.getDate() - 1]);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch meal data");
    }
  }


  useEffect(() => {
    checkWizardStatus();
    if (!wizardDone) {// TODO: Fix wizard error. Somehow the state is not set to true before this check.
      console.log("Setup wizard not done.")
      navigation.navigate("Wizard")
    }
    getName();

    console.log(`Today's date: ${date}`);

    getMealData();

    const day2Entry = new DayEntry([new Meal("Sandwich")], [], [new Meal("Soup")], [], [])
    AsyncStorage.setItem("202301", JSON.stringify([null, null, null, null, null, null, null, null, day2Entry]));
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
    <View style={{ flex: 1 }}>
      <View style={{ marginStart: 10, marginEnd: 10 }}>
        <Text variant="headlineLarge">Hello, {name}</Text>

        {/* <IntakeGraph mealData={mealData} /> */}
        <VerticalBarGraph
          columns={[
            { title: "protein", value: 120, color: "#ff0000" },
            { title: "carbs", value: 30, color: "#00ff00" },
            { title: "fiber", value: 45, color: "#0000ff" }]}
          maxRange="200" />
      </View>

      <View style={styles.mealsHeaderContainer}>
        <IconButton icon="arrow-left" onPress={() => decreaseDate()} />
        <Text style={styles.mealsHeaderText} variant="headlineSmall">Meals of </Text>
        <Text style={styles.mealsHeaderText} variant="headlineSmall">{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
        <IconButton icon="arrow-right" onPress={() => increaseDate()} />
      </View>

      <MealsView mealData={mealData} />

      <Button onPress={() => navigation.navigate('ScanBarcode')}>Stuff</Button>
    </View>
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
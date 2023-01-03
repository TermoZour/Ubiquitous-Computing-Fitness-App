import { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Button, Card, Title, IconButton } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WIZARD_STATUS, WIZARD_NAME, WIZARD_TRUE_STATE, DayEntry, Meal } from './StorageKeys';

import VerticalBarGraph from './VerticalBarGraph';

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
      console.log(`Fetching data from ${date.getFullYear + (date.getMonth + 1)}`);
      const data = await AsyncStorage.getItem(date.getFullYear + (date.getMonth + 1));
      if (data !== null) {
        // update states
        setMealData(data);
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

    console.log(`Today's date: ${date}`)

    const data = {
      'week': 1,
      'breakfast': [
        {
          'name': 'sandwich',
          'grams': 0,
          'portions': 0,
          'carbs': 0,
          'fiber': 0,
          'protein': 0,
        }
      ],
      'morning_snack': [{}],
      'lunch': [{}],
      'afternoon_snack': [{}],
      'dinner': [{}]
    }
    const dayEntry = new DayEntry(1, 3, new Meal("Sandwich"))
    // AsyncStorage.setItem("202312", JSON.stringify(data))
    AsyncStorage.removeItem("202212");
  }, [])

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text variant="headlineLarge">Hello, {name}</Text>

      <VerticalBarGraph
        columns={[
          { title: "protein", value: 120, color: "#ff0000" },
          { title: "carbs", value: 30, color: "#00ff00" },
          { title: "fiber", value: 45, color: "#0000ff" }]}
        maxRange="200" />

      <View style={styles.mealsHeaderContainer}>
        <IconButton icon="arrow-left" />
        <Text style={styles.mealsHeaderText} variant="headlineSmall">Meals of </Text>
        <Text style={styles.mealsHeaderText} variant="headlineSmall">{date.getDay() + 1}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
        <IconButton icon="arrow-right" />
      </View>

      <ScrollView>
        <Card key='0'>
          <Card.Content>
            <Title>Breakfast</Title>
          </Card.Content>
          <Card.Actions>
            <Button>Add meal</Button>
          </Card.Actions>
        </Card>
        <Card key='1' mode="contained">
          <Card.Content>
            <Title>Morning Snack</Title>
          </Card.Content>
          <Card.Actions>
            <Button>Add meal</Button>
          </Card.Actions>
        </Card>
        <Card key='2'>
          <Card.Content>
            <Title>Lunch</Title>
          </Card.Content>
          <Card.Actions>
            <Button>Add meal</Button>
          </Card.Actions>
        </Card>
        <Card key='3' mode="contained">
          <Card.Content>
            <Title>Afternoon Snack</Title>
          </Card.Content>
          <Card.Actions>
            <Button>Add meal</Button>
          </Card.Actions>
        </Card>
        <Card key='4'>
          <Card.Content>
            <Title>Dinner</Title>
          </Card.Content>
          <Card.Actions>
            <Button>Add meal</Button>
          </Card.Actions>
        </Card>
      </ScrollView>


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
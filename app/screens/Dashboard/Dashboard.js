import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, ActivityIndicator } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WIZARD_STATUS, WIZARD_NAME, WIZARD_TRUE_STATE, MEAL_DB, mealDatabase, WIZARD_PROGRAM, WIZARD_WEIGHT } from '../../constants/StorageKeys';

import MealsView from '../../components/MealsView/MealsView';
import IntakeGraph from '../../components/VerticalBarGraph/IntakeGraph';
import Targets from '../../components/Targets/Targets';

export default function Dashboard({ navigation }) {
  const [isStartingUp, setIsStartingUp] = useState(true); // used to check for onboarding

  const [userName, setUserName] = useState(""); // user name from onboarding
  const [userProgram, setUserProgram] = useState(""); // user program from onboarding
  const [userWeight, setUserWeight] = useState(""); // user weight from onboarding

  const [date, setDate] = useState(new Date());
  const [mealData, setMealData] = useState(); // meal data for a given day of the year
  const [isLoadingMealData, setIsLoadingMealData] = useState(true); // used to check when meal data is loading from AsyncStorage to avoid null exceptions

  const [headerStyle, setHeaderStyle] = useState(styles.mealsHeaderContainer); // used to switch date header style when stickied or not

  // check if enrolment is completed
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

  // get user name from enrolment
  const getUser = async () => {
    try {
      const userName = await AsyncStorage.getItem(WIZARD_NAME);
      const userProgram = await AsyncStorage.getItem(WIZARD_PROGRAM);
      const userWeight = await AsyncStorage.getItem(WIZARD_WEIGHT);

      if (userName !== null) {
        setUserName(userName);
      }

      if (userProgram !== null) {
        setUserProgram(userProgram);
      }

      if (userWeight !== null) {
        setUserWeight(userWeight);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch user data");
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
        setMealData(JSON.parse(data)[date.getDate() - 1]);
        setIsLoadingMealData(false);

      } else { // we have no meal data for this year & month combo
        try {
          // initialize empty data
          const emptyArr = new Array(31).fill(null);
          AsyncStorage.setItem("" + date.getFullYear() + month, JSON.stringify(emptyArr));
          setMealData(emptyArr);

        } catch (e) {
          console.error(e);
          alert("Failed to set empty meal data");
        }
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch meal data");
    }
  }


  useEffect(() => {
    checkWizardStatus();

    getUser();

    console.log(`Today's date: ${date}`);

    getMealData();

    // initialize meal products database
    AsyncStorage.setItem(MEAL_DB, JSON.stringify(mealDatabase));
    // AsyncStorage.clear();
  }, [date])

  // change selected Dashboard date
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
          stickyHeaderIndices={[1]} // select first child of ScrollView as sticky
          onScroll={event => { // check when user scrolled at least 240px in order to detect when date header reached sticky position
            const y = event.nativeEvent.contentOffset.y;
            if (y >= 240) {
              setHeaderStyle(styles.mealsHeaderContainerSticky);
              // TODO: change navigation header shadow to 0
            } else {
              setHeaderStyle(styles.mealsHeaderContainer);
            }
          }}
        >
          <View style={{ marginStart: 10, marginEnd: 10 }}>
            <Text variant="headlineLarge">Hello, {userName}</Text>

            {isLoadingMealData ? <ActivityIndicator /> :
              <Targets mealData={mealData} userWeight={userWeight} userProgram={userProgram} />
            }

            {isLoadingMealData ? <ActivityIndicator /> :
              <IntakeGraph mealData={mealData} />
            }

          </View>

          <View>
            <View style={headerStyle}>
              <IconButton icon="arrow-left" onPress={() => decreaseDate()} />
              <Text style={styles.mealsHeaderText} variant="headlineSmall">Meals of </Text>
              <Text style={styles.mealsHeaderText} variant="headlineSmall">{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
              <IconButton icon="arrow-right" onPress={() => increaseDate()} />
            </View>
          </View>
          keyboardType="number-pad"
          {isLoadingMealData ?
            <ActivityIndicator /> :
            <MealsView mealData={mealData} year={date.getFullYear()} month={"" + (date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1)} day={date.getDate()} navigation={navigation} />}
        </ScrollView>
      }
    </GestureHandlerRootView >
  )
}

const styles = StyleSheet.create({
  mealsHeaderContainer: {
    flexDirection: "row"
  },
  mealsHeaderContainerSticky: {
    flexDirection: "row",
    backgroundColor: '#cccccc',
    elevation: 4
  },
  mealsHeaderText: {
    alignSelf: 'center'
  }
})
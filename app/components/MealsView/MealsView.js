import { useEffect, useState, useRef, useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Card, Title, Button, Portal, Modal } from "react-native-paper";

import MealEntry from "./MealEntry";

export default function MealsView({ mealData, navigation }) {
  const [breakfast, setBreakfast] = useState([]);
  const [morningSnack, setMorningSnack] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [afternoonSnack, setAfternoonSnack] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [visible, setVisible] = useState(false);


  const showModal = (mealType) => {
    console.log(mealType);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  useEffect(() => {
    // search for data in asyncstorage based on current date.
    // if data not found, create empty entry
    // if data is found, read it and make the UI
    // console.log(mealData);
  },)

  useEffect(() => {
    // console.log("MealsView:");
    // console.log(mealData);

    if (mealData != null) {
      setBreakfast(mealData.breakfast);
      setMorningSnack(mealData.morning_snack);
      setLunch(mealData.lunch);
      setAfternoonSnack(mealData.afternoon_snack);
      setDinner(mealData.dinner);
    }
  })

  /*
  make add meal button create a modal (or new activity) which can take manual data of meal based on class input
  or a scan button function which will scan for the tag that will automatically fill in the data from database
  meal data will be stored based on month of year.
  */

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Card style={styles.mealCard} key='0'>
          <Card.Content>
            <Title>Breakfast</Title>
            {mealData != null ? breakfast.map(entry => <MealEntry meal={entry} />) : <Text>No meal recorded.</Text>}
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate("AddMeal", { mealType: "breakfast", mealData: mealData.breakfast })}>Add meal</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.mealCard} key='1' mode="contained">
          <Card.Content>
            <Title>Morning Snack</Title>
            {mealData != null && morningSnack.length > 0 ? morningSnack.map(entry => <MealEntry meal={entry} />) : <Text>No meal recorded.</Text>}
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate("AddMeal", { mealType: "morning_snack", mealData: mealData.morning_snack })}>Add meal</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.mealCard} key='2'>
          <Card.Content>
            <Title>Lunch</Title>
            {mealData != null && lunch.length > 0 ? lunch.map(entry => <MealEntry meal={entry} />) : <Text>No meal recorded.</Text>}
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate("AddMeal", { mealType: "lunch", mealData: mealData.lunch })}>Add meal</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.mealCard} key='3' mode="contained">
          <Card.Content>
            <Title>Afternoon Snack</Title>
            {mealData != null && afternoonSnack.length > 0 ? afternoonSnack.map(entry => <MealEntry meal={entry} />) : <Text>No meal recorded.</Text>}
          </Card.Content>
          <Card.Actions>
            <Button>Add meal</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.mealCard} key='4'>
          <Card.Content>
            <Title>Dinner</Title>
            {mealData != null && dinner.length > 0 ? dinner.map(entry => <MealEntry meal={entry} />) : <Text>No meal recorded.</Text>}
          </Card.Content>
          <Card.Actions>
            <Button>Add meal</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      {/* <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
      >
        <BottomSheetView>
          <Text>Add breakfast</Text>
        </BottomSheetView>
      </BottomSheet> */}
    </View>
  )
}

const styles = StyleSheet.create({
  mealCard: {
    // margin: 10
    // marginTop: 10,
    marginBottom: 10,
    marginStart: 10,
    marginEnd: 10
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20
  }
})
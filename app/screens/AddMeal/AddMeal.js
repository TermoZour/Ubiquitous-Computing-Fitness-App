import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useLayoutEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, FAB, TextInput, Card, IconButton, SegmentedButtons } from "react-native-paper";
import { MEAL_DB } from "../../constants/StorageKeys";

export default function AddMeal({ route, navigation }) {
  const { mealType, year, month, day } = route.params

  const [mealName, setMealName] = useState("");
  const [mealTotalGrams, setMealTotalGrams] = useState("");
  const [mealTotalServings, setMealTotalServings] = useState("");

  const [mealCalories100, setMealCalories100] = useState("");
  const [mealCarbs100, setMealCarbs100] = useState("");
  const [mealFibre100, setMealFibre100] = useState("");
  const [mealProtein100, setMealProtein100] = useState("");

  const [mealCaloriesServing, setMealCaloriesServing] = useState("");
  const [mealCarbsServing, setMealCarbsServing] = useState("");
  const [mealFibreServing, setMealFibreServing] = useState("");
  const [mealProteinServing, setMealProteinServing] = useState("");

  const [mealId, setMealId] = useState(null);

  const [isGrams, setIsGrams] = useState(true);
  const [amount, setAmount] = useState("");

  const addMealEntry = async () => {
    const yearMonthEntry = year + month; // store the key used to access a month entry from user database (ex: "202301")

    try {
      // get data for a given year&month combo
      let data = JSON.parse(await AsyncStorage.getItem(yearMonthEntry));

      if (data !== null) {
        // check if meals have been added for this day
        if (data[day - 1] != null) {
          let dayEntry = data[day - 1]; // get meals of today

          if (dayEntry[mealType] != null) { // check if mealType (ex: "breakfast") has any entries
            console.log("Found meals for " + mealType);
            console.log(dayEntry[mealType]);
            dayEntry[mealType].push({ "amount": amount, "id": mealId, "isGrams": isGrams });
            try {
              await AsyncStorage.setItem(yearMonthEntry, JSON.stringify(data));
              navigation.replace("Dashboard");
            } catch (e) {
              console.error(e);
              alert("Failed to store meal data");
            }
          } else {
            console.log("No meal added for " + mealType);
            try {
              // no meal data found, initializing entry now
              console.log("Setting meal data to AsyncStorage:");

              data[day - 1][mealType] = [{ "amount": amount, "id": mealId, "isGrams": isGrams }]
              console.log(JSON.stringify(data));
              await AsyncStorage.setItem(yearMonthEntry, JSON.stringify(data));
              navigation.replace("Dashboard");
            } catch (e) {
              console.error(e);
              alert("Failed to store meal data");
            }
          }
        } else {
          // no meals added for this day
          data[day - 1] = { "breakfast": [], "morning_snack": [], "lunch": [], "afternoon_snack": [], "dinner": [] };
          data[day - 1][mealType] = [{ "amount": amount, "id": mealId, "isGrams": isGrams }];

          try {
            await AsyncStorage.setItem(yearMonthEntry, JSON.stringify(data))
            navigation.replace("Dashboard");
          } catch (e) {
            console.error(e);
            alert("Failed to store first meal entry");
          }
        }
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch meal data");
    }
  }

  async function getMeal(barcodeId) {
    try {
      const mealDatabase = JSON.parse(await AsyncStorage.getItem(MEAL_DB));
      const meal = mealDatabase.find(entry => entry.id == barcodeId);

      if (meal != null) {
        console.log("found meal for ID " + barcodeId);
        console.log(meal.name);

        // autocomplete meal data
        setMealName(meal.name);
        setMealTotalGrams("" + meal.grams);
        setMealTotalServings("" + meal.servings);

        setMealCalories100("" + meal.energy_per_100g);
        setMealCarbs100("" + meal.carbs_per_100g);
        setMealFibre100("" + meal.fibre_per_100g);
        setMealProtein100("" + meal.protein_per_100g);

        setMealCaloriesServing("" + meal.energy_per_serving);
        setMealCarbsServing("" + meal.carbs_per_serving);
        setMealFibreServing("" + meal.fibre_per_serving);
        setMealProteinServing("" + meal.protein_per_serving);

        setMealId(barcodeId); // this is set so that the app knows how to add the data to the user's meals

      } else {
        alert("Meal ID " + barcodeId + " not in database.");
        console.log("Meal ID " + barcodeId + " not in database.");
      }
      return
    } catch (e) {
      console.error(e);
      alert("Failed to fetch meal database");
    }
  }

  useEffect(() => {
    const { barcodeId } = route.params;
    console.log("barcode ID from scan:");
    console.log(barcodeId);

    if (barcodeId != null) { // activity was started after a barcode was successfully scanned
      // search for barcode in database and autocomplete if found
      getMeal(barcodeId);
    }
  })

  // set custom back button to restore normal back behaviour, because navigation.replace() was used in order to force previous screen to refresh
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="arrow-left"
          onPress={() => { navigation.replace("Dashboard") }} />
      )
    })
  })


  return (
    <View>
      <ScrollView>
        <Text variant="headlineMedium" style={{ marginStart: 5 }}>{mealType.charAt(0).toUpperCase() + mealType.slice(1).replace("_", " ")}</Text>

        {/* Main information */}
        <Card style={{ margin: 5 }}>
          <Card.Title titleVariant="titleMedium" style={{ marginBottom: -15 }} title="Main information" />

          <Card.Content>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{ flex: 1 }}
                mode="outlined"
                label="Meal name"
                value={mealName}
                onChangeText={text => setMealName(text)}
              />
              <IconButton
                style={{ marginRight: 0, alignSelf: "center" }}
                icon="barcode-scan"
                mode="contained"
                onPress={() => navigation.replace('ScanBarcode', { mealType: mealType, year: year, month: month, day: day })}
              />
            </View>


            <TextInput
              mode="outlined"
              label="Total Grams"
              value={mealTotalGrams}
              placeholder="grams"
              onChangeText={text => setMealTotalGrams(text)}
            />
            <TextInput
              mode="outlined"
              label="Total Servings"
              value={mealTotalServings}
              placeholder="servings"
              onChangeText={text => setMealTotalServings(text)}
              keyboardType="number-pad"
            />

            <Text>How much did you eat?</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{ flex: 1 }}
                mode="outlined"
                label="Amount"
                value={amount}
                onChangeText={text => setAmount(text)}
                keyboardType="number-pad"
              />
              <SegmentedButtons
                value={isGrams}
                onValueChange={setIsGrams}
                style={{ marginTop: 5, marginStart: 5, alignSelf: "center" }}
                buttons={[
                  {
                    icon: 'scale',
                    value: true,
                    label: 'Grams',
                  },
                  {
                    icon: 'silverware-fork-knife',
                    value: false,
                    label: 'Servings',
                  },
                ]}
              />
            </View>
          </Card.Content>
        </Card>

        {/* Contents per 100g */}
        <Card style={{ margin: 5 }}>
          <Card.Title titleVariant="titleMedium" style={{ marginBottom: -15 }} title="Contents per 100g" />

          <Card.Content>
            <TextInput
              mode="outlined"
              label="Calories per 100g"
              value={mealCalories100}
              placeholder="grams"
              onChangeText={text => setMealCalories100(text)}
              keyboardType="decimal-pad"
            />
            <TextInput
              mode="outlined"
              label="Carbs per 100g"
              value={mealCarbs100}
              placeholder="grams"
              onChangeText={text => setMealCarbs100(text)}
              keyboardType="decimal-pad"
            />
            <TextInput
              mode="outlined"
              label="Fibre per 100g"
              value={mealFibre100}
              placeholder="grams"
              onChangeText={text => setMealFibre100(text)}
              keyboardType="decimal-pad"
            />
            <TextInput
              mode="outlined"
              label="Protein per 100g"
              value={mealProtein100}
              placeholder="grams"
              onChangeText={text => setMealProtein100(text)}
              keyboardType="decimal-pad"
            />
          </Card.Content>
        </Card>

        {/* Contents per serving */}
        <Card style={{ margin: 5 }}>
          <Card.Title titleVariant="titleMedium" style={{ marginBottom: -15 }} title="Contents per serving" />

          <Card.Content>
            <TextInput
              mode="outlined"
              label="Calories per serving"
              value={mealCaloriesServing}
              placeholder="grams"
              onChangeText={text => setMealCaloriesServing(text)}
              keyboardType="decimal-pad"
            />
            <TextInput
              mode="outlined"
              label="Carbs per serving"
              value={mealCarbsServing}
              placeholder="grams"
              onChangeText={text => setMealCarbsServing(text)}
              keyboardType="decimal-pad"
            />
            <TextInput
              mode="outlined"
              label="Fibre per serving"
              value={mealFibreServing}
              placeholder="grams"
              onChangeText={text => setMealFibreServing(text)}
              keyboardType="decimal-pad"
            />
            <TextInput
              mode="outlined"
              label="Protein per serving"
              value={mealProteinServing}
              placeholder="grams"
              onChangeText={text => setMealProteinServing(text)}
              keyboardType="decimal-pad"
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => addMealEntry()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
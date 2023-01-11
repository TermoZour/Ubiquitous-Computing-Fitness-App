import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, FAB, TextInput, Card, IconButton, SegmentedButtons } from "react-native-paper";

export default function AddMeal({ route, navigation }) {
  const { mealType, mealData } = route.params
  console.log(mealType);
  console.log(mealData);

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

  const [isGrams, setIsGrams] = useState(false);
  const [amount, setAmount] = useState("");


  return (
    <View>
      <ScrollView>
        <Text variant="headlineMedium" style={{ marginStart: 5 }}>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</Text>

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
                onPress={() => navigation.navigate('ScanBarcode')}
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
                    value: 'false',
                    label: 'Grams',
                  },
                  {
                    icon: 'silverware-fork-knife',
                    value: 'true',
                    label: 'Servings',
                  },
                ]}
              />
            </View>
          </Card.Content>
        </Card>

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
        onPress={() => console.log('Pressed')}
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
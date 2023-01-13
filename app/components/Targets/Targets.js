import { useEffect, useState } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { WIZARD_BURN, WIZARD_GAIN, WIZARD_MAINTAIN } from "../../constants/StorageKeys";

export default function Targets({ mealData, userWeight, userProgram }) {
  const [proteinTarget, setProteinTarget] = useState(0);
  const [carbsTarget, setCarbsTarget] = useState(0);
  const [fibreTarget, setFibreTarget] = useState(0);
  const [caloricTarget, setCaloricTarget] = useState(2200); // using constant for now


  useEffect(() => {
    switch ("" + userProgram) { // cast to string because of AsyncStorage keys restriction
      case WIZARD_MAINTAIN:
        console.log("Maintaining");
        // protein - userWeight*1 - 1g per kg of body weight
        setProteinTarget(parseInt(userWeight));

        // carbs - userWeight-(0.55*userWeight)
        setCarbsTarget(parseInt(userWeight - (0.55 * userWeight)));

        // calories - using constant for now

        // fibre - 14 g for every 1000 kcal per day
        setFibreTarget(parseInt(caloricTarget * 14 / 1000))

        break;
      case WIZARD_BURN:
        console.log("Burning");
        // protein - userWeight*2 - 2g per kg of body weight
        setProteinTarget(parseInt(userWeight * 2));

        // carbs - userWeight-(0.45*userWeight)
        setCarbsTarget(parseInt(userWeight - (0.45 * userWeight)));

        // calories - using constant for now

        // fibre - 14 g for every 1000 kcal per day
        setFibreTarget(parseInt(caloricTarget * 14 / 1000))

        break;
      case WIZARD_GAIN:
        console.log("Gaining");
        // protein - userWeight*3 - 3g per kg of body weight
        setProteinTarget(parseInt(userWeight * 3));

        // carbs - userWeight-(0.60*userWeight)
        setCarbsTarget(parseInt(userWeight - (0.60 * userWeight)));

        // calories - using constant for now

        // fibre - 14 g for every 1000 kcal per day
        setFibreTarget(parseInt(caloricTarget * 14 / 1000))

        break;
    }
  })

  return (
    <View>
      <Text>Caloric target: {caloricTarget} kcal</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 5 }}>
        <Card>
          <Card.Content>
            <Text>Protein target</Text>
            <Text style={{ alignSelf: "center" }}>{proteinTarget}g</Text>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Text>Carbs target</Text>
            <Text style={{ alignSelf: "center" }}>{carbsTarget}g</Text>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Text>Fibre target</Text>
            <Text style={{ alignSelf: "center" }}>{fibreTarget}g</Text>
          </Card.Content>
        </Card>
      </View>
    </View>

  )
}
import { useEffect, useLayoutEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";
import { IconButton } from 'react-native-paper';


export default function ScanBarcode({ route, navigation }) {
  const { mealType, mealData, year, month, day } = route.params // remember params from AddMeal so they can be added back
  // const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      await BarCodeScanner.requestPermissionsAsync();
      // setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.replace("AddMeal", { mealType: mealType, mealData: mealData, year: year, month: month, day: day, barcodeId: data });
  };

  // set custom back button to restore normal back behaviour
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="arrow-left"
          onPress={() => { navigation.replace("AddMeal", { mealType: mealType, mealData: mealData, year: year, month: month, day: day }); }} />
      )
    })
  })

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={["32"]}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    // aspectRatio: 3/2
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

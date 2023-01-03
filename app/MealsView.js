import { useEffect } from "react";
import { Text } from "react-native-paper";

export default function MealsView({ date }) {

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("202212");
      if (data !== null) {
        // update states
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch name");
    }
  }
  useEffect(() => {
    // search for data in asyncstorage based on current date.
    // if data not found, create empty entry
    // if data is found, read it and make the UI

  }, [])

  /*
  make add meal button create a modal (or new activity) which can take manual data of meal based on class input
  or a scan button function which will scan for the tag that will automatically fill in the data from database
  meal data will be stored based on month of year.
  */

  return (
    <Text>{date}</Text>
  )
}
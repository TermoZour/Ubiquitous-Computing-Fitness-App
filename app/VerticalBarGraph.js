import { StyleSheet, View, } from "react-native"
import VerticalBar from "./VerticalBar"

export default function VerticalBarGraph({ columns, maxRange }) {
  return (
    <View style={[styles.graphBackground, { height: parseInt(maxRange) }]}>
      {columns.map((column) =>
        <VerticalBar title={column["title"]} color={column["color"]} height={column["value"]} width="20" bottomText={column["value"] + "g"} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  graphBackground: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#a4a4a4",
    borderRadius: 10,
    paddingBottom: 10,
    paddingTop: 10,
    margin: 10
  }
})
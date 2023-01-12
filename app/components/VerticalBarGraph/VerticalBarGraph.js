import { StyleSheet } from "react-native"
import { Surface, Text } from "react-native-paper"
import VerticalBar from "./VerticalBar"

export default function VerticalBarGraph({ columns, maxHeight }) {
  return (
    <Surface style={[styles.graphBackground, { height: parseInt(maxHeight) }]}>
      {columns.every(((element) => element.value != 0)) ? columns.map((column, key) =>
        <VerticalBar
          key={key}
          title={column.title}
          color={column.color}
          height={column.percentage}
          width="20"
          bottomText={column.value + "g"} />
      ) : <Text style={{ alignSelf: "center" }}>Add a meal to begin.</Text>}
    </Surface>
  )
}

const styles = StyleSheet.create({
  graphBackground: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingBottom: 10,
    paddingTop: 10,
  }
})
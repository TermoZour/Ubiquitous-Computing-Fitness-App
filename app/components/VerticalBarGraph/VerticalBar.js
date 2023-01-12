import { View } from "react-native"
import { Card, Text } from "react-native-paper"

export default function VerticalBar({ title, color, height, width, bottomText }) {
  function regulateHeight(height) {
    if (height < 30) {
      return 30
    } else
      return height
  }

  return (
    <View style={{ alignSelf: "flex-end" }}>
      <Card style={{ alignSelf: "center", backgroundColor: color, height: `${regulateHeight(height) - 20}%`, width: parseInt(width) }}>
      </Card>
      <Text style={{ textAlign: "center" }}>{bottomText}</Text>
      <Text style={{ textAlign: "center" }}>{title}</Text>
    </View>
  )
}
import { View } from "react-native"
import { Card, Text } from "react-native-paper"

export default function VerticalBar({ title, color, height, width, bottomText }) {
  return (
    <View style={{ alignSelf: "flex-end" }}>
      <Card style={{ alignSelf: "center", backgroundColor: color, height: parseInt(height), width: parseInt(width) }}>
      </Card>
      <Text style={{ textAlign: "center" }}>{bottomText}</Text>
      <Text style={{ textAlign: "center" }}>{title}</Text>
    </View>
  )
}
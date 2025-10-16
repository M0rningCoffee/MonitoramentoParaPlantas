import { Text, View } from "react-native";
import Frame from "@/components/frame";


export default function Index() {
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx.</Text>
      <Frame onpress={ () => alert("clicou")}></Frame>

    </View>
  );
}

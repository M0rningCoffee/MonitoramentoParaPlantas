// app/index.tsx
import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter()
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>HOME - App carregado com sucesso</Text>

      <Button title="Ir para login" onPress={() => router.replace("/auth/login")} />
    </View>
  );
}

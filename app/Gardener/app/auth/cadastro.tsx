// app/auth/cadastro.tsx
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Cadastro() {
  const router = useRouter();
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>CADASTRO - se você ver isto, a rota funciona ✅</Text>
      <Button title="Voltar para login" onPress={() => router.replace("/auth/login")} />
    </View>
  );
}

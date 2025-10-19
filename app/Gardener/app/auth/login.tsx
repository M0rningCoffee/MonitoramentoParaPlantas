// app/auth/login.tsx
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>LOGIN - se você ver isto, a rota funciona ✅</Text>
      <Button title="Ir para cadastro" onPress={() => router.push("/auth/cadastro")} />
      <Button title="Ir para home (teste)" onPress={() => router.replace("/")} />
    </View>
  );
}

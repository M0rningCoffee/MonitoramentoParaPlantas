// app/_layout.js
import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login/login" />
      <Stack.Screen name="login/cadastro" />
      <Stack.Screen name="login/esqueciSenha" />
      <Stack.Screen name="dashboard/home" />
      <Stack.Screen name="monitoramento/plantDetail" />
    </Stack>
  );
}

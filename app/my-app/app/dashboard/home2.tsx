import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Logout", "Você será desconectado");
    router.replace("../login/login"); // volta para a tela de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>
      <Text style={styles.subtitle}>Seu login foi realizado com sucesso.</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
});

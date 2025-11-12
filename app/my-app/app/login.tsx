import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    // Aqui você pode integrar com Firebase, API etc.
    Alert.alert("Bem-vindo!", `Login realizado com sucesso: ${email}`);
    router.replace("/(tabs)"); // Redireciona para as abas após o login
  };

  return (
    <LinearGradient
      colors={["#d4f5e3", "#b0eacb", "#8bd7a5"]}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2906/2906840.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>PlantCare</Text>
        <Text style={styles.subtitle}>
          Cuidando das suas plantas com tecnologia 🌿
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#4b9460" />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#4b9460" />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Não tem conta? <Text style={styles.link}>Cadastre-se</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e6e4c",
  },
  subtitle: {
    fontSize: 14,
    color: "#3a7f58",
    textAlign: "center",
    marginTop: 5,
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#c5e6d0",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#4b9460",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    marginTop: 15,
    color: "#4b9460",
  },
  link: {
    fontWeight: "bold",
    color: "#2e6e4c",
  },
});

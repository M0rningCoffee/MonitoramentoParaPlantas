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

// 🎨 Importa estilos globais
import { colors, globalStyles, typography, spacing } from "../styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha e-mail e senha para continuar.");
      return;
    }

    Alert.alert("Bem-vindo!", `Login realizado com sucesso: ${email}`);
    router.replace("/(tabs)");
  };

  return (
    <LinearGradient
      colors={[colors.backgroundLight, colors.backgroundMedium, colors.backgroundDark]}
      style={globalStyles.container}
    >
      
      {/* 🔹 Logo e título */}
      <View style={localStyles.logoContainer}>
        <Image
  source={require("../assets/images/maconha.png")}
  style={localStyles.logo}
/>
        <Text style={typography.title}>Planabis</Text>
        <Text style={[typography.subtitle, { marginTop: spacing.xs }]}>
          Suas plantas na palma da mão 🌿
        </Text>
      </View>

      {/* 🔹 Formulário */}
      <View style={globalStyles.formContainer}>
        {/* Campo de E-mail */}
        <View style={globalStyles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color={colors.primary} />
          <TextInput
            style={globalStyles.input}
            placeholder="E-mail"
            placeholderTextColor={colors.textPlaceholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Campo de Senha */}
        <View style={globalStyles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.primary} />
          <TextInput
            style={globalStyles.input}
            placeholder="Senha"
            placeholderTextColor={colors.textPlaceholder}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {/* Botão de Entrar */}
        <TouchableOpacity style={localStyles.loginButton} onPress={handleLogin}>
          <Text style={localStyles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Esqueceu a senha */}
        <TouchableOpacity
          onPress={() => router.push("./esqueciSenha")}
          style={{ marginTop: spacing.sm }}
        >
          <Text style={typography.linkCenter}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Rodapé fixo */}
      <View style={localStyles.footerContainer}>
        <Text style={typography.body}>Não tem conta?</Text>
        <TouchableOpacity onPress={() => router.push("./cadastro")}>
          <Text style={typography.link}> Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

/* 🎨 Estilos locais aprimorados */
const localStyles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.lg,
    marginTop: spacing.xl,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing.sm,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  registerButtonTop: {
    position: "absolute",
    top: spacing.lg,
    left: spacing.lg,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  registerButtonText: {
    color: colors.primaryDark,
    fontWeight: "bold",
    fontSize: 14,
  },
});

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

// 🪴 Importando estilos globais e sistema de design
import { colors, globalStyles, typography, spacing } from "../styles";

export default function LoginScreen() {
  // Estados locais para e-mail e senha
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  // Função de login — aqui você pode integrar com API ou Firebase
  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha e-mail e senha para continuar.");
      return;
    }

    Alert.alert("Bem-vindo!", `Login realizado com sucesso: ${email}`);
    router.replace("/(tabs)"); // Redireciona após login
  };

  return (
    <LinearGradient
      // 🔹 Usa as cores do sistema centralizado
      colors={[colors.backgroundLight, colors.backgroundMedium, colors.backgroundDark]}
      style={globalStyles.container}
    >
      {/* Cabeçalho com logo e título */}
      <View style={localStyles.logoContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2906/2906840.png",
          }}
          style={localStyles.logo}
        />
        <Text style={typography.title}>PlantCare</Text>
        <Text style={[typography.subtitle, { marginTop: spacing.xs }]}>
          Cuidando das suas plantas com tecnologia 🌿
        </Text>
      </View>

      {/* Formulário de login */}
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

        {/* Botão principal */}
        <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
          <Text style={globalStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Esqueceu a senha */}
        <TouchableOpacity
          onPress={() => router.push("./esqueciSenha")}
          style={{ marginTop: spacing.sm }}
        >
          <Text style={typography.linkCenter}>Esqueceu senha?</Text>
        </TouchableOpacity>

        {/* Link de cadastro */}
        <View style={localStyles.footerContainer}>
          <Text style={typography.body}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => router.push("./cadastro")}>
            <Text style={typography.link}> Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

/* 🎨 Estilos locais — apenas o que é exclusivo dessa tela */
const localStyles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: spacing.sm,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.md,
  },
});

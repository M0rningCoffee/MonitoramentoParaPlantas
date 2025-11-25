import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, globalStyles, typography, spacing } from "../../styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = "http://10.0.0.105:8000/v1";

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha e-mail e senha para continuar.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Bem-vindo!", `Login realizado com sucesso: ${email}`);
        setEmail("");
        setSenha("");
        router.replace("/dashboard/home"); // redireciona para o dashboard
      } else {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.error || "Usuário ou senha incorretos");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[
        colors.backgroundLight,
        colors.backgroundMedium,
        colors.backgroundDark,
      ]}
      style={globalStyles.container}
    >
      {/* Logo e título */}
      <View style={localStyles.logoContainer}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={localStyles.logo}
        />
        <Text style={typography.title}>Planabis</Text>
        <Text style={[typography.subtitle, { marginTop: spacing.xs }]}>
          Suas plantas na palma da mão 🌿
        </Text>
      </View>

      {/* Formulário */}
      <View style={globalStyles.formContainer}>
        <View style={globalStyles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color={colors.primary} />
          <TextInput
            style={globalStyles.input}
            placeholder="E-mail ou Usuário"
            placeholderTextColor={colors.textPlaceholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

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

        <TouchableOpacity
          style={localStyles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={localStyles.loginButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        {/* Esqueceu a senha */}
        <TouchableOpacity
          onPress={() => router.push("./login/esqueciSenha")}
          style={{ marginTop: spacing.sm }}
        >
          <Text style={typography.linkCenter}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé */}
      <View style={localStyles.footerContainer}>
        <Text style={typography.body}>Não tem conta?</Text>
        <TouchableOpacity onPress={() => router.push("./login/cadastro")}>
          <Text style={typography.link}> Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

/* Estilos locais */
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
});

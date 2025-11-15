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
import { colors, globalStyles, typography, spacing } from "../../styles";

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
    // Se não houver home, só mostra o alerta
    // Se quiser navegar para home, use: router.replace("dashboard/home");
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
      {/* 🔹 Logo e título */}
      <View style={localStyles.logoContainer}>
        <Image
          source={require("../../assets/images/maconha.png")}
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
            placeholder="E-mail ou Usuário"
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
          onPress={() => router.push("login/esqueciSenha")}
          style={{ marginTop: spacing.sm }}
        >
          <Text style={typography.linkCenter}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        {/* Acesse o dashboard */}
                <TouchableOpacity
          onPress={() => router.push("dashboard/home")}
          style={{ marginTop: spacing.sm }}
        >
          <Text style={localStyles.dashboardButton}>ACESSE AQUI DASHBOARD</Text>
        </TouchableOpacity>

      </View>

      {/* 🔹 Rodapé fixo */}
      <View style={localStyles.footerContainer}>
        <Text style={typography.body}>Não tem conta?</Text>
        <TouchableOpacity onPress={() => router.push("login/cadastro")}>
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

  // Estilos para o botão de acessar o dashboard diretamente
  dashboardButton: {
    textAlign: "center",
    marginTop: 20,               // distância do topo
    backgroundColor: "#000000ff",  // cor de fundo
    paddingVertical: 12,         // altura do botão
    paddingHorizontal: 25,       // largura interna
    borderRadius: 10,            // cantos arredondados
    alignItems: "center",        // centraliza o texto
    shadowColor: "#000",         // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,                // sombra Android
    color: "#fff",               // cor do texto
    fontWeight: "bold",
    fontSize: 16,
  },
});

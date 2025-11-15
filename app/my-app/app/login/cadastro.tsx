import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, globalStyles, typography, spacing } from "../../styles";
import { styles } from "../../styles/cadastro.styles";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos para continuar.");
      return;
    }
Alert.alert("Sucesso", "Conta criada com sucesso!");
    router.replace("../");
  };

  return (
    <LinearGradient
      colors={[colors.backgroundLight, colors.backgroundMedium, colors.backgroundDark]}
      style={globalStyles.container}
    >
      <Text style={typography.title}>Crie sua conta</Text>

      <View style={globalStyles.inputContainer}>
        <Ionicons name="person-outline" size={20} color={colors.primary} />
        <TextInput
          style={globalStyles.input}
          placeholder="Nome completo"
          placeholderTextColor={colors.textPlaceholder}
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={globalStyles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color={colors.primary} />
        <TextInput
          style={globalStyles.input}
          placeholder="E-mail"
          placeholderTextColor={colors.textPlaceholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("./login")}>
        <Text style={typography.linkCenter}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
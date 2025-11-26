import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, globalStyles, typography } from "../../styles";
import { styles } from "../../styles/cadastro.styles";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const API_URL = "http://10.60.213.28:8000/v1";

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos para continuar.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }), 
      });


      if (response.ok) {
          const data = await response.json();
        Alert.alert("Sucesso", "Conta criada com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
        router.replace("./login");
      } else {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.error || "Não foi possível criar a conta");
      }
    } catch (error) {
      Alert.alert("Erro", `Não foi possível conectar ao servidor ${error}`);
      console.log(error)
      error;
    } finally {
      setLoading(false);
    }
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

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("./login")}>
        <Text style={typography.linkCenter}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

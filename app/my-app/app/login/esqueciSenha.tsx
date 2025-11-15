import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, globalStyles, typography, spacing } from "../../styles";
import { styles } from "../../styles/esqueciSenha.styles";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleReset = () => {
    if (!email) {
      Alert.alert("Atenção", "Informe o e-mail para redefinir sua senha.");
      return;
    }

    Alert.alert("Sucesso", "Enviamos um link de recuperação para seu e-mail!");
    router.back();
  };

  return (
    <LinearGradient
      colors={[colors.backgroundLight, colors.backgroundMedium, colors.backgroundDark]}
      style={globalStyles.container}
    >
      <Text style={typography.title}>Esqueceu sua senha?</Text>
      <Text style={[typography.body, { textAlign: "center", marginBottom: spacing.lg }]}>
        Digite seu e-mail e enviaremos um link para redefinir sua senha.
      </Text>

      <View style={globalStyles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color={colors.primary} />
        <TextInput
          style={globalStyles.input}
          placeholder="Seu e-mail"
          placeholderTextColor={colors.textPlaceholder}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: spacing.md }}>
        <Text style={typography.linkCenter}>Voltar para o login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
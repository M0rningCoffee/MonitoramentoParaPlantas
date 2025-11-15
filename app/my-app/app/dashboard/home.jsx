import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { colors, globalStyles, typography, spacing } from "../../styles";
import dashboardStyles from "../../styles/dashboardStyles";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[
        colors.backgroundLight,
        colors.backgroundMedium,
        colors.backgroundDark,
      ]}
      style={globalStyles.container}
    >
      <Text style={[typography.title, { marginTop: spacing.xl }]}>
        Dashboard
      </Text>
      <Text style={[typography.subtitle, { marginBottom: spacing.lg }]}>
        Monitoramento das suas plantas 🌱
      </Text>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.md }}>
        <TouchableOpacity style={dashboardStyles.card}>
          <Ionicons name="leaf-outline" size={40} color={colors.primary} />
          <View style={dashboardStyles.cardTextArea}>
            <Text style={typography.cardTitle}>Minhas Plantas</Text>
            <Text style={typography.cardSubtitle}>
              Veja todas as plantas cadastradas
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={dashboardStyles.card}>
          <Ionicons name="water-outline" size={40} color={colors.primary} />
          <View style={dashboardStyles.cardTextArea}>
            <Text style={typography.cardTitle}>Umidade</Text>
            <Text style={typography.cardSubtitle}>
              Verifique o nível de umidade atual
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={dashboardStyles.card}>
          <Ionicons name="document-text-outline" size={40} color={colors.primary} />
          <View style={dashboardStyles.cardTextArea}>
            <Text style={typography.cardTitle}>Histórico</Text>
            <Text style={typography.cardSubtitle}>
              Veja registros anteriores
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={dashboardStyles.card}>
          <Ionicons name="settings-outline" size={40} color={colors.primary} />
          <View style={dashboardStyles.cardTextArea}>
            <Text style={typography.cardTitle}>Configurações</Text>
            <Text style={typography.cardSubtitle}>
              Ajuste preferências da sua conta
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

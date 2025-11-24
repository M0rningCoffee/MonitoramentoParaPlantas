// app/dashboard/home.jsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, globalStyles, typography, spacing, dashboardStyles } from "../../styles";

export default function DashboardScreen() {
  const router = useRouter();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ajuste: use o host apropriado: 10.0.2.2 no emulator Android, localhost no iOS
  const API_BASE = "http://10.0.2.2/api/index.php";

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch(`${API_BASE}/plants`);
        const json = await res.json();
        if (json.success && json.plants) setPlants(json.plants);
      } catch (err) {
        console.log("Erro ao buscar plantas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  return (
    <LinearGradient
      colors={[ colors.backgroundLight, colors.backgroundMedium, colors.backgroundDark ]}
      style={globalStyles.container}
    >
      <Text style={[typography.title, { marginTop: spacing.xl }]}>Dashboard</Text>
      <Text style={[typography.subtitle, { marginBottom: spacing.lg }]}>Monitoramento das suas plantas 🌱</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.xxl }}>
          {plants.length === 0 && <Text style={typography.body}>Nenhuma planta cadastrada.</Text>}

          {plants.map((p) => (
            <TouchableOpacity
              key={p.id_planta || p.id}
              style={dashboardStyles.card}
              onPress={() => router.push(`/monitoramento/plantDetail?id=${p.id_planta || p.id}`)}
            >
              <Image source={require("../../assets/images/plant_card.png")} style={dashboardStyles.cardImage} />
              <View style={dashboardStyles.cardTextArea}>
                <Text style={dashboardStyles.cardTitle}>{p.nome_planta || p.name || "Planta"}</Text>
                <Text style={dashboardStyles.cardSubtitle}>Umidade: {p.umidade ?? "—"}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </LinearGradient>
  );
}

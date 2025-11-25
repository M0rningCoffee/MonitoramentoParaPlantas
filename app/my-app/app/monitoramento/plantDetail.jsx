// app/monitoramento/plantDetail.jsx
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useSearchParams } from "expo-router";
import { colors, globalStyles, typography, spacing, monitorStyles } from "../../styles";

export default function PlantDetail() {
  const { id } = useSearchParams();
  const router = useRouter();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://10.0.0.105:8000/v1";

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await fetch(`${API_URL}/plantas?id=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
        });
        if (res.ok) {
          const json = await res.json();
          setPlant(json.plant);
        }
      } catch (err) {
        console.log("Erro ao obter planta:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPlant();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: spacing.xl }} />;

  if (!plant) return (
    <LinearGradient colors={[colors.backgroundLight, colors.backgroundMedium]} style={globalStyles.container}>
      <Text style={typography.body}>Planta não encontrada</Text>
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: spacing.md }}>
        <Text style={typography.link}>Voltar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <LinearGradient colors={[colors.backgroundLight, colors.backgroundMedium]} style={globalStyles.container}>
      <Text style={[typography.title, { marginTop: spacing.xl }]}>{plant.nome_planta || plant.nome_planta}</Text>
      <Text style={[typography.subtitle, { marginBottom: spacing.lg }]}>Umidade atual: {plant.umidade ?? "—"}</Text>

      {/* Aqui você pode mostrar gráficos, histórico e botões de calibragem */}
      <View style={{ paddingHorizontal: spacing.md }}>
        <Text style={typography.body}>ID: {plant.id_planta || plant.id}</Text>
        <Text style={typography.body}>Tipo de solo: {plant.tipo_solo || plant.tipo || "—"}</Text>
      </View>

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: spacing.lg }}>
        <Text style={typography.linkCenter}>Voltar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

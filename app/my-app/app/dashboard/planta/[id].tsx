import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing } from "../../../styles";

type PlantaAPI = {
  id: number;
  nome_planta: string;
  umidade: number;
  umidade_minima: number | null;
  solo: { id: number; tipo: string };
  logs: any[];
};

const API_URL = "http://10.0.0.105:8000/v1";

export default function PlantaDetalhe() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [planta, setPlanta] = useState<PlantaAPI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlantaDetalhe = async () => {
      if (Array.isArray(id)) {
        setLoading(false);
        return;
      }
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          router.replace("/login/login");
          return;
        }

        const res = await fetch(`${API_URL}/plantas/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          await AsyncStorage.removeItem("token");
          router.replace("/login/login");
          return;
        }

        if (res.status === 404) {
          setPlanta(null);
          return;
        }

        const json = await res.json();
        setPlanta(json as PlantaAPI);
      } catch (err) {
        console.error("Erro ao buscar detalhes da planta:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlantaDetalhe();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 50 }} />
      </View>
    );
  }

  if (!planta) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.white, fontSize: 18, marginTop: 50 }}>
          Planta não encontrada ou erro de comunicação com a API!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image
            source={require("../../../assets/images/plant_card.png")}
            style={styles.image}
          />
        </View>

        <Text style={styles.title}>{planta.nome_planta}</Text>
        <Text style={styles.description}>
          Tipo de Solo: {planta.solo?.tipo || "Desconhecido"}
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Umidade Atual</Text>
            <Text style={styles.infoText}>{planta.umidade}%</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Mínimo Recomendado</Text>
            <Text style={styles.infoText}>{planta.umidade_minima ?? "Não Informado"}%</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Último Registro</Text>
            <Text style={styles.infoText}>
              {planta.logs.length > 0
                ? new Date(planta.logs[0].created_at).toLocaleTimeString()
                : "Sem registro"}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
            <Text style={styles.buttonText}>Regar</Text>
          </TouchableOpacity>
{/* 
            onPress=({router.push("/dashboard/atualizar")}) */}

          <TouchableOpacity style={[styles.button, { backgroundColor: colors.white }]}>
            <Text style={[styles.buttonText, { color: colors.primary }]}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
  },
  card: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    alignItems: "center",
  },
  imageWrapper: {
    width: 220,
    height: 220,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: spacing.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  image: { width: "100%", height: "100%" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  infoContainer: { width: "100%", marginBottom: spacing.lg },
  infoBox: {
    backgroundColor: colors.backgroundMedium,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  infoTitle: { fontWeight: "bold", color: colors.textPrimary, marginBottom: 2 },
  infoText: { color: colors.textSecondary },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 12,
    marginHorizontal: spacing.sm,
    alignItems: "center",
  },
  buttonText: { color: colors.white, fontWeight: "bold", fontSize: 16 },
});

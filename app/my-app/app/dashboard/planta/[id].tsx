import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { colors, spacing } from "../../../styles";

type Planta = {
  id: string;
  nome: string;
  descricao: string;
  imagem: any;
};

const plantas: Planta[] = [
  {
    id: "1",
    nome: "Híbrida OG Kush",
    descricao: "Planta forte, resistente e equilibrada. Requer rega moderada.",
    imagem: require("../../../assets/planta1.png"),
  },
  {
    id: "2",
    nome: "Sativa Lemon Haze",
    descricao: "Aromática, energética e com folhas longas. Precisa de luz direta.",
    imagem: require("../../../assets/planta2.png"),
  },
  {
    id: "3",
    nome: "Indica Blueberry",
    descricao: "Relaxante, folhas largas e coloração roxa. Prefere clima fresco.",
    imagem: require("../../../assets/planta3.png"),
  },
];

export default function PlantaDetalhe() {
  const { id } = useLocalSearchParams();

  const planta = plantas.find((p) => p.id === id);

  if (!planta) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.red, fontSize: 18 }}>Planta não encontrada!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Imagem da planta com fundo branco e arredondado */}
        <View style={styles.imageWrapper}>
          <Image source={planta.imagem} style={styles.image} resizeMode="cover" />
        </View>

        <Text style={styles.title}>{planta.nome}</Text>
        <Text style={styles.description}>{planta.descricao}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Última rega</Text>
            <Text style={styles.infoText}>2 dias atrás</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Frequência de rega</Text>
            <Text style={styles.infoText}>3x por semana</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Luz</Text>
            <Text style={styles.infoText}>Sol direto 4h/dia</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
            <Text style={styles.buttonText}>Regar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.orange }]}>
            <Text style={styles.buttonText}>Editar</Text>
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
    backgroundColor: colors.backgroundLight, // fundo claro uniforme
  },
  card: {
    width: "100%",
    backgroundColor: colors.white, // card branco
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
    overflow: "hidden", // garante que a imagem arredondada não mostre fundo preto
    marginBottom: spacing.md,
    backgroundColor: colors.white, // fundo branco dentro do wrapper
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
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
  infoContainer: {
    width: "100%",
    marginBottom: spacing.lg,
  },
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
  infoTitle: {
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 2,
  },
  infoText: {
    color: colors.textSecondary,
  },
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
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

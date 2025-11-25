import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, dashboardStyles, globalStyles, spacing, typography } from "../../styles";

export default function DashboardScreen() {
  const router = useRouter();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://10.0.0.105:8000/v1";

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          router.replace("/login/login");
          return;
        }

        const res = await fetch(`${API_URL}/plantas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });

        if (res.status === 401) {
          await AsyncStorage.removeItem("token");
          router.replace("/login/login");
          return;
        }

        if (res.ok) {
          const json = await res.json();
          setPlants(json);
        }
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
              key={p.id}
              style={dashboardStyles.card}
              onPress={() => router.push(`/dashboard/planta/${p.id}`)}
            >
              <Image source={require("../../assets/images/plant_card.png")} style={dashboardStyles.cardImage} />
              <View style={dashboardStyles.cardTextArea}>
                <Text style={dashboardStyles.cardTitle}>{p.nome_planta || "Planta"}</Text>
                <Text style={dashboardStyles.cardSubtitle}>Umidade: {p.umidade ?? "Não Atualizado Ainda"}%</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.primary} />
            </TouchableOpacity>
          ))}


          <TouchableOpacity style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            zIndex: 99,
          }} 
          onPress={() => router.push("/dashboard/cadastrar")}>
          <Ionicons name="add-circle" size={60} color={colors.primary}/>
          </TouchableOpacity>




        </ScrollView>
      )}
    </LinearGradient>
  );
}



import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, dashboardStyles, globalStyles, spacing, typography } from "../../styles";

export default function DashboardScreen() {
  const router = useRouter();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  
 // const API_URL = "http://10.60.213.28:8000/v1";
// const API_URL = "http://10.0.0.105:8000/v1";
const API_URL = "https://tyron-unpiqued-tenurially.ngrok-free.dev/v1";

  const handleLogout = async () => {
    try {
      setLoading(true); 
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await fetch(`${API_URL}/logout`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });
      }
    } catch (error) {
      console.log("Erro ao notificar API de logout (sem internet?), seguindo com logout local.", error);
    } finally {
      await AsyncStorage.removeItem("token");
      setLoading(false);
      router.replace("/login/login");
    }
  };

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
      colors={[colors.backgroundLight, colors.backgroundMedium, colors.backgroundDark]}
      style={[globalStyles.container, { position: 'relative' }]} 
    >
      <Text style={[typography.title, { marginTop: spacing.xl }]}>Dashboard</Text>
      <Text style={[typography.subtitle, { marginBottom: spacing.lg }]}>Monitoramento das suas plantas 🌱</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: 100 }}> 
          {plants.length === 0 && <Text style={typography.body}>Nenhuma planta cadastrada.</Text>}

          {plants.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={dashboardStyles.card}
              onPress={() => router.push(`/dashboard/planta/${p.id}`)}
            >
              <Image source={require("../../assets/images/plant_card.jpg")} style={dashboardStyles.cardImage} />
              <View style={dashboardStyles.cardTextArea}>
                <Text style={dashboardStyles.cardTitle}>{p.nome_planta || "Planta"}</Text>
                <Text style={dashboardStyles.cardSubtitle}>Umidade: {p.umidade ?? "Não Atualizado Ainda"}%</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity 
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          shadowColor: "#000", 
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          elevation: 5
        }} 
        onPress={() => router.push("/dashboard/cadastrar")}
      >
        <Ionicons name="add-circle" size={60} color={colors.primary}/>
      </TouchableOpacity>

      <TouchableOpacity 
        style={{
          position: "absolute",
          bottom: 30, 
          left: 30,   
          backgroundColor: "#ff4444", 
          borderRadius: 30,
          padding: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          elevation: 5,
          alignItems: 'center',
          justifyContent: 'center'
        }} 
        onPress={() => {
            Alert.alert(
                "Sair",
                "Deseja realmente sair?",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Sair", onPress: handleLogout, style: "destructive" }
                ]
            );
        }}
      >
        <Ionicons name="log-out-outline" size={30} color="#FFF"/>
      </TouchableOpacity>

    </LinearGradient>
  );
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, globalStyles, spacing, typography } from "../../styles";

const API_URL = "http://10.0.0.105:8000/v1";

export default function CadastrarPlanta() {
  const router = useRouter();

  const [nomePlanta, setNomePlanta] = useState("");
  const [sensorKey, setSensorKey] = useState("");
  const [soloId, setSoloId] = useState("");
  const [umidadeMin, setUmidadeMin] = useState("");

  const [solos, setSolos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSolos = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${API_URL}/solos`, {
          headers: {
            "METHOD": "GET",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        setSolos(json);
      } catch (err) {
        console.log("Erro ao buscar solos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolos();
  }, []);

  const handleCadastrar = async () => {
    if (!nomePlanta || !sensorKey || !soloId) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios!");
      return;
    }

    setSaving(true);

    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${API_URL}/plantas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome_planta: nomePlanta,
          sensor_key: sensorKey,
          solo_id: parseInt(soloId),
          umidade_minima: umidadeMin ? parseInt(umidadeMin) : null,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        Alert.alert("Sucesso", "Planta cadastrada!", [
          { text: "OK", onPress: () => router.replace("/dashboard/home") },
        ]);
      } else {
        Alert.alert("Erro", json.error || "Falha ao cadastrar.");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Não foi possível conectar ao servidor!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[colors.backgroundLight, colors.backgroundMedium, colors.backgroundDark]}
      style={globalStyles.container}
    >
      <ScrollView contentContainerStyle={styles.box}>
        <Text style={typography.title}>Cadastrar Planta</Text>

        <Text style={styles.label}>Nome da Planta *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Hortelã"
          onChangeText={setNomePlanta}
        />

        <Text style={styles.label}>Sensor Key *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: SENSOR_123"
          autoCapitalize="none"
          onChangeText={setSensorKey}
        />

        <Text style={styles.label}>Tipo de Solo *</Text>
        <View style={styles.selectBox}>
          {solos.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={[
                styles.soloOption,
                soloId == s.id && styles.soloSelected,
              ]}
              onPress={() => setSoloId(s.id)}
            >
              <Text style={styles.soloText}>{s.tipo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Umidade mínima</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ex: 30"
          onChangeText={setUmidadeMin}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCadastrar}
          disabled={saving}
        >
          <Text style={styles.buttonText}>
            {saving ? "Salvando..." : "Cadastrar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: spacing.lg,
  },
  label: {
    color: colors.white,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 10,
    marginTop: 5,
  },
  selectBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing.sm,
  },
  soloOption: {
    padding: spacing.sm,
    backgroundColor: colors.secondary,
    margin: 4,
    borderRadius: 8,
  },
  soloSelected: {
    backgroundColor: colors.primary,
  },
  soloText: {
    color: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});


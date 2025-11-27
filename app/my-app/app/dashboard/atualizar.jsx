import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { colors, spacing } from "../../styles";

const API_URL = "http://10.60.213.28:8000/v1";

export default function AtualizarPlanta() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [umidadeMinima, setUmidadeMinima] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDadosAtuais = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return router.replace("/login/login");

        const res = await fetch(`${API_URL}/plantas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });

        if (res.ok) {
          const json = await res.json();
          setNome(json.nome_planta);
          setUmidadeMinima(json.umidade_minima ?String(json.umidade_minima) : "");
        } else {
          Alert.alert("Erro", "Não foi possível carregar os dados da planta.");
          router.back();
        }
      } catch (error) {
        console.log("Erro fetch update:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDadosAtuais();
  }, [id]);

  const handleUpdate = async () => {
    if (!nome.trim()) {
      return Alert.alert("Atenção", "O nome da planta é obrigatório.");
    }

    const umidadeInt = parseInt(umidadeMinima);
    if (isNaN(umidadeInt) && umidadeMinima !== "") {
        return Alert.alert("Erro", "Umidade deve ser um número válido.");
    }

    try {
      setSaving(true);
      const token = await AsyncStorage.getItem("token");
      
      const payload = {
        nome_planta: nome,
        umidade_minima: isNaN(umidadeInt) ? null : umidadeInt, 
      };

      const res = await fetch(`${API_URL}/plantas/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        Alert.alert("Sucesso", "Planta atualizada com sucesso!");
        router.push("/dashboard"); 
      } else {
        const erro = await res.json();
        Alert.alert("Erro", erro.detail || "Falha ao atualizar.");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha na conexão.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.title}>Editar Planta</Text>
            <View style={{ width: 24 }} /> 
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome da Planta</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Ex: Samambaia da Sala"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Umidade Mínima (%)</Text>
          <Text style={styles.helperText}>
            Abaixo deste valor, o sistema alertará necessidade de rega.
          </Text>
          <TextInput
            style={styles.input}
            value={umidadeMinima}
            onChangeText={setUmidadeMinima}
            placeholder="Ex: 30"
            keyboardType="numeric" 
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleUpdate}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ccc", marginTop: spacing.md }]}
            onPress={() => router.back()}
            disabled={saving}
          >
              <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    padding: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: spacing.lg,
    fontSize: 16,
  },
  button: {
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
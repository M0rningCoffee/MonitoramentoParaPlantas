
#include <WiFi.h>
#include <HTTPClient.h>

// ============================
// CONFIG WIFI
// ============================
const char* ssid = "sala_tec";
const char* password = "1227@3579";

// ============================
// CONFIG API
// ============================
// URL final da rota de logs
const char* apiUrl = "http://10.0.0.105:8000/v1/logs";

// Identificador único deste sensor
const char* sensorKey = "ESP32_SENSOR_001";

// ============================
// SENSOR DE UMIDADE
// ============================
const int sensorUmidade = 34; // pino analógico do sensor

int valorSensor = 0;
int minSensor = 4095; // solo seco inicial
int maxSensor = 0; // solo molhado inicial
int limiteUmidade = 0;

bool notificacaoEnviada = false;


void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println("Iniciando calibração do sensor...");

  // Conectar ao Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Conectando ao Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi conectado!");
}

void loop() {
  // ============================
  // LEITURA DO SENSOR
  // ============================
  valorSensor = analogRead(sensorUmidade);

  // Calibração automática
  if (valorSensor < minSensor) minSensor = valorSensor;
  if (valorSensor > maxSensor) maxSensor = valorSensor;

  limiteUmidade = (minSensor + maxSensor) / 2;

  Serial.print("Umidade: ");
  Serial.print(valorSensor);
  Serial.print(" | Min: ");
  Serial.print(minSensor);
  Serial.print(" | Max: ");
  Serial.print(maxSensor);
  Serial.print(" | Limite: ");
  Serial.println(limiteUmidade);

  // ============================
  // ENVIA LEITURA PARA API
  // ============================
  if (valorSensor < limiteUmidade && !notificacaoEnviada) {
    enviarParaApi(valorSensor);
    notificacaoEnviada = true;
  } else if (valorSensor >= limiteUmidade) {
    notificacaoEnviada = false;
  }

  delay(1000);
}

void enviarParaApi(int umidade) {

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Wi-Fi desconectado!");
    return;
  }

  HTTPClient http;
  http.begin(apiUrl);
  http.addHeader("Content-Type", "application/json");

  // JSON conforme a API do PDF
  String json = "{\"sensor_key\": \"" + String(sensorKey) +
                "\", \"umidade\": " + String(umidade) + "}";

  Serial.print("Enviando dados: ");
  Serial.println(json);

  int httpResponseCode = http.POST(json);

  if (httpResponseCode > 0) {
    Serial.print("Resposta da API: ");
    Serial.println(httpResponseCode);
    Serial.println(http.getString());
  } else {
    Serial.print("Erro ao enviar POST: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}

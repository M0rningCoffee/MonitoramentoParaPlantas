#include <WiFi.h>
#include <HTTPClient.h>

// Configurações Wi-Fi
const char* ssid = "NOME_DA_REDE";
const char* password = "SENHA_DA_REDE";

// URL da API
const char* apiUrl = "http://SEU_SERVIDOR/api/umidade"; 

// Sensor de umidade
const int sensorUmidade = 34; // pino analógico do sensor
int valorSensor = 0;

// Valores para calibração
int minSensor = 4095; // solo seco inicial
int maxSensor = 0;    // solo molhado inicial
int limiteUmidade = 0;
bool notificacaoEnviada = false;

void setup() {
  Serial.begin(115200);
  delay(1000); // espera o ESP32 terminar o boot
  Serial.println("Iniciando calibração do sensor...");

 // Conecta ao Wi-Fi

 /* WiFi.begin(ssid, password);
  Serial.print("Conectando ao Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi conectado!");
  */
}

void loop() {
  // Leitura do sensor
  valorSensor = analogRead(sensorUmidade);

  // Atualiza calibração
  if (valorSensor < minSensor) minSensor = valorSensor;
  if (valorSensor > maxSensor) maxSensor = valorSensor;

  // Calcular limite automático (50% entre seco e molhado)
  limiteUmidade = (minSensor + maxSensor) / 2;

  // Mostra valores no Serial Monitor
  Serial.print("Umidade: ");
  Serial.print(valorSensor);
  Serial.print(" | Min: ");
  Serial.print(minSensor);
  Serial.print(" | Max: ");
  Serial.print(maxSensor);
  Serial.print(" | Limite: ");
  Serial.println(limiteUmidade);

  // Envia notificação apenas se necessário
  if (valorSensor < limiteUmidade && !notificacaoEnviada) {
    enviarNotificacao(valorSensor);
    notificacaoEnviada = true;
  } else if (valorSensor >= limiteUmidade) {
    notificacaoEnviada = false;
  }

  delay(1000); // intervalo entre leituras
}

void enviarNotificacao(int umidade) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(apiUrl);
    http.addHeader("Content-Type", "application/json");

    String json = "{\"umidade\":" + String(umidade) + "}";
    int httpResponseCode = http.POST(json);

    if (httpResponseCode > 0) {
      Serial.print("POST enviado! Código: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Erro ao enviar POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("Wi-Fi desconectado!");
  }
}

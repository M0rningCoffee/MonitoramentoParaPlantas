import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  console.log(">>> 1. INICIANDO O PROCESSO DE PUSH..."); 
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      console.log(">>> 2. PEDINDO PERMISSÃO...");
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log(">>> FALHA: PERMISSÃO NEGADA!");
      return;
    }

    console.log(">>> 3. PERMISSÃO CONCEDIDA, GERANDO TOKEN...");

    // TENTA PEGAR O TOKEN
    try {
        // Tenta pegar o Project ID do app.json/eas.json automaticamente
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId || Constants?.easConfig?.projectId;
        
        console.log(">>> ID do Projeto encontrado:", projectId);

        // Gera o token
        const pushTokenData = await Notifications.getExpoPushTokenAsync({
            projectId: projectId, 
        });

        token = pushTokenData.data;
        
        console.log(">>> SUCESSO! MEU TOKEN EXPO É:", token); 

    } catch (e) {
        console.log(">>> ERRO FATAL AO PEGAR TOKEN:", e);
    }

  } else {
    console.log(">>> ERRO: ESTÁ RODANDO EM EMULADOR SEM SUPORTE OU WEB.");
  }

  return token;
}
// styles/index.ts
import { StyleSheet } from "react-native";

export const colors = {
  primary: "#2E7D32",
  backgroundLight: "#E8F5E9",
  backgroundMedium: "#C8E6C9",
  backgroundDark: "#A5D6A7",
  white: "#FFFFFF",
  textPrimary: "#1B1B1B",
  textSecondary: "#4A4A4A",
  textPlaceholder: "#9E9E9E",
};

export const spacing = { xs:6, sm:10, md:15, lg:25, xl:40, xxl:60 };

export const typography = StyleSheet.create({
  title: { fontSize:28, fontWeight:"bold", color:colors.primary, textAlign:"center" },
  subtitle: { fontSize:15, color:colors.textSecondary, textAlign:"center" },
  body: { fontSize:14, color:colors.textSecondary },
  link: { fontSize:14, color:colors.primary, fontWeight:"600" },
  linkCenter: { fontSize:14, color:colors.primary, textAlign:"center", fontWeight:"600" },
  cardTitle: { fontSize:16, fontWeight:"700", color:colors.textPrimary },
  cardSubtitle: { fontSize:13, color:colors.textSecondary }
});

export const globalStyles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", paddingHorizontal: spacing.lg },
  formContainer: { paddingHorizontal: spacing.lg, marginTop: spacing.sm },
  inputContainer: { flexDirection:"row", alignItems:"center", backgroundColor: "#F3F3F3", borderRadius:14, paddingHorizontal: spacing.sm, marginVertical: spacing.sm, borderWidth:1, borderColor:"#E0E0E0" },
  input: { flex:1, paddingVertical:12, paddingLeft: spacing.sm, fontSize:15, color: colors.textPrimary },
  buttonPrimary: { backgroundColor: colors.primary, borderRadius:14, paddingVertical:14, alignItems:"center", marginTop: spacing.md },
  buttonPrimaryText: { color: colors.white, fontWeight:"bold" }
});

export const loginStyles = StyleSheet.create({
  logoContainer: { alignItems:"center", marginTop: spacing.xl, marginBottom: spacing.md },
  logo: { width:120, height:120, resizeMode:"contain" },
  loginButton: globalStyles.buttonPrimary, loginButtonText: globalStyles.buttonPrimaryText,
  footerContainer: { flexDirection:"row", justifyContent:"center", marginTop: spacing.md }
});

export const cadastroStyles = StyleSheet.create({
  logoContainer: { alignItems:"center", marginTop: spacing.xl, marginBottom: spacing.md },
  logo: { width:120, height:120, resizeMode:"contain" },
  registerButton: globalStyles.buttonPrimary, registerButtonText: globalStyles.buttonPrimaryText,
  footer: { flexDirection:"row", justifyContent:"center", marginTop: spacing.lg }
});

export const esqueciSenhaStyles = StyleSheet.create({
  sendButton: globalStyles.buttonPrimary, sendButtonText: globalStyles.buttonPrimaryText
});

export const dashboardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3
  },
  cardImage: { width: 64, height: 64, borderRadius: 8, marginRight: 12 },
  cardTextArea: { flex:1 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: colors.textPrimary },
  cardSubtitle: { fontSize: 13, color: colors.textSecondary }
});

export const monitorStyles = StyleSheet.create({
  // estilos para tela de detalhe de planta
  section: { paddingHorizontal: spacing.md, marginTop: spacing.md },
  valueBig: { fontSize: 42, fontWeight: "700", color: colors.primary, textAlign: "center" }
});

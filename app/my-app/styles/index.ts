// styles/index.ts
import { StyleSheet } from "react-native";

/* ---------- CORES ---------- */
export const colors = {
  primary: "#020202ff",
  primaryDark: "#ffffffff",
  backgroundLight: "#1d5a00ff",
  backgroundMedium: "#4bd809ff",
  backgroundDark: "#369708ff",
  textPrimary: "#333333",
  textSecondary: "#ffffffff",
  textPlaceholder: "#999999",
  white: "#ffffff",
  border: "#000000ff",
};

/* ---------- ESPAÇAMENTOS ---------- */
export const spacing = {
  xs: 6,
  sm: 10,
  md: 15,
  lg: 25,
  xl: 40,
};

/* ---------- TIPOGRAFIA ---------- */
export const typography = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
  },
  body: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  link: {
    fontWeight: "bold",
    color: colors.primaryDark,
    fontSize: 14,
  },
  linkCenter: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 14,
  },
});

/* ---------- ESTILOS GLOBAIS ---------- */
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  formContainer: {
    paddingHorizontal: spacing.lg,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: spacing.sm,
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: spacing.md,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

/* ---------- ESTILOS ESPECÍFICOS: LOGIN ---------- */
export const loginStyles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.lg,
    marginTop: spacing.xl,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing.sm,
    resizeMode: "contain" as const,
  },

  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  loginButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
});

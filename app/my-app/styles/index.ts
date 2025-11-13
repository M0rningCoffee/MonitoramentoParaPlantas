// styles/index.ts
import { StyleSheet } from "react-native";

export const colors = {
  primary: "#4b9460",
  primaryDark: "#2e6e4c",
  backgroundLight: "#e8f9f0",
  backgroundMedium: "#bfe7c7",
  backgroundDark: "#8bd7a5",
  textPrimary: "#333",
  textSecondary: "#4b9460",
  textPlaceholder: "#999",
  white: "#fff",
  border: "#c5e6d0",
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 15,
  lg: 25,
  xl: 40,
};

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

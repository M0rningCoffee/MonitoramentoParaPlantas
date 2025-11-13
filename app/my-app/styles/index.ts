// styles/index.ts
import { StyleSheet } from "react-native";

export const colors = {
  primary: "#000000ff",   // verde principal
  secondary: "#00853eff", // verde escuro
  backgroundLight: "#00ff73ff",
  backgroundMedium: "#48da60ff",
  backgroundDark: "#458a3cff",
  textDark: "#333333",
  textLight: "#ffffff",
  border: "#c5e6d0",
  placeholder: "#999999",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.secondary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.primary,
  },
  text: {
    fontSize: 16,
    color: colors.textDark,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.backgroundLight,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.textLight,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  buttonText: {
    color: colors.textLight,
    fontWeight: "bold",
    fontSize: 16,
  },
});

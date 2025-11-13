import { StyleSheet } from "react-native";
import { colors, spacing } from "./index";

export const styles = StyleSheet.create({
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  registerButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
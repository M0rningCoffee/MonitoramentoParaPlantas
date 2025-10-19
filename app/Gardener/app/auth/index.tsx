// app/auth/index.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function AuthIndex() {
  const router = useRouter();

  useEffect(() => {
    // redireciona para a tela de login
    router.replace("/auth/login");
  }, [router]);

  return null;
}

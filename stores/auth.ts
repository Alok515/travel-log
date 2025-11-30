import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

export const useAuth = defineStore("auth", () => {
  const isLoading = ref(false);

  async function signIn() {
    isLoading.value = true;
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    isLoading.value = false;
  }

  return { signIn, isLoading };
});

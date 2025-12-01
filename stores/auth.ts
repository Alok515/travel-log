import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

export const useAuth = defineStore("auth", () => {
  const session = authClient.useSession();
  const isLoading = computed(() => session.value.isPending || session.value.isRefetching);
  const user = computed(() => session.value.data?.user);

  async function signIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/dashboard/error",
    });
  }

  async function signOut() {
    await authClient.signOut();
    navigateTo("/");
  }

  return { signIn, isLoading, user, signOut };
});

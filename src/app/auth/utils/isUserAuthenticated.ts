import supabaseAuthServer from "./supabaseAuthServer";

export const isUserAuthenticated = async () => {
  const {
    data: { user },
  } = await supabaseAuthServer().auth.getUser();
  return !!user
};
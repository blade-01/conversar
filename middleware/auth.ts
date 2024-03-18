export default defineNuxtRouteMiddleware(async (to, from) => {
  // const isAuthenticated = true; // Replace with your authentication logic
  // // If the user is not authenticated, redirect to the auth page
  // if (!isAuthenticated) {
  //   return navigateTo({
  //     name: "auth"
  //   });
  // }

  const user = await getCurrentUser();

  // redirect the user to the login page
  if (!user) {
    return navigateTo({
      path: "/auth",
      query: {
        redirect: to.fullPath
      }
    });
  }
});

export default defineNuxtRouteMiddleware(() => {
  const isAuthenticated = false;
  // If the user is not authenticated, redirect to the auth page
  if (!isAuthenticated) {
    return navigateTo({
      name: "auth"
    });
  }
});

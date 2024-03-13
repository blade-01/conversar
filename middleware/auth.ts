export default defineNuxtRouteMiddleware(() => {
  const isAuthenticated = true; // Replace with your authentication logic
  // If the user is not authenticated, redirect to the auth page
  if (!isAuthenticated) {
    return navigateTo({
      name: "auth"
    });
  }
});

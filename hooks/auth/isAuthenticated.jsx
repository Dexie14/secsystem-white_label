export const isAuthenticated = () => {
  // Check both local storage and server-side storage if needed
  return (
    typeof window !== "undefined" && localStorage.getItem("token") !== null
  );
};

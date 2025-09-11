import { AuthProvider } from "./AuthProvider";
import { PlacesProvider } from "./PlacesProvider";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <PlacesProvider>{children}</PlacesProvider>
    </AuthProvider>
  );
}

import { AuthProvider } from "./context/auth-context";
import AppNav from "./components/AppNav";
export default function App() {
  
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
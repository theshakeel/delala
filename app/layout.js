import "./globals.css";
import { AuthProvider } from "./context/AuthProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}

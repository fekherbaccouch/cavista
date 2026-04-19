import "./globals.css";
import Navbar from "@/components/Navbar";
import AgeGate from "@/components/AgeGate";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/components/ThemeProvider";
export const metadata = {
  title: "Cavista — Cave Premium & Bar Événementiel",
  description: "La référence caviste, accessoires bar & événementiel en Tunisie.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      {/* Add it here as well to cover extension-injected body attributes */}
      <body 
        className="antialiased bg-bg text-cream"
        suppressHydrationWarning
      >
        <ThemeProvider>
        <CartProvider>
        <AgeGate />
        <Navbar />
        <CartDrawer /> {/* The drawer stays hidden until isCartOpen is true */}
        <main>{children}</main>
        <Footer />
        </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
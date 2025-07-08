import CustomCursor from "@/components/ui/custom-cursor";
import "./globals.css";
import { StoreProvider } from "@/app/StoreProvider";

export const metadata = {
  title: "Devfum | XR, AI & Web Innovation",
  description: "Pioneering the future with cutting-edge XR, AI, and web development solutions.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link href="https://fonts.cdnfonts.com/css/lufga" rel="stylesheet" />
        </head>
        <body id="root" className="h-screen">
          <CustomCursor/>
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}

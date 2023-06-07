import "./globals.css";
import { Inter } from "next/font/google";
import Chakra from "./components/Chakra";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Providers from "./components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ANG PM App",
  description:
    "Project Management App created using Chakra UI, Typescript and NextJS for ANG consultants.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Chakra>
            <Navbar />
            <div style={{ display: "flex" }}>
              <Sidebar children={undefined} />
              <main className="border-radius: 2px">{children}</main>
            </div>
          </Chakra>
        </Providers>
      </body>
    </html>
  );
}

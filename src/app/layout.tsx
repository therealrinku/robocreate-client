import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import NotificationPopup from "@/components/NotificationPopup";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Robocreate",
  description: "Social Media Management Made Easy Peasy",
  icons: {
    shortcut:
      "https://camo.githubusercontent.com/e9c1d8b7beb6f26cefc5ab0742b592df1abb0ceb398ee74c1ce33028460b3d9b/68747470733a2f2f63646e2d69636f6e732d706e672e666c617469636f6e2e636f6d2f3132382f31323433352f31323433353233342e706e67",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} bg-gray-100 `}>
        <Providers>
          <NotificationPopup />
          {/* <div className="mt-0 lg:mt-5 pb-10 bg-white max-w-[850px] min-h-[94vh] mx-auto lg:shadow-lg rounded"> */}
          {/* <Nav /> */}
          {children}
          {/* </div> */}
        </Providers>
      </body>
    </html>
  );
}

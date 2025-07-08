import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Builder - Drag & Drop",
  description: "Build forms with drag and drop interface using RJSF and Chakra UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

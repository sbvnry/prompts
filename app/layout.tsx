
import "./globals.css";

export const metadata = {
  title: "Chibi Prompt Builder",
  description: "Premium chibi sticker prompt generator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

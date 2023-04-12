import "../styles/globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="max-w-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}


export const metadata = {
  title: "Golf-View",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode,
  params: { locale: string },
}) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}

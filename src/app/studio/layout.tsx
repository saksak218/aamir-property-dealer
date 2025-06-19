export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-screen">{children}</section>;
}

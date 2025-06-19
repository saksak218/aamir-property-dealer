export default function HelloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section>{children}</section>
    </>
  );
}

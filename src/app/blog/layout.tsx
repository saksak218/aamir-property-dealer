import MainLayout from "@/components/layout/MainLayout";

export default function HelloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen">
        <MainLayout>
          <section className="mt-20">{children}</section>
        </MainLayout>
      </div>
    </>
  );
}

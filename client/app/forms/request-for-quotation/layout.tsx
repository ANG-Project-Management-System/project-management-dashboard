export const metadata = {
  title: "Forms | RFQ",
  description: "Request for Quotation form for the Admin/PM",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-radius: 2px">{children}</div>
    </>
  );
}

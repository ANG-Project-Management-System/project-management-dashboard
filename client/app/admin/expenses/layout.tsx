
export const metadata = {
    title: "Expenses",
    description:
      "Project Management App created using Chakra UI, Typescript and NextJS for ANG consultants.",
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
  
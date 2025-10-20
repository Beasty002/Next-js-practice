export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-3xl text-orange-600">This is route from user</h1>
      <div>{children}</div>
      {/* now all the pages will render through children here  */}
    </div>
  );
}

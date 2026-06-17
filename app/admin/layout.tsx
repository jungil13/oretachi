import { AdminLoginLayout } from "./login-layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLoginLayout>{children}</AdminLoginLayout>;
}

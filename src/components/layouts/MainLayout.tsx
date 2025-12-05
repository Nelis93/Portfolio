import { ReactNode } from "react";
import { Header } from "../ui";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* optional Footer */}
    </>
  );
}

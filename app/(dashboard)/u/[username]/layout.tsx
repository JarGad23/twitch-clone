import { Navbar } from "@/app/(browse)/_components/navbar";
import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

const CreatorLayout = async ({ children, params }: CreatorLayoutProps) => {
  const self = await getSelfByUsername(params.username);

  if (!self) redirect("/");

  return (
    <>
      <Navbar isInDashboardView={true} />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;

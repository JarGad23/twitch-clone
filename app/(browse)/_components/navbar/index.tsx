import { Actions } from "./actions";
import { Logo } from "./logo";
import { Search } from "./search";

interface NavbarProps {
  isInDashboardView: boolean;
}

export const Navbar = ({ isInDashboardView }: NavbarProps) => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo isInDashboardView={isInDashboardView} />
      {!isInDashboardView ? <Search /> : null}
      <Actions isInDashboardView={isInDashboardView} />
    </nav>
  );
};

import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";

interface UsernamePageProps {
  params: {
    username: string;
  };
}

const UsernamePage = async ({ params }: UsernamePageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>Username: {user.username}</p>
      <p>UsedID: {user.id}</p>
    </div>
  );
};

export default UsernamePage;

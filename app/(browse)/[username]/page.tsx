import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

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

  const isFollowig = await isFollowingUser(user.id);
  const isBlockByCurrentUser = await isBlockedByUser(user.id);

  // if (isBlockByCurrentUser) {
  //   notFound();
  // }

  return (
    <div className="flex flex-col gap-y-4">
      <p>Username: {user.username}</p>
      <p>UsedID: {user.id}</p>
      <p>isFollowing: {`${isFollowig}`}</p>
      <p>Is blocked by current user: {`${isBlockByCurrentUser}`} </p>
      <Actions isFollowing={isFollowig} userId={user.id} />
    </div>
  );
};

export default UsernamePage;

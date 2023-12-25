import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UsernamePageProps {
  params: {
    username: string;
  };
}

const UsernamePage = async ({ params }: UsernamePageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowig = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowig} />
  );
};

export default UsernamePage;

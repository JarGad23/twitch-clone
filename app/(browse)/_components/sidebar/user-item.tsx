import { User } from "@prisma/client";

interface UserItemProps {
  user: User;
}

export const UserItem = ({ user }: UserItemProps) => {
  return <div>User Item</div>;
};

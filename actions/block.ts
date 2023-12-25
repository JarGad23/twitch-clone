"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unBlockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

if (
  !process.env.LIVEKIT_API_URL ||
  !process.env.LIVEKIT_API_KEY ||
  !process.env.LIVEKIT_API_SECRET
) {
  throw new Error("Please provide API keys");
}

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

export const onBlock = async (id: string) => {
  const self = await getSelf();

  let blockedUser;
  try {
    blockedUser = await blockUser(id);
  } catch (error) {}

  try {
    await roomService.removeParticipant(self.id, id);
  } catch (error) {}

  revalidatePath(`/u/${self.username}/community`);

  return blockedUser;
};

export const onUnblock = async (id: string) => {
  const unblockedUser = await unBlockUser(id);

  revalidatePath("/");

  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`);
  }

  return unblockedUser;
};

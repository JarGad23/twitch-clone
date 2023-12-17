import { db } from "./db";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string) => {
  try {
    const slef = await getSelf();
    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === slef.id) return false;

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: slef.id,
        },
      },
    });

    return !!existingBlock;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const blockUser = async (id: string) => {
  const slef = await getSelf();

  if (slef.id === id) {
    throw new Error("Cannot block yourself");
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: slef.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error("Already blocked");
  }

  const block = await db.block.create({
    data: {
      blockerId: slef.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};

export const unBlockUser = async (id: string) => {
  const slef = await getSelf();

  if (slef.id === id) {
    throw new Error("Cannot block yourself");
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: slef.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("Already unblocked");
  }

  const unBlock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return unBlock;
};

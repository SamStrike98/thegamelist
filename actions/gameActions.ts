'use server'

import { auth } from "@/auth"
import { Prisma } from "@prisma/client";
import { db } from "@/db";
import { revalidatePath } from "next/cache"


// Create a Game
export async function createGame(formData: FormData) {
    const session = await auth();
    if(!session?.user) throw new Error("Not authenticated")
     
    
    const userId = session?.user?.id    
    const title = formData.get("title") as string;
    const notes = formData.get("notes") as string;
    const platform = formData.get("platform") as string;

    if(!userId) throw new Error("UserId required")

    await db?.game.create({
        data: {title, notes, platform, ownerId: userId}
    });

    revalidatePath("/")
}

// Read Games
export async function getGames(searchQuery?: string, platform?: string) {
  const where: Prisma.GameWhereInput = {};

  // Apply search filter
  if (searchQuery) {
    where.title = { contains: searchQuery, mode: "insensitive" };
  }

  // Apply platform filter if selected
  if (platform) {
    where.platform = platform;
  }

  return await db?.game.findMany({
    where,
    include: { owner: true },
    orderBy: { createdAt: "desc" },
  });
}

// Update Game
export async function updateGame(id: string, formData: FormData) {
    const session = await auth();
    if(!session?.user) throw new Error("Not authenticated");

    const game = await db?.game.findUnique({ where: { id } });
    if(!game || game.ownerId !== session?.user?.id) {
        throw new Error("Unauthorised");
    }

    const title = formData.get("title") as string;
    const notes = formData.get("notes") as string;
    const platform = formData.get("platform") as string;

    await db?.game.update({
        where: { id },
        data: { title, notes, platform }
    });

    revalidatePath("/");
}

// Delete Game
export async function deleteGame(formData: FormData) {
    const session = await auth();
    if(!session?.user) throw new Error("Not authenticated");
    const id = formData.get("gameId") as string;

    const game = await db?.game.findUnique({ where: { id } });
    console.log(id)
    if(!game || game.ownerId !== session?.user?.id) {
        throw new Error("Unauthorised");
    }

    await db?.game?.delete({ where: { id } });

    revalidatePath("/");
}
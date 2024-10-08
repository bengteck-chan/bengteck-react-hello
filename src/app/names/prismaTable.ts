import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createName(name: string, image: Buffer) {
  return await prisma.name.create({
    data: { name, image }
  });
}

export async function getAllNames() {

  const names = await prisma.name.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  // Convert image to Base64
  return names.map((name) => ({
    ...name,
    image: Buffer.from(name.image).toString('base64'), // Convert to Base64 (without the MIME type)
  }));
}

export async function getNameById(targetId: number): Promise<{ id: number; name: string; image: Buffer } | null> {
  return await prisma.name.findUnique({
    where: { id: targetId },  // `findUnique` is better when querying by unique fields like `id`
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
}

// Update a name and image by ID
export async function updateNameById(targetId: number, newName: string, newImage: Buffer) {
  return await prisma.name.update({
    where: { id: targetId },
    data: {
      name: newName,
      image: newImage,
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
}

// Delete a name and image by ID
export async function deleteNameById(targetId: number) {
  return await prisma.name.delete({
    where: { id: targetId },
    select: {
      id: true,
      name: true,
    },
  });
}



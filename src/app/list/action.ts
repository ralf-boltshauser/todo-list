"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export async function markTaskAsDone(id: number) {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });
  await prisma.todo.update({
    where: { id },
    data: { done: !todo.done },
  });
  revalidatePath("/list");
}

export async function addNewTodo(formData: FormData) {
  const todoTitle = formData.get("title") as string;

  await prisma.todo.create({
    data: {
      title: todoTitle ?? "",
      userId: 1,
    },
  });
  revalidatePath("/list");
}

export async function deleteTodoById(formData: FormData) {
  await prisma.todo.delete({
    where: { id: parseInt(formData.get("id") as string) },
  });
  revalidatePath("/list");
}

import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();
export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <div className="flex items-center justify-start gap-4">
      <h1 className="text-xl ">Title</h1>
      <Button variant={"outline"}>Add todo</Button>
      <Link href={"/list"}>Todo list</Link>
    </div>
  );
}

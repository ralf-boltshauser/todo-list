import TodoCheckbox from "@/components/ui/TodoCheckbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PrismaClient, Todo } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { addNewTodo, deleteTodoById, markTaskAsDone } from "./action";

const prisma = new PrismaClient();
export default async function Todos() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const handleCheckboxChange = async (todo: Todo) => {
    await markTaskAsDone(todo);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link href={"/"} className=" font-semibold">
        Todo List
      </Link>
      <div className="mt-6">
        {todos.map((todo: Todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg mb-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <TodoCheckbox todo={todo} />
              <h1
                className={`ml-4 ${
                  todo.done ? "line-through text-gray-400" : "text-gray-800"
                } font-medium`}
              >
                {todo.title}
              </h1>
            </div>
            <form action={deleteTodoById} className="flex items-center">
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                className="text-gray-500 hover:text-red-500 focus:outline-none"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        ))}
      </div>
      <form
        action={addNewTodo}
        className="mt-6 flex gap-4 flex-col sm:flex-row"
      >
        <Input
          name="title"
          placeholder="Title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <Button className=" text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add new todo
        </Button>
      </form>
    </div>
  );
}

"use client";
import { markTaskAsDone } from "@/app/list/action";
import { Todo } from "@prisma/client";
import { Checkbox } from "./checkbox";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function TodoCheckbox({ todo }: { todo: Todo }) {
  const [toggle, setToggle] = useState(false);
  const handleCheckboxChange = async (todo: Todo) => {
    setToggle(!toggle);
    toast.success(`${todo.title} marked as ${todo.done ? "undone" : "done"}`);
    await markTaskAsDone(todo.id);
  };

  return (
    <motion.div
      animate={{
        rotate: toggle ? 360 : 0,
        scale: toggle ? 1.2 : 1,
      }}
    >
      <Checkbox
        checked={todo.done}
        onClick={() => handleCheckboxChange(todo)}
      />
    </motion.div>
  );
}

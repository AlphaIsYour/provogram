/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Check, Circle } from "lucide-react";
import Link from "next/link";

// Fungsi simulasi fetch data
const getTodoItems = async () => {
  // Ambil semua tugas yang 'pending' atau 'late'
  return [
    {
      id: "task-002",
      title: "Implementasi Komponen",
      class: "Belajar Next.js",
      slug: "belajar-nextjs",
      deadline: "3 hari lagi",
      isDone: false,
      isUrgent: true,
    },
    {
      id: "task-001",
      title: "Desain Landing Page",
      class: "Figma untuk Pemula",
      slug: "figma-untuk-pemula",
      deadline: "5 hari lagi",
      isDone: false,
      isUrgent: false,
    },
    {
      id: "task-003",
      title: "Deploy ke Vercel",
      class: "Belajar Next.js",
      slug: "belajar-nextjs",
      deadline: "10 hari lagi",
      isDone: false,
      isUrgent: false,
    },
    {
      id: "task-004",
      title: "Studi Kasus UX",
      class: "Figma untuk Pemula",
      slug: "figma-untuk-pemula",
      deadline: "Sudah lewat",
      isDone: true,
      isUrgent: false,
    },
  ];
};

// Komponen untuk satu item To-Do yang bisa di-drag
const SortableItem = ({
  item,
  onToggleDone,
}: {
  item: any;
  onToggleDone: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 bg-[#161B22] p-4 rounded-md border border-[#30363D] ${
        item.isDone ? "opacity-50" : ""
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab p-2 text-[#8B949E] touch-none"
      >
        <GripVertical size={20} />
      </div>
      <button onClick={() => onToggleDone(item.id)} className="flex-shrink-0">
        {item.isDone ? (
          <Check size={24} className="text-green-500" />
        ) : (
          <Circle size={24} className="text-[#8B949E]" />
        )}
      </button>
      <div className="flex-grow">
        <Link
          href={`/classroom/class/${item.slug}/task/${item.id}`}
          className="hover:underline"
        >
          <p
            className={`font-semibold ${
              item.isDone ? "line-through text-[#8B949E]" : "text-white"
            }`}
          >
            {item.title}
          </p>
        </Link>
        <p className="text-sm text-[#8B949E]">{item.class}</p>
      </div>
      <span
        className={`text-sm font-semibold ${
          item.isUrgent ? "text-red-400" : "text-[#8B949E]"
        }`}
      >
        {item.deadline}
      </span>
    </div>
  );
};

const ClassroomTodoPage = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getTodoItems().then((data) => setItems(data));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = currentItems.findIndex((item) => item.id === over.id);
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  };

  const handleToggleDone = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const activeTasks = items.filter((item) => !item.isDone);
  const completedTasks = items.filter((item) => item.isDone);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">To-Do List</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={activeTasks}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {activeTasks.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                onToggleDone={handleToggleDone}
              />
            ))}
          </div>
        </SortableContext>

        {completedTasks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4 text-[#8B949E]">
              Selesai ({completedTasks.length})
            </h2>
            <div className="space-y-3">
              {completedTasks.map((item) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  onToggleDone={handleToggleDone}
                />
              ))}
            </div>
          </div>
        )}
      </DndContext>
    </div>
  );
};

export default ClassroomTodoPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Styling untuk react-big-calendar
import "react-big-calendar/lib/css/react-big-calendar.css";
// Kita akan override styling di file CSS global atau di sini langsung.

// Setup localizer
const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Fungsi simulasi fetch data deadline
const getCalendarEvents = async () => {
  // Simulasi fetch dari /api/classroom/all-deadlines
  return [
    {
      title: "Desain Landing Page",
      start: new Date(2024, 1, 25, 23, 59), // Catatan: Bulan di JS itu 0-indexed (1 = Februari)
      end: new Date(2024, 1, 25, 23, 59),
      resource: {
        class: "Figma untuk Pemula",
        taskId: "task-001",
        slug: "figma-untuk-pemula",
      },
    },
    {
      title: "Implementasi Komponen",
      start: new Date(2024, 2, 3, 23, 59), // 2 = Maret
      end: new Date(2024, 2, 3, 23, 59),
      resource: {
        class: "Belajar Next.js",
        taskId: "task-002",
        slug: "belajar-nextjs",
      },
    },
    {
      title: "Final Project",
      start: new Date(2024, 2, 10, 23, 59),
      end: new Date(2024, 2, 10, 23, 59),
      resource: {
        class: "Belajar Next.js",
        taskId: "task-003",
        slug: "belajar-nextjs",
      },
    },
  ];
};

const ClassroomCalendarPage = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCalendarEvents().then((data: any) => setEvents(data));
  }, []);

  // Fungsi untuk meng-handle klik pada event
  const handleSelectEvent = (event: any) => {
    router.push(
      `/classroom/class/${event.resource.slug}/task/${event.resource.taskId}`
    );
  };

  // Komponen kustom untuk setiap event di kalender
  const EventComponent = ({ event }: { event: any }) => (
    <div className="text-xs">
      <strong>{event.title}</strong>
      <p className="truncate italic opacity-80">{event.resource.class}</p>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Kalender Tugas</h1>
      <div className="p-4 bg-[#161B22] border border-[#30363D] rounded-lg h-[85vh] calendar-container">
        {/*
          Untuk styling: tambahkan CSS di file global (misal: globals.css)
          Target class-class dari react-big-calendar seperti .rbc-calendar, .rbc-toolbar, dll.
          Contoh CSS ada di bawah.
        */}
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          onSelectEvent={handleSelectEvent}
          components={{
            event: EventComponent, // Gunakan komponen kustom kita
          }}
          eventPropGetter={(event: any) => ({
            // Beri warna berbeda untuk setiap kelas, misalnya
            style: {
              backgroundColor:
                event.resource.class === "Belajar Next.js"
                  ? "#1f6feb"
                  : "#8957e5",
              borderColor:
                event.resource.class === "Belajar Next.js"
                  ? "#1f6feb"
                  : "#8957e5",
            },
          })}
        />
      </div>
    </div>
  );
};

export default ClassroomCalendarPage;

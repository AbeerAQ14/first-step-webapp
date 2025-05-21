import { create } from "zustand";

type Occasion = {
  id: string;
  title: string;
  date: Date;
};

type Birthday = {
  id: string;
  title: string;
  date: Date;
};

type Task = {
  id: string;
  title: string;
  date: Date;
  done: boolean;
};

type EventsStore = {
  occasions: Occasion[];
  birthdays: Birthday[];
  tasks: Task[];
  addOccasion: (item: Omit<Occasion, "id">) => void;
  editOccasion: (id: string, updates: Partial<Occasion>) => void;
  deleteOccasion: (id: string) => void;

  addBirthday: (item: Omit<Birthday, "id">) => void;
  editBirthday: (id: string, updates: Partial<Birthday>) => void;
  deleteBirthday: (id: string) => void;

  addTask: (item: Omit<Task, "id">) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskDone: (id: string) => void;
};

export const useEventsStore = create<EventsStore>((set) => ({
  occasions: [],
  birthdays: [],
  tasks: [],

  addOccasion: (item) =>
    set((state) => ({
      occasions: [...state.occasions, { ...item, id: crypto.randomUUID() }],
    })),
  editOccasion: (id, updates) =>
    set((state) => ({
      occasions: state.occasions.map((o) =>
        o.id === id ? { ...o, ...updates } : o
      ),
    })),
  deleteOccasion: (id) =>
    set((state) => ({
      occasions: state.occasions.filter((o) => o.id !== id),
    })),

  addBirthday: (item) =>
    set((state) => ({
      birthdays: [...state.birthdays, { ...item, id: crypto.randomUUID() }],
    })),
  editBirthday: (id, updates) =>
    set((state) => ({
      birthdays: state.birthdays.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      ),
    })),
  deleteBirthday: (id) =>
    set((state) => ({
      birthdays: state.birthdays.filter((b) => b.id !== id),
    })),

  addTask: (item) =>
    set((state) => ({
      tasks: [...state.tasks, { ...item, id: crypto.randomUUID() }],
    })),
  editTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  toggleTaskDone: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    })),
}));

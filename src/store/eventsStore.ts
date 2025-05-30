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

  // Occasions
  addOccasion: (item: Omit<Occasion, "id">) => void;
  editOccasion: (id: string, updates: Partial<Occasion>) => void;
  deleteOccasion: (id: string) => void;

  // Birthdays
  addBirthday: (item: Omit<Birthday, "id">) => void;
  editBirthday: (id: string, updates: Partial<Birthday>) => void;
  deleteBirthday: (id: string) => void;
};

export const useEventsStore = create<EventsStore>((set) => ({
  occasions: [],
  birthdays: [],

  // Occasions
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

  // Birthdays
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
}));

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system/legacy';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Appointment {
  id: string;
  providerId: string;
  providerName: string;
  providerImage: string;
  specialty: string;
  category: string;
  date: string;
  time: string;
  fee: string;
  status: 'upcoming' | 'cancelled';
  bookedAt: string;
}

interface AuthContextType {
  user: User | null;
  appointments: Appointment[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  bookAppointment: (a: Omit<Appointment, 'id' | 'bookedAt' | 'status'>) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
}

const Ctx = createContext<AuthContextType | null>(null);

const dir = FileSystem.documentDirectory!;
const USERS_FILE   = `${dir}ae_users.json`;
const SESSION_FILE = `${dir}ae_session.json`;
const apptFile = (uid: string) => `${dir}ae_appts_${uid}.json`;

async function readJSON<T>(path: string, fallback: T): Promise<T> {
  try {
    const info = await FileSystem.getInfoAsync(path);
    if (!info.exists) return fallback;
    const raw = await FileSystem.readAsStringAsync(path);
    return JSON.parse(raw) as T;
  } catch (e) {
    console.log('readJSON error', path, e);
    return fallback;
  }
}

async function writeJSON(path: string, data: unknown) {
  await FileSystem.writeAsStringAsync(path, JSON.stringify(data));
}

async function deleteFile(path: string) {
  try { await FileSystem.deleteAsync(path, { idempotent: true }); } catch {}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]                 = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => { restore(); }, []);

  async function restore() {
    try {
      const u = await readJSON<User | null>(SESSION_FILE, null);
      if (u) {
        setUser(u);
        const a = await readJSON<Appointment[]>(apptFile(u.id), []);
        setAppointments(a);
      }
    } finally {
      setLoading(false);
    }
  }

  async function saveAppts(uid: string, data: Appointment[]) {
    await writeJSON(apptFile(uid), data);
    setAppointments(data);
  }

  async function login(email: string, password: string) {
    const users = await readJSON<Array<User & { password: string }>>(USERS_FILE, []);
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error('Invalid email or password');
    const { password: _, ...u } = found;
    await writeJSON(SESSION_FILE, u);
    setUser(u);
    const a = await readJSON<Appointment[]>(apptFile(u.id), []);
    setAppointments(a);
  }

  async function register(name: string, email: string, password: string, phone?: string) {
    const users = await readJSON<Array<User & { password: string }>>(USERS_FILE, []);
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      throw new Error('Email already registered');
    const newUser = { id: Date.now().toString(), name, email, phone: phone ?? '', password };
    await writeJSON(USERS_FILE, [...users, newUser]);
    const { password: _, ...u } = newUser;
    await writeJSON(SESSION_FILE, u);
    setUser(u);
    setAppointments([]);
  }

  async function logout() {
    await deleteFile(SESSION_FILE);
    setUser(null);
    setAppointments([]);
  }

  async function bookAppointment(a: Omit<Appointment, 'id' | 'bookedAt' | 'status'>) {
    if (!user) return;
    const newA: Appointment = {
      ...a,
      id: Date.now().toString(),
      status: 'upcoming',
      bookedAt: new Date().toISOString(),
    };
    await saveAppts(user.id, [newA, ...appointments]);
  }

  async function cancelAppointment(id: string) {
    if (!user) return;
    await saveAppts(
      user.id,
      appointments.map(a => a.id === id ? { ...a, status: 'cancelled' as const } : a)
    );
  }

  return (
    <Ctx.Provider value={{ user, appointments, loading, login, register, logout, bookAppointment, cancelAppointment }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth outside AuthProvider');
  return c;
}

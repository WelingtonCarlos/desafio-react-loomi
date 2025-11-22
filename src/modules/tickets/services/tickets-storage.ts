"use client";

import type { TicketsResponse } from "../types/tickets.types";

const STORAGE_KEY = "tickets:data-clone";

const isBrowser = () => typeof window !== "undefined";

function deepClone<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
}

function readStorage(): TicketsResponse | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) return null;
  try {
    return JSON.parse(raw) as TicketsResponse;
  } catch (error) {
    console.warn("[tickets-storage] Falha ao parsear clone persistido", error);
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function writeStorage(data: TicketsResponse) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function ensureTicketsClone(source: TicketsResponse): TicketsResponse {
  if (!isBrowser()) return source;

  const cached = readStorage();
  if (cached) {
    return cached;
  }

  const clone = deepClone(source);
  writeStorage(clone);
  return clone;
}

export function getTicketsClone(): TicketsResponse | null {
  return readStorage();
}

export function setTicketsClone(data: TicketsResponse): TicketsResponse {
  const clone = deepClone(data);
  writeStorage(clone);
  return clone;
}

export function updateTicketsClone(
  updater: (current: TicketsResponse) => TicketsResponse
): TicketsResponse {
  const current = readStorage();
  if (!current) {
    throw new Error(
      "[tickets-storage] Clone não inicializado. Execute o GET de tickets antes de criar/editar."
    );
  }

  const updated = updater(deepClone(current));
  return setTicketsClone(updated);
}

export function resetTicketsClone() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}


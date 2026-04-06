"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {}; // No-op subscription

export const useHasHydrated = () => {
  return useSyncExternalStore(
    subscribe,
    () => true, // Value on the client
    () => false, // Value on the server (initial)
  );
};

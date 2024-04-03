import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";



interface PersistedStateType {
  userId: string;
  userFullname: string;
}

export function usePersistedState(key: string, defaultValue: string | undefined)
  : [PersistedStateType, Dispatch<SetStateAction<PersistedStateType>>] {
  const [state, setState] = useState<PersistedStateType>(
    () => {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : defaultValue;
    }
  );
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

// Necessary for hydrating Zustand state from local-storage. From: https://docs.pmnd.rs/zustand/integrations/persisting-store-data#usage-in-next.js
// Used only for "get" operations, not "set"
import { useState, useEffect } from "react";

const useHydratedStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [state, setState] = useState<F>();

  useEffect(() => {
    setState(result);
  }, [result]);

  return state;
};

export default useHydratedStore;

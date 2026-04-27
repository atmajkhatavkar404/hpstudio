import { useEffect, useState } from "react";
import { loadManifest, type Manifest } from "./images";

const EMPTY: Manifest = { generatedAt: "", total: 0, categories: {} };

export function useManifest(): Manifest {
  const [m, setM] = useState<Manifest>(EMPTY);
  useEffect(() => {
    let alive = true;
    loadManifest().then((data) => {
      if (alive) setM(data);
    });
    return () => {
      alive = false;
    };
  }, []);
  return m;
}

import { useEffect, useState } from "react";

export function useTrending(interval = 5000) {
  const [data, setData] = useState<any[]>([]);
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    const fetchTrending = async () => {
      const res = await fetch("/api/trending");
      const json = await res.json();
      setData(json.items);
      setUpdatedAt(json.updatedAt);
    };

    fetchTrending();
    const id = setInterval(fetchTrending, interval);

    return () => clearInterval(id);
  }, [interval]);

  return { data, updatedAt };
}

import { useEffect, useState } from "react";
import { unsplash } from "../api/unsplash";

export function useUnsplashImage(query: string) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchImage = async () => {
      try {
        const result = await unsplash.search.getPhotos({
          query,
          perPage: 1,
        });

        if (result.response?.results[0]) {
          setUrl(result.response.results[0].urls.small);
        } else {
          setUrl("https://via.placeholder.com/400x300?text=No+Image");
        }
      } catch (err) {
        console.error("Unsplash error:", err);
        setUrl("https://via.placeholder.com/400x300?text=Error");
      }
    };

    fetchImage();
  }, [query]);

  return url;
}

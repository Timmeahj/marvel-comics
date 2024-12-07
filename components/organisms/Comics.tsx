import React, { useEffect, useState } from 'react';
import md5 from 'md5';
import { openDB } from "idb";

interface ComicHandlerProps {
  comicHandler: () => void;
}

const DATABASE_NAME = "MarvelComicsDB";
const STORE_NAME = "Comics";

const Comics: React.FC<ComicHandlerProps> = ({ comicHandler }) => {
  const [comics, setComics] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize IndexedDB
  const initializeDB = async () => {
    const db = await openDB(DATABASE_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      },
    });
    return db;
  };

  // Save comics to IndexedDB
  const saveToIndexedDB = async (comics: any[]) => {
    const db = await initializeDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    comics.forEach((comic) => store.put(comic));
    await tx.done;
  };

  // Load comics from IndexedDB
  const loadFromIndexedDB = async () => {
    const db = await initializeDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const storedComics = await store.getAll();
    return storedComics;
  };

  const fetchComics = async (offset = 0) => {
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY!;
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey);

    const url = "http://gateway.marvel.com/v1/public/comics";
    const params = new URLSearchParams({
      apikey: publicKey,
      ts,
      hash,
      offset: offset.toString(),
      limit: "100",
    }).toString();

    try {
      const response = await fetch(`${url}?${params}`, {
        method: "GET",
        headers: { Accept: "*/*" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comics");
      }

      const data = await response.json();
      return data.data.results; // Return fetched comics
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };

  // Load comics with IndexedDB as the main cache
  const loadComics = async () => {
    try {
      // First, try loading from IndexedDB
      const cachedComics = await loadFromIndexedDB();
      if (cachedComics.length > 0) {
        setComics(cachedComics);
        setLoading(false);
        return;
      }

      // If no cached comics, fetch from API
      let allComics: any[] = [];
      let offset = 0;
      let counter = 0;

      // Limit to avoid infinite requests
      while (counter < 20) {
        counter++;
        console.log("fetch counter: "+counter);
        const fetchedComics = await fetchComics(offset);

        if (fetchedComics.length === 0) break; // Stop when no more comics are found

        allComics = [...allComics, ...fetchedComics];
        offset += 100;
      }

      // Save fetched comics to IndexedDB and update state
      await saveToIndexedDB(allComics);
      setComics(allComics);
      setLoading(false);
    } catch (err) {
      setError("An error occurred while loading comics");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComics(); // Load comics on component mount
  }, []);
  return (
    <div>
        {comics.length > 0 ? (
          <div  className='main__results row'>
            {comics.map((comic, index) => (
              <div  className="col-sm-6" key={index}>
                <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} onClick={comicHandler}/>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading comics...</p>
        )}
    </div>
  );
};

export default Comics;
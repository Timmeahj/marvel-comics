import React, { useEffect, useState, useRef } from "react";
import { openDB } from "idb";

interface ComicHandlerProps {
  comicHandler: () => void;
}

const DATABASE_NAME = "MarvelComicsDB";
const STORE_NAME = "Comics";
const ITEMS_PER_PAGE = 10;

const Comics: React.FC<ComicHandlerProps> = ({ comicHandler }) => {
  const [comics, setComics] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState<string>("");

  const comicsRef = useRef<any[]>([]); // Use this ref to track all comics across rerenders

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

  const saveToIndexedDB = async (comics: any[]) => {
    const db = await initializeDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    comics.forEach((comic) => store.put(comic));
    await tx.done;
  };

  const loadFromIndexedDB = async () => {
    const db = await initializeDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const storedComics = await store.getAll();
    return storedComics;
  };

  const fetchComics = async (offset = 0) => {
    try {
      const response = await fetch(`/api/proxy?offset=${offset}&limit=100`, {
        method: "GET",
        headers: { Accept: "*/*" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comics");
      }

      const data = await response.json();
      return data.data.results;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };

  const loadComics = async () => {
    try {
      const cachedComics = await loadFromIndexedDB();
      if (cachedComics.length > 0) {
        setComics(cachedComics);
        setLoading(false);
        return;
      }

      let offset = 0;
      let counter = 0;

      while (counter < 20) {
        counter++;
        console.log(`Fetching batch ${counter}...`);

        const fetchedComics = await fetchComics(offset);
        if (fetchedComics.length === 0) break;

        offset += 100;

        // Filter out comics with placeholder image URLs
        const validComics = fetchedComics.filter(
          // @ts-ignore: TODO fix typing
          (comic) =>
            comic.thumbnail.path !==
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
        );

        // Incrementally add to comicsRef (useRef holds previous data across re-renders)
        comicsRef.current = [...comicsRef.current, ...validComics];

        // Save incrementally to IndexedDB
        await saveToIndexedDB(validComics);

        // Update state with the current list of comics after each batch
        setComics(comicsRef.current);

        // Ensure that the loading state is updated after each batch
        setLoading(false);

        // Render immediately after each batch
        console.log(`Batch ${counter} added: ${validComics.length} comics`);
      }
    } catch (err) {
      setError("An error occurred while loading comics");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComics();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterText]);

  // Filter comics based on user input
  const filteredComics = comics.filter((comic) =>
    comic.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredComics.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedComics = filteredComics.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading comics...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <h5>Choose your featured comic:</h5>
          <input
            type="text"
            id="filter"
            placeholder="e.g Spiderman"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)} // Update filterText on input
          />
          <div className="main__results row">
            {displayedComics.map((comic, index) => (
              <div className="col-sm-6" key={index}>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  onClick={comicHandler}
                />
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="btn btn-secondary"
            >
              Previous
            </button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="btn btn-secondary"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comics;

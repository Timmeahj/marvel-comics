import React, { useEffect, useState } from 'react';
import md5 from 'md5';

interface ComicHandlerProps {
    comicHandler: () => void; 
}

const Comics: React.FC<ComicHandlerProps> = ({ comicHandler }) => {
  const [comics, setComics] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComics = async () => {
      const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
      const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
      const ts = new Date().getTime().toString();  // Timestamp
      const hash = md5(ts + privateKey + publicKey);  // Generate the hash (md5)

      const url = `http://gateway.marvel.com/v1/public/comics`;
      const params = new URLSearchParams({
        apikey: publicKey,
        ts,
        hash,
      }).toString();

      try {
        const response = await fetch(`${url}?${params}`, {
          method: 'GET',
          headers: {
            Accept: '*/*',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch comics');
        }

        const data = await response.json();
        console.log(data);
        setComics(data.data.results);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchComics();
  }, []);

  return (
    <div>
        {comics.length > 0 ? (
          <div  className='main__results row'>
            {comics.map((comic, index) => (
              <div  className="col-sm-6 col-md-4" key={index}>
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
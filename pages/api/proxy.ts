import { NextApiRequest, NextApiResponse } from 'next';
import md5 from 'md5';

interface MarvelApiResponse {
  data: {
    results: any[]; // Adjust the type of the results array according to the response structure
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // Fetch public and private keys from environment variables
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    console.error("Missing environment variables for Marvel API");
    return res.status(500).json({ error: 'Missing environment variables for Marvel API' });
  }

  // Generate timestamp and hash for the request
  const ts = Date.now().toString();
  const hash = md5(ts + privateKey + publicKey);

  // Construct the Marvel API URL with the timestamp and hash
  const marvelApiUrl = `https://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&ts=${ts}&hash=${hash}&offset=0&limit=100`;

  try {
    const response = await fetch(marvelApiUrl);

    // If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error('Failed to fetch from Marvel API');
    }

    const data: MarvelApiResponse = await response.json();
    res.status(200).json(data);
  } catch (error) {
    // Ensure error handling includes the correct type
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(errorMessage);
    res.status(500).json({ error: errorMessage });
  }
}
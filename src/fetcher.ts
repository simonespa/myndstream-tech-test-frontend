type FetcherArgs = Parameters<typeof fetch>;

const fetcher = (...args: FetcherArgs) =>
  fetch(...args).then((res: Response) => res.json());

export default fetcher;

import fetch  from 'cross-fetch';
import fetchBuilder, { FetchRetryParams } from 'fetch-retry-ts';

const URL = 'https://www.google.com:81';
const timeout = 3000;

const frOptions: FetchRetryParams = {
  retries: 3,
  retryDelay: 2000,
  retryOn: (attemp: number, retries: number, error: Error | null, response: Response | null) => { 
    console.log(`Attempt ${attemp} at  ${ (new Date()).toUTCString() }`, 'Error', error ); 
    return attemp < retries
  },
};

const _fetch = fetchBuilder(fetch, frOptions);

const run = async () => {
  const retry = process.argv[2] ? true : false;

  console.log(`Requesting with retry ${ retry }`)
  
  const strategy = retry ? _fetch : fetch;
  const controller = new AbortController();
  const id = setTimeout(() => { controller.abort(); console.log('controller aborted!!!') }, timeout);

  console.log('Fetching w/ AbortController approach ..... ', (new Date()).toUTCString())
  const response = await strategy(URL, {
    method: 'GET',
    signal: controller.signal  
  });

  clearTimeout(id);
  
  return response;
};

run()
  .then(() => console.log('Finished successfully at ...', (new Date()).toUTCString()))
  .catch(() => console.log('Aborted at ...', (new Date()).toUTCString()));

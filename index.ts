import { fetch } from 'cross-fetch';

const URL = 'https://www.google.com:81';
const timeout = 2000;

const usingAbortController = async () => {
  const controller = new AbortController();
  const id = setTimeout(() => { controller.abort(); console.log('controller aborted!!!') }, timeout);

  console.log('Fetching..... ', (new Date()).toUTCString())
  const response = await fetch(URL, {
    method: 'GET',
    signal: controller.signal  
  });

  clearTimeout(id);
  
  return response;
}


if (process.env.ABORT_CONTROLLER) {
  usingAbortController()
    .then(() => console.log('Finished successfully at ...', (new Date()).toUTCString()))
    .catch(() => console.log('Aborted at ...', (new Date()).toUTCString()));
} else {
  standardTimeout()

}



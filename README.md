# Fetch retry with timeout demo.


We will use the [fetch-retry-ts](https://www.npmjs.com/package/fetch-retry-ts) npm module and will implement a timeout using the 
[AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) approach.


Intention is to demo that this approach works properly with fetch-retry.

The fetch implmentation to be used is [crossfetch](https://www.npmjs.com/package/cross-fetch) because we wanna use the code in both, web browser and nodejs implementations.

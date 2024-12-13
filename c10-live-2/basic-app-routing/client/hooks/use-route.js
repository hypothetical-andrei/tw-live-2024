import { useState, useEffect } from 'react';

function useRoute() {
  const [route, setRoute] = useState(() => parseRoute(window.location));

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRoute(window.location));
    };

    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return route;
}

function parseRoute(location) {
  const hash = location.hash.slice(1); // Remove the leading '#'
  const [path, queryString] = hash.split('?');
  const params = new URLSearchParams(queryString);

  const parsedParams = {};
  for (const [key, value] of params.entries()) {
    parsedParams[key] = value;
  }

  return { path, params: parsedParams };
}

export default useRoute;

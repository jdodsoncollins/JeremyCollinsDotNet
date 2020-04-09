import React from 'react';

export const wrapRootElement = ({ element }) => {
  // theme-ui stores light/dark setting in localstorage, and I want to read from system light/dark instead on inital load
  // in beforeunload because otherwise this can asyncronously run mid-render for other components, causing incorrect theme data to be used
  window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    if (window.localStorage && window.localStorage.getItem('theme-ui-color-mode')) window.localStorage.removeItem('theme-ui-color-mode');
    return;
  });
  return (
    <>{element}</>
  );
}
import React from 'react';

export const wrapRootElement = ({ element }) => {
  // theme-ui stores light/dark setting in localstorage, and I want to read from system light/dark instead on inital load
  // in beforeunload because otherwise this can asyncronously run mid-render for other components, causing incorrect theme data to be used
  window.addEventListener('beforeunload', function (e) {
    if (window.localStorage && window.localStorage.getItem('theme-ui-color-mode')) window.localStorage.removeItem('theme-ui-color-mode');
    return;
  });
  (function(f, a, t, h, o, m){
    a[h]=a[h]||function(){
      (a[h].q=a[h].q||[]).push(arguments)
    };
    o=f.createElement('script'),
    m=f.getElementsByTagName('script')[0];
    o.async=1; o.src=t; o.id='fathom-script';
    m.parentNode.insertBefore(o,m)
  })(document, window, '//fathom.jeremycollins.net/tracker.js', 'fathom');
  fathom('set', 'siteId', 'DECCX');
  fathom('trackPageview');
  return (
    <>{element}</>
  );
}
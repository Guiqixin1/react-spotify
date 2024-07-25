import React, { createContext, useRef } from 'react';

export const MusicPlayerContext = createContext(null);

export const MusicPlayerProvider = ({ children }) => {
  const musicPlayerRef = useRef(null);

  return (
    <MusicPlayerContext.Provider value={musicPlayerRef}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

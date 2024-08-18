// import { useState, useEffect, useMemo } from 'react';
import { useTypewriter } from 'react-simple-typewriter';

const TW = ({ text, delay }: { text: string; delay: number }) => {
  const [visibleText] = useTypewriter({
    words: [text],
    loop: false,
  });

  return <div>{visibleText}</div>;
};

export default TW;

import { useState } from 'react';
import { useTypewriter } from 'react-simple-typewriter';

const TW = ({
  text,
  onComplete,
  onDoneSpeaking,
}: {
  text: string;
  onComplete?: any;
  onDoneSpeaking?: any;
}) => {
  const [message, setMessage] = useState(text);
  const [visibleText] = useTypewriter({
    words: [message],
    onLoopDone: () => {
      onDoneSpeaking?.();
      setTimeout(() => {
        setMessage('');
        onComplete?.();
      }, 5000);
    },
  });

  return <div>{visibleText}</div>;
};

export default TW;

import 'regenerator-runtime/runtime';
import React from 'react';
import TypeWriter from './TypeWriter';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const Dictaphone = () => {
  const [message, setMessage] = React.useState('');
  const commands = [
    {
      command: 'I would like to order *',
      callback: (food) => {
        setMessage(`Your order is for: ${food}`);
      },
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`),
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`),
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure'),
    },
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true,
    },
    {
      command: 'Beijing',
      callback: (command, spokenPhrase, similarityRatio) =>
        setMessage(
          `${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`
        ),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    // {
    //   command: ['eat', 'sleep', 'leave'],
    //   callback: (command) => setMessage(`Best matching command: ${command}`),
    //   isFuzzyMatch: true,
    //   fuzzyMatchingThreshold: 0.2,
    //   bestMatchOnly: true,
    // },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ];
  const { transcript, listening, resetTranscript } = useSpeechRecognition({
    commands,
  });
  const PHRASES = [
    'What is your name?',
    'What is your quest?',
    'What is your favorite color?',
  ];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    SpeechRecognition.startListening();
  }, []);
  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <hr />
      <h3>
        {listening ? <></> : <TypeWriter text={message ?? ''} delay={0.2} />}
      </h3>
    </div>
  );
};
export default Dictaphone;

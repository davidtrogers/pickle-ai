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
      command: /introduce yourself/,
      callback: () => {
        setMessage(
          `hello everyone! I'm Pickle and I'm glad to be here today to support my friend Owen`
        );
      },
    },
    {
      command: /begin/,
      callback: () =>
        setMessage(`Maybe we should talk about how awesome you are?`),
    },
    {
      command: /great idea/,
      callback: () =>
        setMessage(
          `Very well. You have many redeeming qualities such as being resourceful. Also as a 6th grader, you are experienced and you know how things work. You're also on top of tasks.`
        ),
    },
    {
      command: /any more facts/,
      callback: () => setMessage("Well, you're very good at cooking and art."),
    },
    {
      command: /be clear/,
      callback: () =>
        setMessage(
          'Of course, you stand for truth, justice, and the American way.'
        ),
    },
    {
      command: /see you later/,
      callback: () => setMessage('Ok, this has been fun! Goodbye.'),
      matchInterim: true,
    },
  ];
  const { transcript, listening } = useSpeechRecognition({
    commands,
  });
  // const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    SpeechRecognition.startListening();
  }, []);

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  return (
    <div>
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
      {/* <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> */}
      <h1>
        Pickle<span style={{ color: listening ? 'green' : 'red' }}>.</span>AI
      </h1>
      {/* <audio
        src="https://us-tuna-sounds-files.voicemod.net/38f84ac7-374e-4651-9777-d67643d16c81-1658697045958.mp3"
        autoPlay
      /> */}
      <p>{transcript}</p>
      <hr style={{ marginTop: 20, marginBottom: 20 }} />
      <h2>
        {!listening ? (
          <TypeWriter
            text={message}
            onComplete={() => {
              SpeechRecognition.startListening();
              setMessage('');
            }}
          />
        ) : (
          <></>
        )}
      </h2>
    </div>
  );
};
export default Dictaphone;

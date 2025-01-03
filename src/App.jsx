import TextToSpeech from "./components/TextToSpeech";
import AnimatedAppBackground from "./components/AnimatedAppBackground";

const App = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      <AnimatedAppBackground />
      <div className="relative z-10 w-full">
        <TextToSpeech />
      </div>
    </div>
  );
};

export default App;
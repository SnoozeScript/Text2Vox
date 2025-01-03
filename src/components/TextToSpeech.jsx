import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Volume2, Download, Wand2, Settings, Loader2 } from "lucide-react";

const TTS_MODELS = [
  {
    name: "ESPNET - VITS",
    url: "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits",
    description: "Clear and natural English voice",
    language: "English",
  },
  {
    name: "Facebook - MMS TTS",
    url: "https://api-inference.huggingface.co/models/facebook/mms-tts-eng",
    description: "High quality English speech",
    language: "English",
  },
];

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [selectedModel, setSelectedModel] = useState(TTS_MODELS[0].url);
  const [error, setError] = useState("");

  const handleSpeak = async () => {
    if (!text.trim()) {
      setError("Please enter text to convert.");
      return;
    }

    setLoading(true);
    setError("");
    setAudioURL("");

    const payload = { inputs: text };

    try {
      const response = await axios.post(selectedModel, payload, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });

      if (response.status === 200) {
        const audioBlob = new Blob([response.data], { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      } else {
        setError("Failed to generate speech. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Text2Vox
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-300" />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text here..."
                  className="w-full h-64 px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSpeak}
                  disabled={loading || !text.trim()}
                  className={`absolute bottom-4 right-4 px-6 py-2.5 rounded-lg font-medium flex items-center space-x-2 ${
                    loading || !text.trim()
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  } transition-all duration-200`}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Wand2 className="w-5 h-5" />
                  )}
                  <span>{loading ? "Converting..." : "Convert"}</span>
                </motion.button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Voice Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                >
                  {TTS_MODELS.map((model) => (
                    <option key={model.url} value={model.url} className="bg-gray-700">
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              {audioURL && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4"
                >
                  <audio
                    controls
                    src={audioURL}
                    className="w-full mb-4"
                  ></audio>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = audioURL;
                      link.download = "text2vox-audio.wav";
                      link.click();
                    }}
                    className="w-full py-2.5 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-red-900/50 text-red-200 p-4 rounded-xl border border-red-800"
            >
              {error}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TextToSpeech;
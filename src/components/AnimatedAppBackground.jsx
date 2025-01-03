import { motion } from "framer-motion";

const AnimatedAppBackground = () => {
  // Create vertical bars for the main visualization
  const bars = Array.from({ length: 40 }, (_, i) => i);
  
  // Create accent lines
  const lines = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0A0F1C] overflow-hidden">
      {/* Main visualization bars */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around h-full">
        {bars.map((i) => (
          <motion.div
            key={i}
            className="w-2 bg-gradient-to-t from-blue-600/20 via-cyan-400/40 to-transparent"
            animate={{
              height: [
                `${20 + Math.sin(i * 0.5) * 10}%`,
                `${60 + Math.sin(i * 0.5) * 30}%`,
                `${20 + Math.sin(i * 0.5) * 10}%`,
              ],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Horizontal scanning line */}
      <motion.div
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{
          top: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          filter: "blur(2px)",
        }}
      />

      {/* Diagonal accent lines */}
      {lines.map((i) => (
        <motion.div
          key={i}
          className="absolute left-0 w-full h-[1px] bg-blue-400/20 origin-left"
          style={{
            top: `${(i + 1) * 15}%`,
            transform: "rotate(45deg)",
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleX: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Circular interface elements */}
      <div className="absolute top-20 left-20">
        <motion.div
          className="w-32 h-32 rounded-full border border-cyan-400/20"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </div>

      <div className="absolute bottom-20 right-20">
        <motion.div
          className="w-40 h-40 rounded-full border border-blue-400/20"
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: {
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#0A0F1C]/50 to-[#0A0F1C]/80" />

      {/* Moving dots */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedAppBackground;
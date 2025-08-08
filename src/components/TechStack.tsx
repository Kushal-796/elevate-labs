import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'

const technologies = [
  {
    id: 1,
    name: "React",
    description: "Modern JavaScript library for building user interfaces with component-based architecture",
    category: "Frontend",
    color: "from-blue-400 to-cyan-400",
    icon: "⚛️",
    bgColor: "bg-blue-500"
  },
  {
    id: 2,
    name: "TypeScript",
    description: "Strongly typed programming language that builds on JavaScript for better development experience",
    category: "Language",
    color: "from-blue-500 to-indigo-500",
    icon: "📘",
    bgColor: "bg-blue-600"
  },
  {
    id: 3,
    name: "Next.js",
    description: "Full-stack React framework with server-side rendering and optimal performance",
    category: "Framework",
    color: "from-gray-800 to-gray-600",
    icon: "▲",
    bgColor: "bg-gray-800"
  },
  {
    id: 4,
    name: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 engine for scalable backend applications",
    category: "Backend",
    color: "from-green-500 to-emerald-500",
    icon: "🟢",
    bgColor: "bg-green-500"
  },
  {
    id: 5,
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapidly building custom user interfaces",
    category: "Styling",
    color: "from-cyan-400 to-teal-400",
    icon: "🎨",
    bgColor: "bg-cyan-500"
  },
  {
    id: 6,
    name: "Framer Motion",
    description: "Production-ready motion library for React with powerful animation capabilities",
    category: "Animation",
    color: "from-purple-500 to-pink-500",
    icon: "✨",
    bgColor: "bg-purple-500"
  },
  {
    id: 7,
    name: "Supabase",
    description: "Open source Firebase alternative with real-time database and authentication",
    category: "Backend",
    color: "from-green-400 to-cyan-400",
    icon: "🗄️",
    bgColor: "bg-green-400"
  },
  {
    id: 8,
    name: "AWS",
    description: "Comprehensive cloud computing platform with scalable infrastructure services",
    category: "Cloud",
    color: "from-orange-500 to-yellow-500",
    icon: "☁️",
    bgColor: "bg-orange-500"
  }
]

interface NotificationCardProps {
  tech: typeof technologies[0]
  index: number
  total: number
  onRemove: () => void
}

const NotificationCard: React.FC<NotificationCardProps> = ({ tech, index, total, onRemove }) => {
  const isTop = index === 0
  const stackOffset = Math.min(index * 8, 32) // Max offset of 32px
  const stackScale = 1 - (index * 0.02) // Slight scale decrease for depth
  const stackOpacity = 1 - (index * 0.15) // Fade effect for depth

  const cardVariants: Variants = {
    initial: {
      scale: 0.8,
      opacity: 0,
      y: -50,
    },
    animate: {
      scale: stackScale,
      opacity: stackOpacity,
      y: stackOffset,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        delay: index * 0.1
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      x: index % 2 === 0 ? 300 : -300,
      rotate: index % 2 === 0 ? 10 : -10,
      transition: {
        duration: 0.3
      }
    },
    hover: isTop ? {
      scale: stackScale * 1.02,
      y: stackOffset - 5,
      transition: {
        duration: 0.2
      }
    } : {}
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={isTop ? "hover" : undefined}
      className={`absolute inset-x-0 cursor-pointer ${isTop ? 'z-50' : ''}`}
      style={{ zIndex: total - index }}
      onClick={isTop ? onRemove : undefined}
    >
      <div className="mx-auto max-w-sm">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className={`${tech.bgColor} px-6 py-4 flex items-center gap-4`}>
            <div className="text-2xl">{tech.icon}</div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">{tech.name}</h3>
              <p className="text-white/80 text-sm">{tech.category}</p>
            </div>
            <div className="text-white/60 text-xs">now</div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 text-sm leading-relaxed">
              {tech.description}
            </p>
            
            {/* Action buttons */}
            <div className="flex gap-3 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium"
              >
                Learn More
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600"
              >
                Dismiss
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const TechStack: React.FC = () => {
  const [currentStack, setCurrentStack] = useState(technologies.slice(0, 4))
  const [removedCount, setRemovedCount] = useState(0)

  const removeTopCard = () => {
    if (currentStack.length > 0) {
      const newStack = currentStack.slice(1)
      setCurrentStack(newStack)
      setRemovedCount(prev => prev + 1)
      
      // Add a new card from the original array if available
      const nextIndex = (removedCount + 4) % technologies.length
      setTimeout(() => {
        setCurrentStack(prev => [...prev, technologies[nextIndex]])
      }, 300)
    }
  }

  const resetStack = () => {
    setCurrentStack(technologies.slice(0, 4))
    setRemovedCount(0)
  }

  // Auto-cycle through cards
  useEffect(() => {
    const interval = setInterval(() => {
      removeTopCard()
    }, 4000) // Change card every 4 seconds

    return () => clearInterval(interval)
  }, [currentStack, removedCount])

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Our Tech Stack
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Cutting-edge technologies and tools that power our exceptional digital solutions. 
            Tap the top card to see the next technology!
          </p>
          
          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={removeTopCard}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Next Tech
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetStack}
              className="px-6 py-3 border border-gray-400 text-gray-300 rounded-full font-semibold hover:border-gray-300 hover:text-white transition-all duration-300"
            >
              Reset Stack
            </motion.button>
          </div>
        </motion.div>

        {/* iOS Notification Stack */}
        <div className="flex justify-center items-center min-h-[500px]">
          <div className="relative w-full max-w-sm h-96">
            <AnimatePresence>
              {currentStack.map((tech, index) => (
                <NotificationCard
                  key={tech.id}
                  tech={tech}
                  index={index}
                  total={currentStack.length}
                  onRemove={removeTopCard}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Stack indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 text-sm mb-4">
            {currentStack.length} technologies in stack
          </p>
          <div className="flex justify-center gap-2">
            {currentStack.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className={`w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-blue-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
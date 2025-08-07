import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

const technologies = [
  {
    name: "React",
    description: "Modern JavaScript library for building user interfaces with component-based architecture",
    category: "Frontend",
    color: "from-blue-400 to-cyan-400"
  },
  {
    name: "TypeScript",
    description: "Strongly typed programming language that builds on JavaScript for better development experience",
    category: "Language",
    color: "from-blue-500 to-indigo-500"
  },
  {
    name: "Next.js",
    description: "Full-stack React framework with server-side rendering and optimal performance",
    category: "Framework",
    color: "from-gray-800 to-gray-600"
  },
  {
    name: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 engine for scalable backend applications",
    category: "Backend",
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapidly building custom user interfaces",
    category: "Styling",
    color: "from-cyan-400 to-teal-400"
  },
  {
    name: "Framer Motion",
    description: "Production-ready motion library for React with powerful animation capabilities",
    category: "Animation",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Supabase",
    description: "Open source Firebase alternative with real-time database and authentication",
    category: "Backend",
    color: "from-green-400 to-cyan-400"
  },
  {
    name: "Vercel",
    description: "Platform for frontend frameworks with global CDN and edge computing",
    category: "Deployment",
    color: "from-gray-900 to-black"
  },
  {
    name: "Prisma",
    description: "Modern database toolkit with type-safe database access and migrations",
    category: "Database",
    color: "from-indigo-500 to-purple-500"
  },
  {
    name: "Docker",
    description: "Containerization platform for consistent deployment across environments",
    category: "DevOps",
    color: "from-blue-600 to-cyan-600"
  },
  {
    name: "GraphQL",
    description: "Query language and runtime for APIs with efficient data fetching",
    category: "API",
    color: "from-pink-500 to-rose-500"
  },
  {
    name: "AWS",
    description: "Comprehensive cloud computing platform with scalable infrastructure services",
    category: "Cloud",
    color: "from-orange-500 to-yellow-500"
  }
]

export const TechStack: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !inView) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % technologies.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying, inView])

  const getVisibleItems = () => {
    const isMobile = window.innerWidth < 768
    const itemsToShow = isMobile ? 1 : 3
    const items = []
    
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % technologies.length
      items.push({
        ...technologies[index],
        isCenter: i === Math.floor(itemsToShow / 2)
      })
    }
    
    return items
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % technologies.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + technologies.length) % technologies.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
            "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
            "linear-gradient(225deg, rgba(236, 72, 153, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0"
      />

      <div className="container mx-auto px-4 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Our Tech Stack
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Cutting-edge technologies and tools that power our exceptional digital solutions
          </p>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 text-white" />
              ) : (
                <Play className="h-6 w-6 text-white ml-1" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.button>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {technologies.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-purple-400' : 'w-2 bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Technology Cards */}
        <div className="flex justify-center items-center min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl"
            >
              {getVisibleItems().map((tech, index) => (
                <motion.div
                  key={`${tech.name}-${currentIndex}`}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: tech.isCenter ? 1.1 : 1 
                  }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative group ${
                    tech.isCenter ? 'z-10' : 'md:scale-90 md:opacity-75'
                  }`}
                >
                  <div className="bg-slate-700/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 h-full hover:border-purple-400/40 transition-all duration-300">
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-10 rounded-2xl transition-opacity group-hover:opacity-20`} />
                    
                    <div className="relative z-10 text-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                      >
                        <span className="text-2xl font-bold text-white">
                          {tech.name.charAt(0)}
                        </span>
                      </motion.div>

                      <h3 className="text-2xl font-bold text-white mb-2">
                        {tech.name}
                      </h3>
                      
                      <p className="text-purple-300 text-sm mb-4 font-semibold">
                        {tech.category}
                      </p>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
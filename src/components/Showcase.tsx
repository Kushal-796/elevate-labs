import React, { useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, ArrowRight } from 'lucide-react'

const processSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "We dive deep into your business goals, target audience, and competitive landscape to create a comprehensive digital strategy.",
    duration: "1-2 weeks"
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "Our design team creates stunning visuals and interactive prototypes that bring your vision to life with pixel-perfect precision.",
    duration: "2-3 weeks"
  },
  {
    step: "03",
    title: "Development & Testing",
    description: "We build your solution using cutting-edge technologies, with rigorous testing to ensure flawless performance across all devices.",
    duration: "3-6 weeks"
  },
  {
    step: "04",
    title: "Launch & Optimization",
    description: "We deploy your project with zero downtime and provide ongoing optimization to maximize performance and user engagement.",
    duration: "1 week"
  }
]

export const Showcase: React.FC = () => {
  const titleElementRef = useRef<HTMLDivElement>(null)
  
  const { ref: titleInViewRef, inView: titleInView } = useInView({
    triggerOnce: false,
    threshold: 0.1
  })

  const setRefs = useCallback((node: HTMLDivElement | null) => {
    titleElementRef.current = node
    titleInViewRef(node)
  }, [titleInViewRef])

  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const { scrollYProgress } = useScroll({
    target: titleElementRef,
    offset: ["start end", "end start"]
  })

  // Scroll stack effects for the main title
  const titleY = useTransform(scrollYProgress, [0, 0.3, 1], [0, -50, -200])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 1, 0])
  const titleScale = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.95, 0.8])

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              opacity: [0.1, 0.5, 0.1],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        {/* Scroll Stack Title */}
        <div ref={setRefs} className="text-center mb-20 relative">
          <motion.div
            style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
            className="sticky top-20"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              {["We", "Craft", "Stunning", "Websites"].map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 50 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`inline-block mr-4 ${
                    index % 2 === 0
                      ? "bg-gradient-to-r from-blue-400 to-purple-400"
                      : "bg-gradient-to-r from-purple-400 to-pink-400"
                  } bg-clip-text text-transparent`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto"
            >
              From concept to launch, we deliver exceptional digital experiences that drive results
            </motion.p>
          </motion.div>
        </div>

        {/* Process Timeline */}
        <div ref={processRef} className="relative">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Our Process
          </motion.h3>

          <div className="space-y-12">
            {processSteps.map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={processInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Step Number */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center"
                >
                  <span className="text-2xl font-bold text-white">{process.step}</span>
                </motion.div>

                {/* Content */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex-1 bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-2xl font-bold text-white">{process.title}</h4>
                    <span className="text-purple-300 font-semibold">{process.duration}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">{process.description}</p>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Quality Guaranteed</span>
                  </div>
                </motion.div>

                {/* Arrow (hidden on mobile) */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-16"
                    style={{ top: `${(index + 1) * 200}px` }}
                  >
                    <ArrowRight className="h-6 w-6 text-purple-400 rotate-90" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
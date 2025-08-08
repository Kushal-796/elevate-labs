import React from 'react'
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { Code, Search } from 'lucide-react'

const services = [
  {
    title: "Web Development",
    description: "Custom websites and applications built with cutting-edge technologies for optimal performance and user experience.",
    icon: Code,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "SEO Optimization",
    description: "Data-driven strategies to improve your search engine rankings and drive organic traffic.",
    icon: Search,
    color: "from-green-500 to-emerald-500"
  }
]

const ServiceCube: React.FC<{ service: typeof services[0]; index: number }> = ({ service, index }) => {
  const { scrollYProgress } = useScroll()
  
  // Create different scroll-based transforms for each cube
  const scrollRotateX = useTransform(scrollYProgress, [0, 1], [0, 360 * (index + 1)])
  const scrollRotateY = useTransform(scrollYProgress, [0, 1], [0, 180 * (index + 1)])
  const scrollRotateZ = useTransform(scrollYProgress, [0, 1], [0, 90 * (index + 1)])
  
  // Motion values for drag-based rotation
  const dragRotateX = useMotionValue(0)
  const dragRotateY = useMotionValue(0)
  
  const Icon = service.icon

  return (
    <motion.div
      className="relative group perspective-1000"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.8,
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        className="relative w-64 h-64 mx-auto transform-style-preserve-3d cursor-grab active:cursor-grabbing select-none"
        style={{
          rotateX: useTransform(() => scrollRotateX.get() + dragRotateX.get()),
          rotateY: useTransform(() => scrollRotateY.get() + dragRotateY.get()), 
          rotateZ: scrollRotateZ
        }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0}
        dragMomentum={false}
        whileDrag={{
          cursor: "grabbing",
          scale: 1.05
        }}
        onDrag={(_, info) => {
          // Calculate rotation based on drag offset with sensitivity
          const sensitivity = 0.5
          dragRotateY.set(info.offset.x * sensitivity)
          dragRotateX.set(-info.offset.y * sensitivity)
        }}
        onDragEnd={() => {
          // Optionally reset drag rotation or keep it
          // dragRotateX.set(0)
          // dragRotateY.set(0)
        }}
        whileHover={{
          transition: { duration: 0.3 }
        }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full bg-slate-800/95 backdrop-blur-sm border border-slate-600/50 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-2xl" style={{ transform: 'translateZ(128px)' }}>
          <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800 border border-purple-500/50 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-2xl" style={{ transform: 'translateZ(-128px) rotateY(180deg)' }}>
          <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mb-4 shadow-xl`}>
            <Icon className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
        </div>

        {/* Right Face */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-500/50 rounded-lg p-6 flex items-center justify-center" style={{ transform: 'rotateY(90deg) translateZ(128px)' }}>
          <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Left Face */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 border border-pink-500/50 rounded-lg p-6 flex items-center justify-center" style={{ transform: 'rotateY(-90deg) translateZ(128px)' }}>
          <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Top Face */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-900 to-blue-900 border border-cyan-500/50 rounded-lg p-6 flex items-center justify-center" style={{ transform: 'rotateX(90deg) translateZ(128px)' }}>
          <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Bottom Face */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-900 to-teal-900 border border-green-500/50 rounded-lg p-6 flex items-center justify-center" style={{ transform: 'rotateX(-90deg) translateZ(128px)' }}>
          <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Glow effect */}
      <div className={`absolute inset-0 w-64 h-64 mx-auto bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl -z-10`} />
    </motion.div>
  )
}

export const Services: React.FC = () => {
  const { scrollYProgress } = useScroll()
  
  // Create global scroll-based animations
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])

  return (
    <section id="services" className="py-20 bg-slate-900 relative overflow-hidden min-h-screen">
      {/* Add custom CSS styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
        `
      }} />
      
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"
        style={{ y: backgroundY }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            style={{ scale: titleScale }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Comprehensive digital solutions delivered through interactive 3D experiences
          </motion.p>
        </motion.div>

        {/* 3D Service Cubes Grid */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 lg:gap-20">
          {services.map((service, index) => (
            <ServiceCube 
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border border-purple-400/30"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
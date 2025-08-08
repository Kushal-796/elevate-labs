import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ExternalLink, Github, Globe } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  emoji: string
  hueA: number
  hueB: number
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern, responsive e-commerce platform with real-time inventory management, secure payment processing, and advanced analytics dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/elevatelabs/ecommerce",
    emoji: "🛒",
    hueA: 340,
    hueB: 10
  },
  {
    id: 2,
    title: "AI-Powered SaaS Dashboard",
    description: "Intelligent analytics dashboard with machine learning insights, predictive modeling, and automated reporting for business intelligence.",
    technologies: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "Chart.js"],
    liveUrl: "https://ai-dashboard-demo.com",
    githubUrl: "https://github.com/elevatelabs/ai-dashboard",
    emoji: "🤖",
    hueA: 20,
    hueB: 40
  },
  {
    id: 3,
    title: "Social Media Mobile App",
    description: "Cross-platform mobile application with real-time messaging, content sharing, and advanced privacy controls for modern social networking.",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript", "Expo"],
    liveUrl: "https://social-app-demo.com",
    githubUrl: "https://github.com/elevatelabs/social-app",
    emoji: "📱",
    hueA: 60,
    hueB: 90
  },
  {
    id: 4,
    title: "Blockchain DeFi Platform",
    description: "Decentralized finance platform with yield farming, liquidity pools, and secure smart contracts for cryptocurrency trading and staking.",
    technologies: ["Solidity", "Web3.js", "React", "Ethereum", "MetaMask"],
    liveUrl: "https://defi-platform-demo.com",
    githubUrl: "https://github.com/elevatelabs/defi-platform",
    emoji: "₿",
    hueA: 80,
    hueB: 120
  },
  {
    id: 5,
    title: "Healthcare Management System",
    description: "Comprehensive healthcare management solution with patient records, appointment scheduling, telemedicine integration, and HIPAA compliance.",
    technologies: ["Vue.js", "Laravel", "MySQL", "WebRTC", "Docker"],
    liveUrl: "https://healthcare-demo.com",
    githubUrl: "https://github.com/elevatelabs/healthcare",
    emoji: "🏥",
    hueA: 100,
    hueB: 140
  }
]

interface ProjectCardProps {
  project: Project
  i: number
}

function ProjectCard({ project, i }: ProjectCardProps) {
  const background = `linear-gradient(306deg, ${hue(project.hueA)}, ${hue(project.hueB)})`

  return (
    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div style={{ ...splash, background }} />
      <motion.div style={card} variants={cardVariants} className="card">
        {/* Card Inner Container for 3D flip */}
        <div style={cardInner} className="card-inner">
          {/* Front Side */}
          <div style={cardFront} className="card-front">
            <div style={cardContent}>
              <div style={emojiStyle}>{project.emoji}</div>
              <div style={cardInfo}>
                <h3 style={titleStyle}>{project.title}</h3>
                <p style={descriptionStyle}>{project.description}</p>
                
                <div style={techContainer}>
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} style={techBadge}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span style={moreTech}>+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div style={cardBack} className="card-back">
            <div style={cardBackContent}>
              <div style={backTitle}>{project.title}</div>
              <div style={backIconContainer}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={backIconButton}
                  className="back-icon-button"
                >
                  <Globe style={backIconStyle} />
                  <span style={backIconLabel}>Website</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={backIconButton}
                  className="back-icon-button"
                >
                  <Github style={backIconStyle} />
                  <span style={backIconLabel}>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Add CSS for card flip effect */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .card {
            perspective: 1000px;
          }
          .card-inner {
            transition: transform 0.6s;
            transform-style: preserve-3d;
            position: relative;
            width: 100%;
            height: 100%;
          }
          .card:hover .card-inner {
            transform: rotateY(180deg);
          }
          .card-front, .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 20px;
          }
          .card-back {
            transform: rotateY(180deg);
          }
          .back-icon-button {
            transition: all 0.3s ease;
          }
          .back-icon-button:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          }
        `
      }} />
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div style={container}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Our Projects
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the innovative solutions we've crafted for our clients. 
            From cutting-edge web applications to mobile experiences that push boundaries.
          </p>
        </motion.div>

        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} i={i} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
          >
            <ExternalLink className="w-5 h-5" />
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  margin: "0 auto",
  maxWidth: 600,
  paddingBottom: 100,
  width: "100%",
  padding: "0 20px"
}

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
}

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card: React.CSSProperties = {
  width: 350,
  height: 500,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 60%",
}

const cardContent: React.CSSProperties = {
  padding: "20px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
}

const emojiStyle: React.CSSProperties = {
  fontSize: "80px",
  marginBottom: "20px",
}

const cardInfo: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "15px",
}

const titleStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#1f2937",
  margin: 0,
  lineHeight: "1.2",
}

const descriptionStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#6b7280",
  lineHeight: "1.5",
  margin: 0,
  flex: 1,
}

const techContainer: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  justifyContent: "center",
  marginTop: "auto",
}

const techBadge: React.CSSProperties = {
  fontSize: "11px",
  padding: "4px 8px",
  background: "rgba(59, 130, 246, 0.1)",
  color: "#3b82f6",
  borderRadius: "12px",
  border: "1px solid rgba(59, 130, 246, 0.2)",
}

const moreTech: React.CSSProperties = {
  fontSize: "11px",
  padding: "4px 8px",
  background: "rgba(107, 114, 128, 0.1)",
  color: "#6b7280",
  borderRadius: "12px",
  border: "1px solid rgba(107, 114, 128, 0.2)",
}

// New styles for card flip effect
const cardInner: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.6s",
  transformStyle: "preserve-3d",
}

const cardFront: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  background: "rgba(255, 255, 255, 0.95)",
  borderRadius: "20px",
}

const cardBack: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(139, 92, 246, 0.95))",
  borderRadius: "20px",
  transform: "rotateY(180deg)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const cardBackContent: React.CSSProperties = {
  padding: "40px",
  color: "white",
  textAlign: "center",
}

const backTitle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "30px",
  color: "white",
}

const backIconContainer: React.CSSProperties = {
  display: "flex",
  gap: "30px",
  justifyContent: "center",
  alignItems: "center",
}

const backIconButton: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  padding: "20px",
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  textDecoration: "none",
  color: "white",
  transition: "all 0.3s ease",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(10px)",
  cursor: "pointer",
}

const backIconStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
}

const backIconLabel: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
}

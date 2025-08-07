import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Lightbulb, Palette, Code, Rocket, CheckCircle2, Star, Zap, Target } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const processSteps = [
  {
    id: 1,
    icon: Lightbulb,
    title: "Ideation",
    subtitle: "Spark of Innovation",
    description: "We dive deep into understanding your vision, analyzing market trends, and crafting innovative solutions that set you apart.",
    color: "from-yellow-400 to-orange-500",
    bgColor: "from-yellow-500/10 to-orange-500/10"
  },
  {
    id: 2,
    icon: Palette,
    title: "Design",
    subtitle: "Visual Excellence",
    description: "Creating stunning, user-centric designs that not only look beautiful but also drive engagement and conversions.",
    color: "from-pink-400 to-purple-500",
    bgColor: "from-pink-500/10 to-purple-500/10"
  },
  {
    id: 3,
    icon: Code,
    title: "Development",
    subtitle: "Technical Mastery",
    description: "Building robust, scalable solutions using cutting-edge technologies and best practices for optimal performance.",
    color: "from-blue-400 to-cyan-500",
    bgColor: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 4,
    icon: Rocket,
    title: "Launch",
    subtitle: "Ready for Orbit",
    description: "Seamless deployment with continuous monitoring, optimization, and support to ensure your success.",
    color: "from-green-400 to-emerald-500",
    bgColor: "from-green-500/10 to-emerald-500/10"
  }
]

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const orbiterRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const path = pathRef.current
    const steps = stepsRef.current.filter(Boolean) as HTMLDivElement[]
    const orbiter = orbiterRef.current
    const particles = particlesRef.current.filter(Boolean) as HTMLDivElement[]

    if (!section || !title) return

    // Set initial states
    gsap.set(title, { opacity: 0, scale: 0.5, rotation: -10 })
    gsap.set(steps, { opacity: 0, scale: 0.3, y: 100 })
    gsap.set(particles, { opacity: 0, scale: 0 })

    // Title animation with creative morphing
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    })

    titleTl
      .to(title, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      })
      .to(title, {
        backgroundPosition: "200% center",
        duration: 2,
        ease: "none",
        repeat: -1
      }, "-=0.5")

    // Particles floating animation
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        opacity: Math.random() * 0.8 + 0.2,
        scale: Math.random() * 1.5 + 0.5,
        duration: 1,
        delay: index * 0.1,
        ease: "power2.out"
      })

      gsap.to(particle, {
        y: `+=${Math.random() * 200 - 100}`,
        x: `+=${Math.random() * 150 - 75}`,
        rotation: Math.random() * 360,
        duration: 4 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      })
    })

    // Orbiter animation along the path
    if (path && orbiter) {
      gsap.set(orbiter, { opacity: 0 })
      
      const pathTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 1
        }
      })

      pathTl
        .to(orbiter, { opacity: 1, duration: 0.1 })
        .to(orbiter, {
          motionPath: {
            path: path,
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
          },
          duration: 1,
          ease: "none"
        })
    }

    // Creative step animations
    steps.forEach((step, index) => {
      const stepTl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Main step animation
      stepTl
        .to(step, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)"
        })
        .to(step.querySelector('.step-icon'), {
          rotation: 360,
          scale: 1.2,
          duration: 1,
          ease: "elastic.out(1, 0.5)"
        }, "-=0.5")
        .to(step.querySelector('.step-number'), {
          scale: 1.3,
          duration: 0.5,
          ease: "back.out(2)",
          yoyo: true,
          repeat: 1
        }, "-=0.3")

      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(step, {
          scale: 1.05,
          y: -20,
          rotationY: index % 2 === 0 ? 5 : -5,
          duration: 0.4,
          ease: "power2.out"
        })

        gsap.to(step.querySelector('.step-glow'), {
          opacity: 0.6,
          scale: 1.2,
          duration: 0.4,
          ease: "power2.out"
        })

        gsap.to(step.querySelector('.step-icon'), {
          scale: 1.3,
          rotation: "+=15",
          duration: 0.3,
          ease: "power2.out"
        })
      }

      const handleMouseLeave = () => {
        gsap.to(step, {
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out"
        })

        gsap.to(step.querySelector('.step-glow'), {
          opacity: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        })

        gsap.to(step.querySelector('.step-icon'), {
          scale: 1.2,
          duration: 0.3,
          ease: "power2.out"
        })
      }

      step.addEventListener('mouseenter', handleMouseEnter)
      step.addEventListener('mouseleave', handleMouseLeave)
    })

    // Connecting line animation
    const line = section.querySelector('.connecting-line') as HTMLElement
    if (line) {
      gsap.fromTo(line, 
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1
          }
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="process" className="py-20 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden min-h-screen">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            ref={el => { if (el) particlesRef.current[i] = el }}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,.05)_25px,rgba(255,255,255,.05)_26px,transparent_27px,transparent_74px,rgba(255,255,255,.05)_75px,rgba(255,255,255,.05)_76px,transparent_77px),linear-gradient(rgba(255,255,255,.05)_24px,transparent_25px,transparent_26px,rgba(255,255,255,.05)_27px,rgba(255,255,255,.05)_74px,transparent_75px,transparent_76px,rgba(255,255,255,.05)_77px)] bg-[length:100px_100px]" />
      </div>

      {/* SVG Path for orbiter */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600">
        <path
          ref={pathRef}
          d="M100,300 Q200,150 400,300 T700,300"
          fill="none"
          stroke="rgba(139, 92, 246, 0.3)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      </svg>

      {/* Orbiter element */}
      <div
        ref={orbiterRef}
        className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full shadow-lg"
        style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.6)' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6"
            style={{ backgroundSize: '200% 100%' }}
          >
            Our Process
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            A journey of innovation, creativity, and technical excellence
          </p>
        </div>

        {/* Connecting vertical line */}
        <div className="connecting-line absolute left-1/2 top-40 bottom-20 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 transform -translate-x-1/2 hidden md:block" />

        {/* Process Steps */}
        <div className="relative space-y-32">
          {processSteps.map((step, index) => {
            const isEven = index % 2 === 0
            
            return (
              <div
                key={step.id}
                ref={el => { if (el) stepsRef.current[index] = el }}
                className={`flex items-center ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col gap-12`}
              >
                {/* Step Content */}
                <div className={`flex-1 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} text-center md:text-left`}>
                  <div className="relative">
                    {/* Background glow */}
                    <div className={`step-glow absolute -inset-8 bg-gradient-to-r ${step.bgColor} rounded-3xl blur-xl opacity-0 transition-opacity duration-500`} />
                    
                    {/* Content container */}
                    <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-300">
                      <div className="step-number absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.id}
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className={`text-lg bg-gradient-to-r ${step.color} bg-clip-text text-transparent font-semibold mb-4`}>
                        {step.subtitle}
                      </p>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step Icon */}
                <div className="relative">
                  {/* Icon container */}
                  <div className={`step-icon relative w-32 h-32 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-2xl`}>
                    <step.icon className="w-16 h-16 text-white" />
                    
                    {/* Rotating ring */}
                    <div className="absolute inset-0 border-4 border-dashed border-white/30 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
                    
                    {/* Pulse effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full opacity-75 animate-ping`} />
                  </div>

                  {/* Floating mini icons */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-32">
          <div className="relative inline-block">
            <button className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                <Target className="w-6 h-6" />
                Start Your Journey
                <CheckCircle2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              </span>
              
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const serviceElements = [
  "Web Development",
  "SEO Optimization",
]

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const elements = elementsRef.current.filter(Boolean) as HTMLDivElement[]

    if (!section || !title || !subtitle) return

    // Set initial states
    gsap.set(title, { opacity: 0, y: 50 })
    gsap.set(subtitle, { opacity: 0, y: 30 })
    
    // Set initial states for service elements (off-screen)
    elements.forEach((element, index) => {
      const isEven = index % 2 === 0
      gsap.set(element, {
        opacity: 0,
        x: isEven ? -300 : 300, // Even elements from left, odd from right
        y: 50,
        rotation: isEven ? -15 : 15
      })
    })

    // Animate header
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse"
      }
    })

    headerTl
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")

    // Animate service elements with stagger
    elements.forEach((element, index) => {
      const isEven = index % 2 === 0
      
      gsap.to(element, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse"
        }
      })

      // Add hover animations
      const handleMouseEnter = () => {
        gsap.to(element, {
          scale: 1.05,
          y: -10,
          rotation: isEven ? 2 : -2,
          duration: 0.3,
          ease: "power2.out"
        })
      }

      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      }

      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-slate-900 relative overflow-hidden min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
          >
            Our Services
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Comprehensive digital solutions to elevate your brand and accelerate your growth
          </p>
        </div>

        {/* Service Elements */}
        <div className="space-y-16">
          {serviceElements.map((service, index) => {
            const isEven = index % 2 === 0
            
            return (
              <div
                key={service}
                ref={el => { if (el) elementsRef.current[index] = el }}
                className={`flex items-center justify-center ${
                  isEven ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                <div className={`
                  relative group cursor-pointer max-w-md w-full
                  ${isEven ? 'text-left' : 'text-right'}
                `}>
                  {/* Glow background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Main content */}
                  <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-300">
                    {/* Service number */}
                    <div className={`
                      absolute -top-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm
                      ${isEven ? '-left-4' : '-right-4'}
                    `}>
                      {index + 1}
                    </div>
                    
                    {/* Service title */}
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {service}
                    </h3>
                    
                    {/* Service description */}
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {getServiceDescription(service)}
                    </p>
                    
                    {/* Decorative element */}
                    <div className={`
                      w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full
                      ${isEven ? '' : 'ml-auto'}
                    `} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Helper function to get service descriptions
function getServiceDescription(service: string): string {
  const descriptions: Record<string, string> = {
    "Web Development": "Custom websites and applications built with cutting-edge technologies for optimal performance and user experience.",
    "UI/UX Design": "Beautiful, intuitive designs that convert visitors into customers while maintaining brand consistency.",
    "SEO Optimization": "Data-driven strategies to improve your search engine rankings and drive organic traffic.",
    "Mobile Apps": "Native and cross-platform mobile applications that engage users and drive business growth.",
    "E-commerce": "Complete online store solutions with secure payment processing and inventory management.",
    "Digital Strategy": "Comprehensive digital transformation plans to accelerate your business growth.",
    "Brand Identity": "Cohesive visual identity systems that communicate your brand values effectively.",
    "Content Creation": "Engaging content that tells your story and connects with your target audience."
  }
  return descriptions[service] || "Professional digital solutions tailored to your business needs."
}
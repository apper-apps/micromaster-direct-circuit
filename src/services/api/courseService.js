import mockData from "@/services/mockData/courses.json"

class CourseService {
  constructor() {
    this.courses = [...mockData]
    this.loadFromStorage()
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem("micromaster_courses")
      if (stored) {
        this.courses = JSON.parse(stored)
      }
    } catch (error) {
      console.warn("Failed to load courses from storage:", error)
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem("micromaster_courses", JSON.stringify(this.courses))
    } catch (error) {
      console.warn("Failed to save courses to storage:", error)
    }
  }

  async delay() {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.courses].map(course => ({ ...course }))
  }

  async getById(id) {
    await this.delay()
    const course = this.courses.find(c => c.id === id)
    if (!course) {
      throw new Error(`Course with id ${id} not found`)
    }
    return { ...course }
  }

  async create(data) {
    await this.delay()
    
    // Generate comprehensive course based on topic
    const course = this.generateCourse(data.topic)
    
    // Maintain maximum of 10 courses
    if (this.courses.length >= 10) {
      this.courses.shift() // Remove oldest course
    }
    
    this.courses.push(course)
    this.saveToStorage()
    
    return { ...course }
  }

  async update(id, data) {
    await this.delay()
    
    const index = this.courses.findIndex(c => c.id === id)
    if (index === -1) {
      throw new Error(`Course with id ${id} not found`)
    }
    
    this.courses[index] = { ...this.courses[index], ...data }
    this.saveToStorage()
    
    return { ...this.courses[index] }
  }

  async delete(id) {
    await this.delay()
    
    const index = this.courses.findIndex(c => c.id === id)
    if (index === -1) {
      throw new Error(`Course with id ${id} not found`)
    }
    
    this.courses.splice(index, 1)
    this.saveToStorage()
    
    return true
  }

  generateCourse(topic) {
    const courseId = Date.now().toString()
    const modules = this.generateModules(topic, courseId)
    
    // Course title generation
    const courseTitle = this.generateCourseTitle(topic)
    const courseDescription = this.generateCourseDescription(topic)

    return {
      id: courseId,
      topic: topic,
      title: courseTitle,
      description: courseDescription,
      modules: modules,
      createdAt: new Date().toISOString(),
      completionStatus: 0
    }
  }

  generateCourseTitle(topic) {
    const templates = [
      `Mastering ${this.extractSubject(topic)}`,
      `Complete Guide to ${this.extractSubject(topic)}`,
      `${this.extractSubject(topic)}: From Beginner to Expert`,
      `Professional ${this.extractSubject(topic)} Course`,
      `Essential ${this.extractSubject(topic)} Skills`
    ]
    
    return templates[Math.floor(Math.random() * templates.length)]
  }

  generateCourseDescription(topic) {
    const subject = this.extractSubject(topic)
    return `A comprehensive 5-module course covering everything you need to know about ${subject.toLowerCase()}. Learn practical skills, master key concepts, and gain hands-on experience through structured exercises and real-world applications.`
  }

  extractSubject(topic) {
    // Extract the main subject from various topic formats
    const cleanTopic = topic.replace(/^(how to|learn|learning|master|mastering|become|becoming|start|starting|get started with)/i, "").trim()
    
    // Handle "how to become" patterns
    if (topic.toLowerCase().includes("how to become")) {
      const match = topic.match(/how to become (?:an? )?(.*)/i)
      if (match) return this.capitalize(match[1])
    }
    
    // Handle "learn" patterns  
    if (topic.toLowerCase().includes("learn")) {
      const match = topic.match(/learn (?:to )?(?:how to )?(.*)/i)
      if (match) return this.capitalize(match[1])
    }
    
    return this.capitalize(cleanTopic)
  }

  capitalize(str) {
    return str.split(" ").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(" ")
  }

  generateModules(topic, courseId) {
    const moduleTemplates = this.getModuleTemplates(topic)
    
    return moduleTemplates.map((template, index) => ({
      id: `${courseId}_module_${index + 1}`,
      number: index + 1,
      title: template.title,
      objectives: template.objectives,
      concepts: template.concepts,
      exercises: template.exercises,
      timeEstimate: Math.floor(Math.random() * 20) + 15, // 15-35 minutes
      completed: false
    }))
  }

  getModuleTemplates(topic) {
    const subject = this.extractSubject(topic).toLowerCase()
    
    // Watchmaking course (specific example)
    if (subject.includes("watchmak") || subject.includes("watch")) {
      return this.getWatchmakingModules()
    }
    
    // Business/entrepreneurship topics
    if (subject.includes("business") || subject.includes("startup") || subject.includes("entrepreneur")) {
      return this.getBusinessModules(subject)
    }
    
    // Digital marketing topics
    if (subject.includes("marketing") || subject.includes("social media") || subject.includes("advertising")) {
      return this.getMarketingModules(subject)
    }
    
    // Creative/artistic topics
    if (subject.includes("piano") || subject.includes("music") || subject.includes("photography") || subject.includes("art")) {
      return this.getCreativeModules(subject)
    }
    
    // Technical/programming topics
    if (subject.includes("programming") || subject.includes("coding") || subject.includes("web") || subject.includes("software")) {
      return this.getTechnicalModules(subject)
    }
    
    // Default generic modules
    return this.getGenericModules(subject)
  }

  getWatchmakingModules() {
    return [
      {
        title: "Understanding Watch Mechanics",
        objectives: [
          "Learn the fundamental components of mechanical watches",
          "Understand how watch movements work",
          "Identify different types of watch mechanisms"
        ],
        concepts: [
          {
            title: "Watch Movement Basics",
            content: "The heart of every mechanical watch is its movement - a complex system of gears, springs, and escapements that work together to keep accurate time.",
            keyTakeaway: "The escapement is the soul of the watch, controlling the release of energy from the mainspring."
          },
          {
            title: "Essential Components", 
            content: "Key components include the mainspring (power source), gear train (transfers energy), escapement (regulates timing), and balance wheel (oscillates to measure time).",
            keyTakeaway: "Each component must work in perfect harmony for accurate timekeeping."
          }
        ],
        exercises: [
          {
            title: "Component Identification",
            description: "Study high-resolution images of watch movements and identify each major component",
            type: "observation",
            difficulty: "Easy"
          },
          {
            title: "Movement Disassembly Practice",
            description: "Using a practice movement, carefully disassemble and reassemble the components",
            type: "hands-on",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Essential Tools and Workspace Setup",
        objectives: [
          "Identify and understand essential watchmaking tools",
          "Set up a proper workspace for watch repair",
          "Learn proper tool handling and maintenance"
        ],
        concepts: [
          {
            title: "Core Tool Set",
            content: "Essential tools include screwdrivers, case openers, movement holders, loupes, tweezers, and timing equipment. Quality tools are crucial for precision work.",
            keyTakeaway: "Invest in quality tools from the beginning - they are essential for professional results."
          },
          {
            title: "Workspace Organization",
            content: "A clean, well-lit workspace with proper organization prevents lost parts and contamination. Anti-magnetic mats and dust-free environments are essential.",
            keyTakeaway: "Organization and cleanliness are as important as technical skill in watchmaking."
          }
        ],
        exercises: [
          {
            title: "Tool Familiarization",
            description: "Handle and practice with each essential tool to build muscle memory",
            type: "practice",
            difficulty: "Easy"
          },
          {
            title: "Workspace Setup Challenge",
            description: "Design and set up an efficient workspace layout for watchmaking",
            type: "design",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Basic Watch Repair Techniques",
        objectives: [
          "Master fundamental repair techniques",
          "Learn to diagnose common watch problems",
          "Practice precision handling of small components"
        ],
        concepts: [
          {
            title: "Diagnostic Methods",
            content: "Systematic diagnosis involves listening to the watch, examining the movement visually, and testing various functions to identify issues.",
            keyTakeaway: "Proper diagnosis is half the repair - take time to understand the problem before acting."
          },
          {
            title: "Precision Techniques",
            content: "Working with watch components requires steady hands, proper lighting, and precise movements. Develop consistent techniques for handling delicate parts.",
            keyTakeaway: "Patience and precision are more valuable than speed in watchmaking."
          }
        ],
        exercises: [
          {
            title: "Problem Diagnosis Practice",
            description: "Practice diagnosing issues in various non-functional watch movements",
            type: "diagnosis",
            difficulty: "Medium"
          },
          {
            title: "Component Replacement",
            description: "Replace worn or damaged components in practice movements",
            type: "repair",
            difficulty: "Hard"
          }
        ]
      },
      {
        title: "Watch Assembly and Regulation",
        objectives: [
          "Learn proper assembly techniques for watch movements",
          "Understand timing and regulation principles",
          "Master the art of precise adjustment"
        ],
        concepts: [
          {
            title: "Assembly Order",
            content: "Proper assembly follows a specific sequence to ensure all components mesh correctly. The order matters for both function and accessibility.",
            keyTakeaway: "Following proper assembly sequence prevents damage and ensures optimal performance."
          },
          {
            title: "Timing and Regulation",
            content: "Regulation involves adjusting the balance wheel and escapement to achieve accurate timekeeping. This requires understanding of rate variations and beat adjustment.",
            keyTakeaway: "Good regulation is the difference between a timepiece and a precision instrument."
          }
        ],
        exercises: [
          {
            title: "Complete Movement Assembly",
            description: "Assemble a complete movement from individual components",
            type: "assembly",
            difficulty: "Hard"
          },
          {
            title: "Timing Machine Practice",
            description: "Use timing equipment to measure and adjust watch accuracy",
            type: "measurement",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Building Your Independent Practice",
        objectives: [
          "Understand the business aspects of independent watchmaking",
          "Learn about sourcing parts and materials",
          "Develop customer relations and service procedures"
        ],
        concepts: [
          {
            title: "Business Foundation",
            content: "Independent watchmaking requires business skills including customer service, pricing, inventory management, and quality assurance procedures.",
            keyTakeaway: "Technical skill must be paired with business acumen for successful independence."
          },
          {
            title: "Professional Standards",
            content: "Maintaining professional standards includes warranty policies, documentation, and continuous education to stay current with new techniques and technologies.",
            keyTakeaway: "Professional reputation is built on consistent quality and reliable service."
          }
        ],
        exercises: [
          {
            title: "Business Plan Development",
            description: "Create a basic business plan for your independent watchmaking practice",
            type: "planning",
            difficulty: "Medium"
          },
          {
            title: "Customer Service Scenarios",
            description: "Practice handling various customer situations and service requests",
            type: "roleplay",
            difficulty: "Medium"
          }
        ]
      }
    ]
  }

  getBusinessModules(subject) {
    return [
      {
        title: "Market Research and Validation",
        objectives: [
          "Learn how to identify market opportunities",
          "Understand customer validation techniques",
          "Develop market research methodologies"
        ],
        concepts: [
          {
            title: "Market Opportunity Analysis",
            content: "Identifying viable market opportunities involves analyzing market size, competition, customer pain points, and potential for growth.",
            keyTakeaway: "A good opportunity exists where customer need meets market gap with viable economics."
          },
          {
            title: "Customer Validation",
            content: "Validating customer demand before building requires surveys, interviews, prototype testing, and measuring real commitment signals.",
            keyTakeaway: "Customer validation saves time and money by confirming demand before investment."
          }
        ],
        exercises: [
          {
            title: "Competitive Analysis Matrix",
            description: "Create a comprehensive analysis of competitors in your chosen market",
            type: "analysis",
            difficulty: "Medium"
          },
          {
            title: "Customer Interview Project",
            description: "Conduct 10 customer interviews to validate your business idea",
            type: "research",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Business Model Development",
        objectives: [
          "Design sustainable business models",
          "Understand revenue streams and cost structures",
          "Learn business model validation techniques"
        ],
        concepts: [
          {
            title: "Revenue Model Design",
            content: "Effective revenue models align with customer value, market dynamics, and operational capabilities. Consider subscription, transaction, and hybrid models.",
            keyTakeaway: "The best revenue model maximizes customer lifetime value while minimizing acquisition costs."
          },
          {
            title: "Value Proposition Canvas",
            content: "Clearly articulating your value proposition helps customers understand why they should choose you over alternatives.",
            keyTakeaway: "A strong value proposition solves real problems better than existing solutions."
          }
        ],
        exercises: [
          {
            title: "Business Model Canvas",
            description: "Complete a detailed business model canvas for your venture",
            type: "planning",
            difficulty: "Medium"
          },
          {
            title: "Revenue Projection Model",
            description: "Build financial projections for your first 3 years of operation",
            type: "financial",
            difficulty: "Hard"
          }
        ]
      },
      {
        title: "Financial Planning and Funding",
        objectives: [
          "Master startup financial planning",
          "Understand different funding options",
          "Learn investor pitch fundamentals"
        ],
        concepts: [
          {
            title: "Startup Financial Basics",
            content: "Key financial concepts include cash flow management, burn rate, runway, unit economics, and break-even analysis.",
            keyTakeaway: "Cash flow is king - monitor it closely and plan for contingencies."
          },
          {
            title: "Funding Strategies",
            content: "Funding options range from bootstrapping and loans to angel investors and venture capital. Each has different requirements and implications.",
            keyTakeaway: "Choose funding that aligns with your growth timeline and control preferences."
          }
        ],
        exercises: [
          {
            title: "Financial Model Creation",
            description: "Build a comprehensive financial model with scenarios and assumptions",
            type: "financial",
            difficulty: "Hard"
          },
          {
            title: "Investor Pitch Development",
            description: "Create and practice delivering a compelling investor presentation",
            type: "presentation",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Operations and Team Building",
        objectives: [
          "Design efficient operational systems",
          "Learn team hiring and management basics",
          "Understand scaling principles"
        ],
        concepts: [
          {
            title: "Operational Excellence",
            content: "Efficient operations require well-defined processes, quality control systems, and performance metrics that drive continuous improvement.",
            keyTakeaway: "Systems and processes enable scaling beyond personal capacity."
          },
          {
            title: "Team Development",
            content: "Building effective teams involves recruiting the right people, creating clear roles, fostering collaboration, and providing growth opportunities.",
            keyTakeaway: "Great teams multiply individual capabilities and create sustainable competitive advantages."
          }
        ],
        exercises: [
          {
            title: "Process Documentation",
            description: "Document key business processes and create standard operating procedures",
            type: "documentation",
            difficulty: "Medium"
          },
          {
            title: "Hiring Plan Development",
            description: "Create a strategic hiring plan for your first 5 team members",
            type: "planning",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Marketing and Growth Strategy",
        objectives: [
          "Develop effective marketing strategies",
          "Learn customer acquisition techniques",
          "Understand growth metrics and optimization"
        ],
        concepts: [
          {
            title: "Customer Acquisition",
            content: "Sustainable growth requires understanding customer acquisition costs, lifetime value, and building scalable acquisition channels.",
            keyTakeaway: "Focus on channels where customer acquisition cost is significantly less than lifetime value."
          },
          {
            title: "Growth Optimization",
            content: "Data-driven growth involves measuring key metrics, running experiments, and optimizing the customer journey for better conversion and retention.",
            keyTakeaway: "Consistent small improvements compound into significant growth advantages."
          }
        ],
        exercises: [
          {
            title: "Marketing Channel Analysis",
            description: "Evaluate and rank potential marketing channels for your business",
            type: "analysis",
            difficulty: "Medium"
          },
          {
            title: "Growth Experiment Design",
            description: "Design and plan a series of growth experiments to test marketing hypotheses",
            type: "experimentation",
            difficulty: "Hard"
          }
        ]
      }
    ]
  }

  getMarketingModules(subject) {
    return [
      {
        title: "Digital Marketing Fundamentals",
        objectives: [
          "Understand the digital marketing landscape",
          "Learn about different digital channels",
          "Develop a digital marketing mindset"
        ],
        concepts: [
          {
            title: "Digital Ecosystem Overview",
            content: "Digital marketing encompasses search engines, social media, email, content marketing, and paid advertising - each with unique strengths and audience behaviors.",
            keyTakeaway: "Success comes from choosing the right channels for your audience and objectives."
          },
          {
            title: "Customer Journey Mapping",
            content: "Understanding how customers discover, evaluate, and purchase helps optimize marketing efforts at each touchpoint for maximum impact.",
            keyTakeaway: "Meet customers where they are with the right message at the right time."
          }
        ],
        exercises: [
          {
            title: "Channel Assessment Matrix",
            description: "Evaluate which digital channels are most relevant for your target market",
            type: "analysis",
            difficulty: "Easy"
          },
          {
            title: "Customer Journey Mapping",
            description: "Map the complete customer journey from awareness to advocacy",
            type: "mapping",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Content Strategy and Creation",
        objectives: [
          "Develop effective content strategies",
          "Learn content creation best practices",
          "Understand content distribution channels"
        ],
        concepts: [
          {
            title: "Strategic Content Planning",
            content: "Effective content strategy aligns business goals with audience needs, creating valuable content that drives engagement and conversions.",
            keyTakeaway: "Quality content that solves real problems builds trust and authority."
          },
          {
            title: "Content Format Optimization",
            content: "Different content formats (blog posts, videos, infographics, podcasts) serve different purposes and audience preferences.",
            keyTakeaway: "Match content format to platform and audience consumption preferences."
          }
        ],
        exercises: [
          {
            title: "Content Calendar Creation",
            description: "Develop a 3-month content calendar with diverse content types",
            type: "planning",
            difficulty: "Medium"
          },
          {
            title: "Content Creation Project",
            description: "Create 5 pieces of content in different formats for your target audience",
            type: "creation",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Social Media Marketing",
        objectives: [
          "Master social media platform strategies",
          "Learn community building techniques",
          "Understand social media advertising"
        ],
        concepts: [
          {
            title: "Platform-Specific Strategies",
            content: "Each social platform has unique algorithms, user behaviors, and content formats that require tailored approaches for maximum effectiveness.",
            keyTakeaway: "Platform native content performs better than repurposed content."
          },
          {
            title: "Community Engagement",
            content: "Building engaged communities requires consistent value delivery, authentic interactions, and fostering user-generated content.",
            keyTakeaway: "Engagement is more valuable than follower count for business results."
          }
        ],
        exercises: [
          {
            title: "Platform Strategy Development",
            description: "Create detailed strategies for 3 social media platforms relevant to your business",
            type: "strategy",
            difficulty: "Medium"
          },
          {
            title: "Social Media Campaign",
            description: "Launch and manage a 30-day social media campaign",
            type: "campaign",
            difficulty: "Hard"
          }
        ]
      },
      {
        title: "Search Engine Optimization",
        objectives: [
          "Understand SEO fundamentals and best practices",
          "Learn keyword research and content optimization",
          "Master technical SEO basics"
        ],
        concepts: [
          {
            title: "SEO Strategy Framework",
            content: "Effective SEO combines keyword research, on-page optimization, technical improvements, and link building to improve search visibility.",
            keyTakeaway: "SEO is a long-term strategy that requires patience and consistent execution."
          },
          {
            title: "Content Optimization",
            content: "Optimizing content for search involves balancing user value with search engine requirements through strategic keyword usage and structure.",
            keyTakeaway: "Write for humans first, optimize for search engines second."
          }
        ],
        exercises: [
          {
            title: "Keyword Research Project",
            description: "Conduct comprehensive keyword research for your business niche",
            type: "research",
            difficulty: "Medium"
          },
          {
            title: "Website Optimization Audit",
            description: "Perform a complete SEO audit and create an optimization plan",
            type: "audit",
            difficulty: "Hard"
          }
        ]
      },
      {
        title: "Analytics and Performance Optimization",
        objectives: [
          "Set up comprehensive analytics tracking",
          "Learn to interpret marketing data",
          "Develop optimization strategies"
        ],
        concepts: [
          {
            title: "Data-Driven Decision Making",
            content: "Marketing analytics provide insights into campaign performance, customer behavior, and ROI to guide strategic decisions.",
            keyTakeaway: "What gets measured gets improved - track the metrics that matter."
          },
          {
            title: "Conversion Optimization",
            content: "Systematic testing and optimization of marketing funnels improves conversion rates and marketing efficiency over time.",
            keyTakeaway: "Small improvements in conversion rates compound into significant business impact."
          }
        ],
        exercises: [
          {
            title: "Analytics Setup Project",
            description: "Set up comprehensive tracking for all marketing channels and touchpoints",
            type: "technical",
            difficulty: "Medium"
          },
          {
            title: "A/B Testing Campaign",
            description: "Design and execute A/B tests to optimize key conversion points",
            type: "testing",
            difficulty: "Hard"
          }
        ]
      }
    ]
  }

  getCreativeModules(subject) {
    if (subject.includes("piano") || subject.includes("music")) {
      return [
        {
          title: "Piano Basics and Posture",
          objectives: [
            "Learn proper piano posture and hand positioning",
            "Understand keyboard layout and note names",
            "Develop basic finger independence"
          ],
          concepts: [
            {
              title: "Proper Posture Foundation",
              content: "Good posture involves sitting at the correct height, maintaining straight back, relaxed shoulders, and curved fingers for optimal technique.",
              keyTakeaway: "Proper posture prevents injury and enables advanced technique development."
            },
            {
              title: "Keyboard Geography",
              content: "Understanding the keyboard layout, note names, and octave patterns provides the foundation for all piano playing.",
              keyTakeaway: "Memorize the keyboard layout thoroughly - it's your musical map."
            }
          ],
          exercises: [
            {
              title: "Posture Practice Sessions",
              description: "Practice maintaining proper posture for 10-minute sessions",
              type: "technique",
              difficulty: "Easy"
            },
            {
              title: "Note Identification Drills",
              description: "Quickly identify and play random notes across the keyboard",
              type: "drill",
              difficulty: "Easy"
            }
          ]
        },
        {
          title: "Music Theory Foundations",
          objectives: [
            "Learn basic music notation and rhythm",
            "Understand scales and key signatures",
            "Master interval recognition"
          ],
          concepts: [
            {
              title: "Notation Fundamentals",
              content: "Reading music notation involves understanding staff, clefs, note values, rests, and timing signatures for accurate interpretation.",
              keyTakeaway: "Music notation is a language - practice reading it daily for fluency."
            },
            {
              title: "Scale Structures",
              content: "Major and minor scales form the foundation of Western music, providing patterns that create melodies and harmonies.",
              keyTakeaway: "Scales are not just exercises - they're the vocabulary of music."
            }
          ],
          exercises: [
            {
              title: "Scale Practice Routine",
              description: "Practice major scales in all 12 keys with proper fingering",
              type: "technique",
              difficulty: "Medium"
            },
            {
              title: "Sight Reading Exercises",
              description: "Read and play simple melodies without prior practice",
              type: "reading",
              difficulty: "Medium"
            }
          ]
        },
        {
          title: "Technique Development",
          objectives: [
            "Develop finger strength and dexterity",
            "Learn proper pedaling techniques",
            "Master basic articulation styles"
          ],
          concepts: [
            {
              title: "Technical Exercises",
              content: "Scales, arpeggios, and etudes develop the finger strength, coordination, and muscle memory needed for advanced repertoire.",
              keyTakeaway: "Daily technical practice builds the foundation for musical expression."
            },
            {
              title: "Touch and Dynamics",
              content: "Controlling touch and dynamics involves understanding how finger weight, arm weight, and wrist motion affect sound production.",
              keyTakeaway: "Beautiful tone comes from relaxed, controlled movement."
            }
          ],
          exercises: [
            {
              title: "Hanon Exercises",
              description: "Practice finger independence exercises for 20 minutes daily",
              type: "technique",
              difficulty: "Medium"
            },
            {
              title: "Dynamic Control Practice",
              description: "Play scales with various dynamic levels and articulations",
              type: "expression",
              difficulty: "Hard"
            }
          ]
        },
        {
          title: "Learning Your First Pieces",
          objectives: [
            "Learn to interpret simple classical pieces",
            "Develop practice strategies for new music",
            "Understand phrasing and musical expression"
          ],
          concepts: [
            {
              title: "Effective Practice Methods",
              content: "Efficient practice involves slow practice, hands separate work, mental practice, and systematic problem-solving approaches.",
              keyTakeaway: "Quality practice is more important than quantity - focus and intention matter most."
            },
            {
              title: "Musical Interpretation",
              content: "Musical interpretation involves understanding composer intentions, historical context, and developing personal artistic expression.",
              keyTakeaway: "Technical accuracy serves musical expression - always know what you want to communicate."
            }
          ],
          exercises: [
            {
              title: "Beginner Repertoire Study",
              description: "Learn and polish 3 pieces from different musical periods",
              type: "repertoire",
              difficulty: "Medium"
            },
            {
              title: "Practice Log Project",
              description: "Keep detailed practice logs tracking progress and challenges",
              type: "documentation",
              difficulty: "Easy"
            }
          ]
        },
        {
          title: "Performance and Continued Growth",
          objectives: [
            "Overcome performance anxiety",
            "Develop practice routines for continued improvement",
            "Understand paths for advanced study"
          ],
          concepts: [
            {
              title: "Performance Preparation",
              content: "Successful performance requires thorough preparation, mental rehearsal, and developing confidence through repeated practice under pressure.",
              keyTakeaway: "Performance anxiety decreases with thorough preparation and experience."
            },
            {
              title: "Lifelong Learning Path",
              content: "Piano study is lifelong - understanding how to set goals, find resources, and maintain motivation ensures continued growth.",
              keyTakeaway: "The goal is not perfection but continuous improvement and musical joy."
            }
          ],
          exercises: [
            {
              title: "Mock Performance Sessions",
              description: "Practice performing pieces for friends or family members",
              type: "performance",
              difficulty: "Medium"
            },
            {
              title: "Long-term Goal Setting",
              description: "Create a 1-year practice plan with specific milestones",
              type: "planning",
              difficulty: "Easy"
            }
          ]
        }
      ]
    }

    // Photography modules
    return [
      {
        title: "Camera Basics and Controls",
        objectives: [
          "Understand camera types and basic controls",
          "Learn the exposure triangle fundamentals",
          "Master camera handling and stability"
        ],
        concepts: [
          {
            title: "Exposure Triangle",
            content: "Aperture, shutter speed, and ISO work together to control exposure. Understanding their relationship is crucial for creative control.",
            keyTakeaway: "Master the exposure triangle to move beyond automatic modes."
          },
          {
            title: "Camera Stability",
            content: "Sharp images require proper camera handling, breathing techniques, and understanding when to use tripods or other support systems.",
            keyTakeaway: "Camera shake is the enemy of sharp photos - learn to minimize it."
          }
        ],
        exercises: [
          {
            title: "Exposure Mode Practice",
            description: "Shoot the same scene in different exposure modes to understand their effects",
            type: "technique",
            difficulty: "Easy"
          },
          {
            title: "Stability Challenge",
            description: "Practice handheld shooting techniques at various shutter speeds",
            type: "skill",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Composition Techniques",
        objectives: [
          "Master the rule of thirds and other compositional guidelines",
          "Understand leading lines and visual weight",
          "Learn to create depth and dimension"
        ],
        concepts: [
          {
            title: "Compositional Rules and Breaking Them",
            content: "Compositional guidelines like rule of thirds, leading lines, and symmetry provide structure, but knowing when to break them creates impact.",
            keyTakeaway: "Learn the rules first, then break them intentionally for artistic effect."
          },
          {
            title: "Visual Elements",
            content: "Color, texture, pattern, and contrast create visual interest and guide the viewer's eye through the composition.",
            keyTakeaway: "Every element in the frame should contribute to the overall message."
          }
        ],
        exercises: [
          {
            title: "Composition Studies",
            description: "Create 20 images focusing on different compositional techniques",
            type: "creation",
            difficulty: "Medium"
          },
          {
            title: "Rule Breaking Project",
            description: "Intentionally break compositional rules to create compelling images",
            type: "creative",
            difficulty: "Hard"
          }
        ]
      },
      {
        title: "Light and Exposure",
        objectives: [
          "Understand natural and artificial lighting",
          "Learn to read and control light quality",
          "Master exposure compensation and metering"
        ],
        concepts: [
          {
            title: "Quality of Light",
            content: "Light quality - hard vs soft, directional vs diffused - dramatically affects mood and visual impact of photographs.",
            keyTakeaway: "Photography is painting with light - understand its character and direction."
          },
          {
            title: "Golden Hour and Beyond",
            content: "Different times of day offer unique lighting opportunities, from golden hour warmth to blue hour mood to harsh midday drama.",
            keyTakeaway: "Great photographers work with available light rather than fighting against it."
          }
        ],
        exercises: [
          {
            title: "Light Study Series",
            description: "Photograph the same subject at different times of day to see light changes",
            type: "observation",
            difficulty: "Medium"
          },
          {
            title: "Artificial Light Experiments",
            description: "Practice using flash, LED panels, and reflectors to modify light",
            type: "technical",
            difficulty: "Hard"
          }
        ]
      },
      {
        title: "Post-Processing Fundamentals",
        objectives: [
          "Learn basic photo editing workflows",
          "Understand RAW vs JPEG processing",
          "Master essential editing techniques"
        ],
        concepts: [
          {
            title: "Digital Workflow",
            content: "Efficient post-processing involves organizing, culling, basic corrections, creative editing, and exporting for intended use.",
            keyTakeaway: "A good workflow saves time and ensures consistent quality across your work."
          },
          {
            title: "Enhancement vs Over-processing",
            content: "Post-processing should enhance the original vision rather than rescue poor technique. Subtle adjustments often have the most impact.",
            keyTakeaway: "The best processing enhances without being obvious."
          }
        ],
        exercises: [
          {
            title: "Editing Workflow Setup",
            description: "Establish a personal editing workflow and organize your photo library",
            type: "organization",
            difficulty: "Medium"
          },
          {
            title: "Before/After Comparison",
            description: "Edit 10 images and create before/after comparisons to understand your style",
            type: "editing",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Building Your Photography Practice",
        objectives: [
          "Develop personal style and vision",
          "Learn to critique and improve your work",
          "Understand sharing and portfolio development"
        ],
        concepts: [
          {
            title: "Developing Personal Vision",
            content: "Personal style emerges through consistent practice, studying other photographers, and understanding what draws you to certain subjects or treatments.",
            keyTakeaway: "Your unique perspective is your greatest asset as a photographer."
          },
          {
            title: "Critical Analysis",
            content: "Improving requires honest self-critique, seeking feedback, and analyzing both successful and unsuccessful images to understand what works.",
            keyTakeaway: "Every photo teaches something - learn from both successes and failures."
          }
        ],
        exercises: [
          {
            title: "Style Development Project",
            description: "Create a cohesive series of 15 images that reflect your emerging style",
            type: "portfolio",
            difficulty: "Hard"
          },
          {
            title: "Critique Practice",
            description: "Analyze and critique 50 of your own images to identify patterns and improvements",
            type: "analysis",
            difficulty: "Medium"
          }
        ]
      }
    ]
  }

  getTechnicalModules(subject) {
    return [
      {
        title: "Programming Fundamentals",
        objectives: [
          "Understand core programming concepts",
          "Learn problem-solving approaches",
          "Master basic syntax and structures"
        ],
        concepts: [
          {
            title: "Algorithmic Thinking",
            content: "Breaking complex problems into smaller, manageable steps is the foundation of programming. This involves pattern recognition and logical sequencing.",
            keyTakeaway: "Programming is problem-solving first, syntax second."
          },
          {
            title: "Data Types and Structures",
            content: "Understanding how data is stored and manipulated through variables, arrays, objects, and functions forms the building blocks of all programs.",
            keyTakeaway: "Choose the right data structure for efficient problem solving."
          }
        ],
        exercises: [
          {
            title: "Algorithm Design Practice",
            description: "Write pseudocode for common programming problems before coding",
            type: "planning",
            difficulty: "Easy"
          },
          {
            title: "Basic Program Creation",
            description: "Build simple programs that demonstrate core concepts",
            type: "coding",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Development Environment Setup",
        objectives: [
          "Set up professional development tools",
          "Learn version control with Git",
          "Understand debugging techniques"
        ],
        concepts: [
          {
            title: "Tool Proficiency",
            content: "Professional development requires mastering code editors, debuggers, package managers, and terminal commands for efficient workflow.",
            keyTakeaway: "Invest time in learning tools - they multiply your productivity."
          },
          {
            title: "Version Control Systems",
            content: "Git enables tracking changes, collaborating with others, and managing different versions of code safely and efficiently.",
            keyTakeaway: "Version control is essential for any serious development work."
          }
        ],
        exercises: [
          {
            title: "Environment Configuration",
            description: "Set up a complete development environment with necessary tools",
            type: "setup",
            difficulty: "Medium"
          },
          {
            title: "Git Workflow Practice",
            description: "Practice common Git operations and workflows",
            type: "workflow",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Building Your First Application",
        objectives: [
          "Design and plan application architecture",
          "Implement core functionality",
          "Test and debug systematically"
        ],
        concepts: [
          {
            title: "Application Architecture",
            content: "Well-structured applications separate concerns, use modular design, and follow established patterns for maintainability.",
            keyTakeaway: "Good architecture makes applications easier to understand, modify, and extend."
          },
          {
            title: "Testing and Quality Assurance",
            content: "Systematic testing involves unit tests, integration tests, and user acceptance testing to ensure reliability and correctness.",
            keyTakeaway: "Testing is not optional - it's essential for professional software development."
          }
        ],
        exercises: [
          {
            title: "Project Planning",
            description: "Design architecture and create development plan for a small application",
            type: "planning",
            difficulty: "Medium"
          },
          {
            title: "Application Development",
            description: "Build a complete application from design to deployment",
            type: "project",
            difficulty: "Hard"
          }
        ]
      },
      {
        title: "Best Practices and Code Quality",
        objectives: [
          "Learn clean code principles",
          "Understand refactoring techniques",
          "Master code review processes"
        ],
        concepts: [
          {
            title: "Clean Code Principles",
            content: "Clean code is readable, maintainable, and expressive. It uses meaningful names, small functions, and clear structure.",
            keyTakeaway: "Code is read more often than written - optimize for readability."
          },
          {
            title: "Continuous Improvement",
            content: "Refactoring improves code structure without changing functionality. Regular refactoring prevents technical debt accumulation.",
            keyTakeaway: "Regular small improvements prevent major rewrites."
          }
        ],
        exercises: [
          {
            title: "Code Review Practice",
            description: "Review and improve existing code following best practices",
            type: "review",
            difficulty: "Medium"
          },
          {
            title: "Refactoring Project",
            description: "Refactor a messy codebase to follow clean code principles",
            type: "refactoring",
            difficulty: "Hard"
          }
        ]
      },
      {
        title: "Professional Development Path",
        objectives: [
          "Understand career progression in technology",
          "Learn continuous learning strategies",
          "Build professional networks and portfolios"
        ],
        concepts: [
          {
            title: "Continuous Learning",
            content: "Technology evolves rapidly. Successful developers embrace lifelong learning through courses, conferences, and hands-on experimentation.",
            keyTakeaway: "The ability to learn quickly is more valuable than knowing specific technologies."
          },
          {
            title: "Professional Growth",
            content: "Career growth requires technical skills, communication abilities, and understanding of business needs to create valuable solutions.",
            keyTakeaway: "Technical skills open doors, but problem-solving and communication skills advance careers."
          }
        ],
        exercises: [
          {
            title: "Portfolio Development",
            description: "Create a professional portfolio showcasing your best work",
            type: "portfolio",
            difficulty: "Medium"
          },
          {
            title: "Learning Plan Creation",
            description: "Develop a structured plan for continued skill development",
            type: "planning",
            difficulty: "Easy"
          }
        ]
      }
    ]
  }

  getGenericModules(subject) {
    return [
      {
        title: `Introduction to ${this.capitalize(subject)}`,
        objectives: [
          `Understand the fundamentals of ${subject}`,
          "Learn key terminology and concepts",
          "Identify essential skills and knowledge areas"
        ],
        concepts: [
          {
            title: "Foundational Principles",
            content: `The core principles of ${subject} provide the framework for understanding more advanced concepts and practical applications.`,
            keyTakeaway: `Strong fundamentals in ${subject} are essential for long-term success.`
          },
          {
            title: "Key Terminology",
            content: `Mastering the vocabulary and terminology of ${subject} enables clear communication and deeper understanding of the field.`,
            keyTakeaway: "Professional terminology is the language of expertise."
          }
        ],
        exercises: [
          {
            title: "Concept Mapping",
            description: `Create a visual map of key concepts and their relationships in ${subject}`,
            type: "analysis",
            difficulty: "Easy"
          },
          {
            title: "Terminology Quiz",
            description: "Test your understanding of essential terms and definitions",
            type: "assessment",
            difficulty: "Easy"
          }
        ]
      },
      {
        title: "Essential Skills Development",
        objectives: [
          "Identify and practice core skills",
          "Develop practical competencies",
          "Build confidence through hands-on experience"
        ],
        concepts: [
          {
            title: "Skill Acquisition Process",
            content: "Effective skill development follows a progression from conscious incompetence through conscious competence to unconscious competence.",
            keyTakeaway: "Deliberate practice with feedback accelerates skill development."
          },
          {
            title: "Progressive Complexity",
            content: "Skills develop best through progressively challenging exercises that build on previous learning while introducing new elements.",
            keyTakeaway: "Gradual progression prevents overwhelm while maintaining growth."
          }
        ],
        exercises: [
          {
            title: "Skill Assessment",
            description: "Evaluate your current skill level and identify areas for improvement",
            type: "assessment",
            difficulty: "Medium"
          },
          {
            title: "Progressive Practice",
            description: "Complete exercises of increasing difficulty to build competency",
            type: "practice",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Practical Application",
        objectives: [
          "Apply knowledge to real-world scenarios",
          "Solve practical problems using learned concepts",
          "Develop problem-solving strategies"
        ],
        concepts: [
          {
            title: "Theory to Practice",
            content: "Bridging the gap between theoretical knowledge and practical application requires understanding context, constraints, and real-world variables.",
            keyTakeaway: "Practical experience transforms knowledge into wisdom."
          },
          {
            title: "Problem-Solving Framework",
            content: "Systematic problem-solving involves defining the problem, generating solutions, evaluating options, and implementing the best approach.",
            keyTakeaway: "Good process leads to better outcomes than relying on intuition alone."
          }
        ],
        exercises: [
          {
            title: "Case Study Analysis",
            description: `Analyze real-world scenarios and propose solutions using ${subject} principles`,
            type: "analysis",
            difficulty: "Medium"
          },
          {
            title: "Practical Project",
            description: "Complete a hands-on project that demonstrates your understanding",
            type: "project",
            difficulty: "Hard"
          }
        ]
      },
      {
        title: "Advanced Techniques",
        objectives: [
          "Explore sophisticated methods and approaches",
          "Understand professional standards and practices",
          "Develop expertise-level competencies"
        ],
        concepts: [
          {
            title: "Professional Standards",
            content: "Professional practice requires understanding industry standards, best practices, and quality benchmarks that distinguish amateur from expert work.",
            keyTakeaway: "Professional standards exist to ensure quality, safety, and effectiveness."
          },
          {
            title: "Advanced Methodologies",
            content: "Sophisticated techniques build on fundamentals to achieve superior results, efficiency, or capabilities not possible with basic methods.",
            keyTakeaway: "Advanced techniques are tools - use them when they serve your objectives."
          }
        ],
        exercises: [
          {
            title: "Advanced Technique Practice",
            description: "Master sophisticated techniques through focused practice sessions",
            type: "technique",
            difficulty: "Hard"
          },
          {
            title: "Quality Assessment",
            description: "Evaluate work against professional standards and identify improvements",
            type: "evaluation",
            difficulty: "Medium"
          }
        ]
      },
      {
        title: "Mastery and Continued Growth",
        objectives: [
          "Develop strategies for continuous improvement",
          "Build expertise and reputation",
          "Create value for others through your knowledge"
        ],
        concepts: [
          {
            title: "Mastery Mindset",
            content: "True mastery is not a destination but a journey of continuous learning, refinement, and growth throughout your career.",
            keyTakeaway: "Mastery requires dedication to lifelong learning and improvement."
          },
          {
            title: "Knowledge Sharing",
            content: "Sharing knowledge through teaching, mentoring, or content creation reinforces your own learning while helping others grow.",
            keyTakeaway: "Teaching others is one of the best ways to deepen your own understanding."
          }
        ],
        exercises: [
          {
            title: "Mastery Plan",
            description: "Create a long-term plan for continued growth and skill development",
            type: "planning",
            difficulty: "Medium"
          },
          {
            title: "Knowledge Sharing Project",
            description: "Create content to teach others what you've learned",
            type: "teaching",
            difficulty: "Medium"
          }
        ]
      }
    ]
  }
}

export default new CourseService()
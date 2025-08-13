import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import CourseHeader from "@/components/molecules/CourseHeader"
import ModuleCard from "@/components/molecules/ModuleCard"
import courseService from "@/services/api/courseService"

const CourseViewer = ({ course, onCourseUpdate }) => {
  const [currentCourse, setCurrentCourse] = useState(course)

  useEffect(() => {
    setCurrentCourse(course)
  }, [course])

  const handleToggleModuleComplete = async (moduleId) => {
    try {
      const updatedModules = currentCourse.modules.map(module => 
        module.id === moduleId 
          ? { ...module, completed: !module.completed }
          : module
      )
      
      const updatedCourse = { 
        ...currentCourse, 
        modules: updatedModules,
        completionStatus: updatedModules.filter(m => m.completed).length
      }
      
      await courseService.update(currentCourse.id, updatedCourse)
      setCurrentCourse(updatedCourse)
      onCourseUpdate(updatedCourse)
      
      const moduleNumber = updatedModules.find(m => m.id === moduleId)?.number
      const isCompleted = updatedModules.find(m => m.id === moduleId)?.completed
      
      toast.success(
        `Module ${moduleNumber} ${isCompleted ? "completed" : "unchecked"}!`,
        { 
          icon: isCompleted ? "✅" : "⏸️",
          autoClose: 2000 
        }
      )
    } catch (error) {
      toast.error("Failed to update module progress")
    }
  }

  const handleCopyCourse = async () => {
    try {
      const courseText = generateCourseText(currentCourse)
      await navigator.clipboard.writeText(courseText)
      toast.success("Course copied to clipboard!", { autoClose: 2000 })
    } catch (error) {
      toast.error("Failed to copy course")
    }
  }

  const handlePrintCourse = () => {
    const courseText = generateCourseText(currentCourse)
    const printWindow = window.open("", "_blank")
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${currentCourse.title}</title>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              line-height: 1.6; 
              color: #333; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 20px; 
            }
            h1 { color: #5B4FE5; border-bottom: 2px solid #5B4FE5; padding-bottom: 10px; }
            h2 { color: #8B7FF0; margin-top: 30px; }
            h3 { color: #5B4FE5; margin-top: 25px; }
            .module { margin-bottom: 30px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; }
            .objectives, .concepts, .exercises { margin: 15px 0; }
            ul { padding-left: 20px; }
            .concept { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 6px; }
            .exercise { background: #f0f4ff; padding: 15px; margin: 10px 0; border-radius: 6px; }
            .key-takeaway { background: #e3f2fd; padding: 10px; margin: 10px 0; border-left: 4px solid #2196f3; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <h1>${currentCourse.title}</h1>
          <p><strong>Topic:</strong> ${currentCourse.topic}</p>
          <p><strong>Description:</strong> ${currentCourse.description}</p>
          <p><strong>Total Modules:</strong> ${currentCourse.modules.length}</p>
          <p><strong>Estimated Time:</strong> ${currentCourse.modules.reduce((total, m) => total + m.timeEstimate, 0)} minutes</p>
          <hr>
          ${currentCourse.modules.map(module => `
            <div class="module">
              <h2>Module ${module.number}: ${module.title}</h2>
              <p><strong>Time Estimate:</strong> ${module.timeEstimate} minutes</p>
              
              <div class="objectives">
                <h3>Learning Objectives:</h3>
                <ul>
                  ${module.objectives.map(obj => `<li>${obj}</li>`).join("")}
                </ul>
              </div>
              
              <div class="concepts">
                <h3>Key Concepts:</h3>
                ${module.concepts.map(concept => `
                  <div class="concept">
                    <h4>${concept.title}</h4>
                    <p>${concept.content}</p>
                    <div class="key-takeaway">
                      <strong>Key Takeaway:</strong> ${concept.keyTakeaway}
                    </div>
                  </div>
                `).join("")}
              </div>
              
              <div class="exercises">
                <h3>Practical Exercises:</h3>
                ${module.exercises.map(exercise => `
                  <div class="exercise">
                    <h4>${exercise.title} (${exercise.difficulty})</h4>
                    <p>${exercise.description}</p>
                    <p><strong>Type:</strong> ${exercise.type}</p>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </body>
      </html>
    `)
    
    printWindow.document.close()
    printWindow.print()
  }

  const generateCourseText = (course) => {
    return `${course.title}

Topic: ${course.topic}
Description: ${course.description}
Total Modules: ${course.modules.length}
Estimated Time: ${course.modules.reduce((total, m) => total + m.timeEstimate, 0)} minutes

${course.modules.map(module => `
MODULE ${module.number}: ${module.title}
Time Estimate: ${module.timeEstimate} minutes

Learning Objectives:
${module.objectives.map(obj => `• ${obj}`).join("\n")}

Key Concepts:
${module.concepts.map(concept => `
${concept.title}
${concept.content}
Key Takeaway: ${concept.keyTakeaway}
`).join("\n")}

Practical Exercises:
${module.exercises.map(exercise => `
${exercise.title} (${exercise.difficulty})
${exercise.description}
Type: ${exercise.type}
`).join("\n")}
`).join("\n" + "=".repeat(50) + "\n")}`
  }

  return (
    <div className="space-y-6">
      <CourseHeader
        course={currentCourse}
        onCopy={handleCopyCourse}
        onPrint={handlePrintCourse}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {currentCourse.modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <ModuleCard
              module={module}
              onToggleComplete={handleToggleModuleComplete}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Completion Celebration */}
      {currentCourse.modules.every(m => m.completed) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              🎉
            </motion.div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Congratulations!
          </h3>
          <p className="text-gray-600 mb-4">
            You've completed all modules in "{currentCourse.title}"
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrintCourse}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              🏆 Print Certificate
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default CourseViewer
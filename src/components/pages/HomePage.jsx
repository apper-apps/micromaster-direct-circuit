import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import TopicInput from "@/components/molecules/TopicInput"
import CourseViewer from "@/components/organisms/CourseViewer"
import CourseHistory from "@/components/organisms/CourseHistory"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import courseService from "@/services/api/courseService"

const HomePage = () => {
  const [currentCourse, setCurrentCourse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [courses, setCourses] = useState([])

  const handleGenerateCourse = async (topic) => {
    setIsLoading(true)
    setError(null)
    setCurrentCourse(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate generation time
      const newCourse = await courseService.create({ topic })
      setCurrentCourse(newCourse)
      toast.success("Course generated successfully!", { 
        icon: "🎓",
        autoClose: 3000 
      })
    } catch (err) {
      setError(err.message || "Failed to generate course")
      toast.error("Failed to generate course")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCourseSelect = (course) => {
    setCurrentCourse(course)
    setError(null)
  }

  const handleCourseUpdate = (updatedCourse) => {
    setCurrentCourse(updatedCourse)
  }

  const handleCoursesChange = (updatedCourses) => {
    setCourses(updatedCourses)
  }

  const handleRetry = () => {
    setError(null)
    setCurrentCourse(null)
  }

  const handleSuggestionSelect = (suggestion) => {
    handleGenerateCourse(suggestion)
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Error message={error} onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {!currentCourse ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="min-h-[60vh] flex items-center justify-center"
                >
                  <div className="w-full max-w-4xl">
                    <TopicInput 
                      onGenerate={handleGenerateCourse} 
                      isLoading={isLoading}
                    />
                    {courses.length === 0 && (
                      <div className="mt-8">
                        <Empty 
                          message="Welcome to MicroMaster! Enter any topic above and we'll create a comprehensive 5-module course just for you."
                          actionText="Try a suggestion"
                          onAction={handleSuggestionSelect}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="course"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Back to Input Button */}
                  <div className="mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentCourse(null)}
                      className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Generate New Course
                    </motion.button>
                  </div>
                  
                  <CourseViewer
                    course={currentCourse}
                    onCourseUpdate={handleCourseUpdate}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Course History Sidebar */}
          <CourseHistory
            onCourseSelect={handleCourseSelect}
            activeCourseId={currentCourse?.id}
            onCoursesChange={handleCoursesChange}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
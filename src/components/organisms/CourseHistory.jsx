import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import CourseHistoryItem from "@/components/molecules/CourseHistoryItem"
import courseService from "@/services/api/courseService"

const CourseHistory = ({ onCourseSelect, activeCourseId, onCoursesChange }) => {
  const [courses, setCourses] = useState([])
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const allCourses = await courseService.getAll()
      const sortedCourses = allCourses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setCourses(sortedCourses)
      onCoursesChange?.(sortedCourses)
    } catch (error) {
      console.error("Failed to load courses:", error)
    }
  }

  const handleDeleteCourse = async (courseId) => {
    if (!confirm("Are you sure you want to delete this course?")) return

    try {
      await courseService.delete(courseId)
      const updatedCourses = courses.filter(c => c.id !== courseId)
      setCourses(updatedCourses)
      onCoursesChange?.(updatedCourses)
      
      toast.success("Course deleted successfully", { autoClose: 2000 })
      
      // If the deleted course was active, clear selection
      if (activeCourseId === courseId) {
        onCourseSelect(null)
      }
    } catch (error) {
      toast.error("Failed to delete course")
    }
  }

  const handleCourseSelect = (course) => {
    onCourseSelect(course)
  }

  if (courses.length === 0) {
    return null
  }

  return (
    <div className="w-full lg:w-80 xl:w-96">
      <Card className="sticky top-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ApperIcon name="History" className="w-5 h-5 text-primary-500" />
              Course History
            </CardTitle>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ApperIcon 
                name={isCollapsed ? "ChevronDown" : "ChevronUp"} 
                className="w-4 h-4" 
              />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {courses.length} saved course{courses.length !== 1 ? "s" : ""}
          </p>
        </CardHeader>

        <AnimatePresence>
          {(!isCollapsed || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <CardContent>
                <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                  {courses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CourseHistoryItem
                        course={course}
                        onSelect={handleCourseSelect}
                        onDelete={handleDeleteCourse}
                        isActive={activeCourseId === course.id}
                      />
                    </motion.div>
                  ))}
                </div>

                {courses.length >= 10 && (
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-start gap-2">
                      <ApperIcon name="Info" className="w-4 h-4 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Storage Limit</p>
                        <p className="text-xs text-amber-700">
                          You've reached the 10 course limit. Creating new courses will replace the oldest ones.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}

export default CourseHistory
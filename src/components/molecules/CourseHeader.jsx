import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import ProgressRing from "@/components/atoms/ProgressRing"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"

const CourseHeader = ({ course, onExport, onCopy, onPrint }) => {
  const completedModules = course.modules.filter(m => m.completed).length
  const totalModules = course.modules.length
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8 mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <ApperIcon name="GraduationCap" className="w-6 h-6 text-white" />
            </div>
            <div>
              <Badge variant="primary" className="mb-2">
                Micro Course
              </Badge>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {course.title}
              </h1>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {course.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <ApperIcon name="BookOpen" className="w-4 h-4" />
              <span>{totalModules} Modules</span>
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Clock" className="w-4 h-4" />
              <span>{course.modules.reduce((total, m) => total + m.timeEstimate, 0)} min total</span>
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Calendar" className="w-4 h-4" />
              <span>Created {new Date(course.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Progress Ring */}
          <div className="text-center">
            <ProgressRing progress={progressPercentage} size={80} strokeWidth={8}>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-xs text-gray-500">
                  Complete
                </div>
              </div>
            </ProgressRing>
            <div className="mt-2 text-sm text-gray-600">
              {completedModules} of {totalModules} modules
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCopy}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Copy" className="w-4 h-4" />
              Copy Course
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onPrint}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Printer" className="w-4 h-4" />
              Print Course
            </Button>
            
            {onExport && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onExport}
                className="flex items-center gap-2"
              >
                <ApperIcon name="Download" className="w-4 h-4" />
                Export
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Module Progress Indicators */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Course Progress</h3>
          <span className="text-sm text-gray-600">
            {completedModules}/{totalModules} completed
          </span>
        </div>
        
        <div className="grid grid-cols-5 gap-4">
          {course.modules.map((module, index) => (
            <div key={module.id} className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-all duration-200 ${
                module.completed
                  ? "bg-green-100 text-green-700 border-2 border-green-200"
                  : "bg-gray-100 text-gray-500 border-2 border-gray-200"
              }`}>
                {module.completed ? (
                  <ApperIcon name="Check" className="w-5 h-5" />
                ) : (
                  module.number
                )}
              </div>
              <div className="text-xs text-gray-600 truncate">
                Module {module.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default CourseHeader
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { Card } from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"

const CourseHistoryItem = ({ course, onSelect, onDelete, isActive }) => {
  const completedModules = course.modules.filter(m => m.completed).length
  const totalModules = course.modules.length
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className={`cursor-pointer transition-all duration-200 ${
        isActive 
          ? "ring-2 ring-primary-500 shadow-md bg-primary-50" 
          : "hover:shadow-md hover:bg-gray-50"
      }`}>
        <div className="p-4" onClick={() => onSelect(course)}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium text-sm truncate mb-1 ${
                isActive ? "text-primary-900" : "text-gray-900"
              }`}>
                {course.title}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {course.topic}
              </p>
              
              <div className="flex items-center justify-between">
                <Badge 
                  variant={progressPercentage === 100 ? "success" : "default"}
                  className="text-xs"
                >
                  {Math.round(progressPercentage)}% Complete
                </Badge>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(course.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <ApperIcon name="Trash2" className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <ApperIcon name="BookOpen" className="w-3 h-3" />
              {totalModules} modules
            </span>
            <span className="flex items-center gap-1">
              <ApperIcon name="Calendar" className="w-3 h-3" />
              {new Date(course.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  progressPercentage === 100 
                    ? "bg-green-500" 
                    : "bg-gradient-to-r from-primary-500 to-secondary-500"
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default CourseHistoryItem
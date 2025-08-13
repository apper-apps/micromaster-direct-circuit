import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { Card } from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"

const ModuleCard = ({ module, onToggleComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleComplete = () => {
    onToggleComplete(module.id)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card className="hover:shadow-md transition-all duration-200">
        <div
          className="p-6 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                module.completed 
                  ? "bg-gradient-to-r from-green-500 to-green-600" 
                  : "bg-gradient-primary"
              }`}>
                {module.completed ? (
                  <ApperIcon name="Check" className="w-5 h-5" />
                ) : (
                  module.number
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {module.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <ApperIcon name="Clock" className="w-3 h-3" />
                    {module.timeEstimate} min
                  </span>
                  <Badge variant={module.completed ? "success" : "default"}>
                    {module.completed ? "Completed" : "Pending"}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleToggleComplete()
                }}
                className={`${module.completed ? "text-green-600" : "text-gray-400"}`}
              >
                <ApperIcon 
                  name={module.completed ? "CheckCircle2" : "Circle"} 
                  className="w-5 h-5" 
                />
              </Button>
              
              <ApperIcon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"}
                className="w-5 h-5 text-gray-400 transition-transform duration-200"
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="pt-6 space-y-6">
                  {/* Learning Objectives */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <ApperIcon name="Target" className="w-4 h-4 text-primary-500" />
                      Learning Objectives
                    </h4>
                    <ul className="space-y-2">
                      {module.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <ApperIcon name="ArrowRight" className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Concepts */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <ApperIcon name="Brain" className="w-4 h-4 text-primary-500" />
                      Key Concepts
                    </h4>
                    <div className="space-y-4">
                      {module.concepts.map((concept, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">{concept.title}</h5>
                          <p className="text-sm text-gray-700 mb-3">{concept.content}</p>
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <ApperIcon name="Lightbulb" className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-xs font-medium text-blue-900 block mb-1">Key Takeaway</span>
                                <span className="text-sm text-blue-800">{concept.keyTakeaway}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Practical Exercises */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <ApperIcon name="Wrench" className="w-4 h-4 text-primary-500" />
                      Practical Exercises
                    </h4>
                    <div className="space-y-3">
                      {module.exercises.map((exercise, index) => (
                        <div key={index} className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-gray-900">{exercise.title}</h5>
                            <Badge 
                              variant={exercise.difficulty === "Easy" ? "success" : exercise.difficulty === "Medium" ? "warning" : "error"}
                            >
                              {exercise.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{exercise.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <ApperIcon name="Tag" className="w-3 h-3" />
                            <span className="capitalize">{exercise.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

export default ModuleCard
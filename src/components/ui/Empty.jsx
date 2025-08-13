import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ message, actionText, onAction }) => {
  const suggestions = [
    "How to become an independent watchmaker",
    "Digital marketing for beginners",
    "Learning piano fundamentals",
    "Starting a small business",
    "Photography composition techniques"
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-6"
    >
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 opacity-20">
          <ApperIcon name="BookOpen" className="w-12 h-12 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Ready to Start Learning?
        </h3>
        
        <p className="text-gray-600 mb-8">
          {message || "Enter any topic above and we'll create a comprehensive 5-module course just for you. From hobby skills to professional development - the possibilities are endless!"}
        </p>
        
        {onAction && (
          <Button onClick={onAction} className="mb-8">
            <ApperIcon name="Sparkles" className="w-4 h-4 mr-2" />
            {actionText || "Get Started"}
          </Button>
        )}
        
        <div className="text-left">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 text-center">
            Popular Course Ideas:
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => onAction && onAction(suggestion)}
              >
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <ApperIcon name="ArrowRight" className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-sm text-gray-700">{suggestion}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <ApperIcon name="Info" className="w-5 h-5 text-blue-500" />
            <div className="text-left">
              <p className="text-sm text-blue-700">
                Each course includes detailed modules, practical exercises, and actionable insights to help you master new skills quickly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Empty
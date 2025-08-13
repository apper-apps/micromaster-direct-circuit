import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto text-center p-8"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-500" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message || "We couldn't generate your course. Please try again or try a different topic."}
        </p>
        
        <div className="space-y-3">
          {onRetry && (
            <Button onClick={onRetry} className="w-full">
              <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            onClick={() => window.location.reload()}
            className="w-full"
          >
            <ApperIcon name="Home" className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-3">
            <ApperIcon name="Lightbulb" className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="text-left">
              <h4 className="text-sm font-medium text-blue-900 mb-1">Tips for better results:</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Be specific about what you want to learn</li>
                <li>• Try different wording or approach</li>
                <li>• Check your internet connection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Error
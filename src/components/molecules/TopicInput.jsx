import { useState } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"

const TopicInput = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState("")

  const suggestions = [
    "How to become an independent watchmaker",
    "Digital marketing for small businesses",
    "Learning to play piano from scratch",
    "Starting a food truck business",
    "Photography fundamentals and composition"
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (topic.trim()) {
      onGenerate(topic.trim())
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setTopic(suggestion)
    onGenerate(suggestion)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 mb-8"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Sparkles" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MicroMaster
          </h1>
          <p className="text-gray-600">
            Transform any topic into a comprehensive 5-module learning course
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to learn?
            </label>
            <Input
              id="topic"
              type="text"
              placeholder="e.g., How to become an independent watchmaker"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="text-base"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!topic.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating Course...
              </>
            ) : (
              <>
                <ApperIcon name="BookOpen" className="w-5 h-5 mr-2" />
                Generate Course
              </>
            )}
          </Button>
        </form>
      </motion.div>

      {/* Topic Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ApperIcon name="Lightbulb" className="w-4 h-4 text-primary-500" />
          Popular Course Ideas
        </h3>
        
        <div className="grid grid-cols-1 gap-2">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
              className="flex items-center gap-3 p-3 text-left bg-gray-50 hover:bg-primary-50 hover:border-primary-200 border border-transparent rounded-lg transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-8 h-8 bg-primary-100 group-hover:bg-primary-200 rounded-lg flex items-center justify-center transition-colors">
                <ApperIcon name="ArrowRight" className="w-4 h-4 text-primary-600" />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-primary-700">
                {suggestion}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default TopicInput
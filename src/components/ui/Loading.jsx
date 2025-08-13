import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className="animate-fadeIn">
      {/* Course Generation Loading */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl animate-pulse"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded-lg w-64 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded-lg w-40 animate-pulse"></div>
            </div>
          </div>
          
          <div className="h-4 bg-gray-100 rounded-lg w-full mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded-lg w-3/4 mb-6 animate-pulse"></div>
          
          <div className="grid grid-cols-5 gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-12 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Module Loading Skeletons */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
                </div>
                <div className="w-6 h-6 bg-gray-100 rounded animate-pulse"></div>
              </div>
              
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Loading Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="bg-white rounded-full px-6 py-3 shadow-lg border flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-gray-700">Generating your course...</span>
        </div>
      </motion.div>
    </div>
  )
}

export default Loading
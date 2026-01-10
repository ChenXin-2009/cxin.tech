export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          © {currentYear} My Portfolio. All rights reserved.
        </p>
        <div className="flex justify-center gap-6">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
            Twitter
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
            GitHub
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

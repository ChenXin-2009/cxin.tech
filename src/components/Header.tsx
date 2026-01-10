export default function Header() {
  return (
    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          Portfolio
        </a>
        <ul className="flex gap-6">
          <li>
            <a href="/" className="hover:text-blue-500 transition">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-500 transition">
              About
            </a>
          </li>
          <li>
            <a href="/blog" className="hover:text-blue-500 transition">
              Blog
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

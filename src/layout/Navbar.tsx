import React, { useState } from 'react'
import Logo from '../assets/logo.svg?react'
import { FaYoutube } from 'react-icons/fa6'
import { HiSun, HiMoon } from 'react-icons/hi2'

export const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Initialize state based on localStorage
    const storedTheme = localStorage.getItem('theme')
    return storedTheme ? storedTheme === 'dark' : false
  })

  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode
      // Save the new theme preference to localStorage
      localStorage.setItem('theme', newMode ? 'dark' : 'light')
      // Apply the new theme immediately
      applyTheme(newMode)
      return newMode
    })
  }

  // Apply the initial theme when the component mounts
  applyTheme(isDarkMode)

  return (
    <nav className="bg-opacity-50 border-gray-200 navbar bg-gray-50 dark:bg-gray-800 dark:bg-opacity-50">
      <div className="flex flex-wrap items-center justify-between p-3 mx-auto sm:p-8">
        <a href="#" className="flex items-center px-3 space-x-3 sm:text-2xl">
          <Logo className="w-10 fill-current text-yt-red h-9" />
          <span className="self-center font-bold text-gray-700 whitespace-nowrap dark:text-white">
            YouShuffle
          </span>
        </a>
        <div className="block w-auto text-lg">
          <ul className="flex flex-row p-0 mt-0 font-medium border-0">
            <li>
              <button
                onClick={toggleTheme}
                className="block px-2 py-2 text-gray-700 transition-colors border-0 rounded sm:px-4 sm:mx-3 hover:bg-transparent dark:text-white">
                <div
                  className={`icon-container transition-colors ${isDarkMode ? 'dark' : ''}`}>
                  <HiSun className="w-6 h-6 transition-colors icon sun sm:w-9 sm:h-9 hover:text-yt-red" />
                  <HiMoon className="w-6 h-6 transition-colors icon moon sm:w-9 sm:h-9 hover:text-yellow-400" />
                </div>
              </button>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-2 py-2 text-gray-700 transition-colors border-0 rounded sm:px-4 sm:mx-3 hover:bg-transparent hover:text-yt-red dark:text-white">
                <FaYoutube className="w-6 h-6 transition-colors sm:w-9 sm:h-9" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

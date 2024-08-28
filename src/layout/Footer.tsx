import React from 'react'
import Logo from '../assets/logo.svg?react'
import { FaGithub, FaRegEnvelope } from 'react-icons/fa6'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="flex justify-center m-12 mt-auto">
      <div className="w-auto max-w-screen-xl p-2 m-12 mx-auto transition-transform transform rounded-lg shadow-lg sm:p-4 bg-slate-100 dark:bg-gray-800 hover:scale-105">
        <ul className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
          <li>
            <a
              className="flex items-center text-gray-700 cursor-pointer dark:text-white ms-3 me-1"
              onClick={scrollToTop}>
              <Logo className="h-6 w-7 sm:w-10 sm:h-9" />
            </a>
          </li>
          <li className="relative flex items-center mx-4">
            <div className="w-px bg-gray-400 h-14 dark:bg-gray-200"></div>
          </li>
          <li className="relative flex items-center ms-2 me-5">
            <a
              href="https://github.com/jwnle31/YouShuffle"
              className="flex items-center text-gray-700 dark:text-white"
              target="_blank"
              rel="noopener noreferrer">
              <FaGithub className="w-6 h-6 sm:w-9 sm:h-9" />
            </a>
          </li>
          <li>
            <a
              href="mailto:YouShuffleContact@gmail.com"
              className="flex items-center text-gray-700 dark:text-white ms-2 me-3">
              <FaRegEnvelope className="w-6 h-6 sm:w-9 sm:h-9" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer

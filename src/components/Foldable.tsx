import React from 'react'
import { useToggle } from '../hooks'

type FoldableProps = {
  title: string
  children: React.ReactNode
  className?: string
}

export const Foldable: React.FC<FoldableProps> = ({ title, children, className }) => {
  const [isFolded, toggleFold] = useToggle()
  return (
    <div className={className}>
      <div>
        <div className="flex items-center justify-between p-2 mx-auto text-lg font-semibold text-gray-700 transition-transform duration-300 transform bg-white border rounded-lg shadow-md dark:border-slate-700 dark:text-slate-300 dark:bg-gray-800 max-w-72 hover:scale-105">
          <h2 className="truncate">{title}</h2>
          <button
            onClick={toggleFold}
            className="px-3 py-1 text-sm font-medium text-blue-600 transition-transform transform bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95">
            {isFolded ? 'Show' : 'Hide'}
          </button>
        </div>
      </div>

      <div className={`content ${isFolded ? '' : 'open'}`}>
        <div className="overflow-y-hidden inner grid-scrollable custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  )
}

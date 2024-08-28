import React, { useState } from 'react'
import { truncateText } from '../utils'

export type ReadMoreToggleProps = {
  description: string
  maxDescriptionLength: number
}

export const ReadMoreToggle: React.FC<ReadMoreToggleProps> = ({
  description,
  maxDescriptionLength
}) => {
  const [readMore, setReadMore] = useState(false)
  const togglelol = () => {
    setReadMore(lmao => !lmao)
  }
  const processedDescription = description
    .split('\n')
    .map((line: string, index: number) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
  const truncatedDescription = truncateText(description, maxDescriptionLength)
    .split('\n')
    .map((line: string, index: number) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))

  return (
    <div className="relative">
      <div className={`text-gray-700 dark:text-slate-300 mb-2 overflow-wrap-anywhere`}>
        {readMore ? processedDescription : truncatedDescription}
      </div>
      {description.length > maxDescriptionLength && (
        <button onClick={togglelol} className="block mb-1 text-blue-500 hover:underline">
          {readMore ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  )
}

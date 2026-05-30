import { useState, useEffect } from 'react'

export function useTyping(texts, speed = 80, deleteSpeed = 40, pause = 2000) {
  const [display, setDisplay] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = texts[index % texts.length]
    let timeout

    if (!isDeleting && display === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && display === '') {
      setIsDeleting(false)
      setIndex(i => (i + 1) % texts.length)
    } else {
      timeout = setTimeout(() => {
        setDisplay(prev =>
          isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        )
      }, isDeleting ? deleteSpeed : speed)
    }

    return () => clearTimeout(timeout)
  }, [display, isDeleting, index, texts, speed, deleteSpeed, pause])

  return display
}

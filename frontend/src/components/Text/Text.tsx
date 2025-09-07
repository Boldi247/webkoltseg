import type React from "react"

const Text = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return (
    <p className={className ?? "typography-body-regular"}>
        {children}
    </p>
  )
}

export default Text
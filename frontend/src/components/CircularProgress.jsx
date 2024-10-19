import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const CircularProgress = ({
    progress,
    strokeWidth,
    size,
    color,
    backgroundColor,
}) => {
    const circleRef = useRef(null)

    useEffect(() => {
        const draw = () => {
            const circle = circleRef.current
            const radius = (size - strokeWidth) / 2
            const circumference = 2 * Math.PI * radius
            const offset = circumference - (progress / 100) * circumference

            circle.setAttribute('stroke-dasharray', circumference)
            circle.setAttribute('stroke-dashoffset', offset)
        }

        draw()
    }, [progress, size, strokeWidth])

    return (
        <svg width={size} height={size}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={backgroundColor}
                strokeWidth={strokeWidth}
                fill="none"
            />
            <circle
                ref={circleRef}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
            />
        </svg>
    )
}

const StyledCircularProgressBar = styled(CircularProgress)`
    // Add any desired styles here
`

export default CircularProgress

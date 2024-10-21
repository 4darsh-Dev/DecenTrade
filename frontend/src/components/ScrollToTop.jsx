import React, { useState, useEffect } from 'react'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    // Toggle visibility based on scroll position
    const toggleVisibility = () => {
        if (window.pageYOffset > 150) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    // Add event listener for scroll changes
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-7 right-3 w-12 h-12 bg-customPurple text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition duration-300 flex items-center justify-center"
                >
                    <span className="text-4xl font-bold text-black">↑</span>
                </button>
            )}
        </div>
    )
}

export default ScrollToTop

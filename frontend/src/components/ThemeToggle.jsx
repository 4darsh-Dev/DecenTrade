import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
// import { Sun, Moon } from 'lucide-react'; // Lucide React icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode)
        document.body.classList.toggle('dark', !darkMode)
    }

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true'
        setDarkMode(savedMode)
        document.body.classList.toggle('dark', savedMode)
    }, [])

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode])

    return (
        <motion.div
            onClick={toggleDarkMode}
            className={`relative w-24 h-12 rounded-full cursor-pointer flex items-center px-2 ${
                darkMode ? 'bg-[#002855]' : 'bg-[#FFD966]'
            }`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatePresence>
                {darkMode ? (
                    <motion.div
                        key="moon"
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 40, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute left-1 text-blue-400"
                    >
                        <FontAwesomeIcon icon={faMoon} size="lg" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -40, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute right-1 text-yellow-500"
                    >
                        <FontAwesomeIcon icon={faSun} size="lg" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="w-10 h-10 bg-white rounded-full shadow-md"
                layout
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                style={{
                    x: darkMode ? '100%' : '0%',
                }}
            ></motion.div>
        </motion.div>
    )
}

export default ThemeToggle;



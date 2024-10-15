import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent px-4">
            <div className="text-center -mt-38 md:-mt-52">
                <h1 className="text-7xl md:text-9xl font-bold text-gray-50">404</h1>
                <p className="text-3xl md:text-4xl mt-6 md:mt-6 text-gray-100">Oops! Page not found.</p>
                <div className="mt-8 md:mt-12">
                    <Link to="/" className="return-home-button text-2xl md:text-2xl">
                        Go back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage

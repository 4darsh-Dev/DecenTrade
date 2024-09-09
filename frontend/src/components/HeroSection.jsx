import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const HeroSection = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        // const renderer = new THREE.WebGLRenderer({
        //     canvas: canvasRef.current,
        //     alpha: true,
        // })
        // renderer.setSize(window.innerWidth, window.innerHeight)
        // const animate = () => {
        //     requestAnimationFrame(animate)
        //     renderer.render(scene, camera)
        // }
        // animate()
        // return () => {
        //     renderer.dispose()
        // }
    }, [])

    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />
            <div className="relative z-10 text-center">
                <h1 className="text-6xl font-bold mb-4 text-white">
                    Explore, Collect and Sell
                    <br />
                    Extraordinary NFTs
                </h1>
                <p className="text-xl mb-8 text-gray-300">
                    The Best online marketplace to buy, sell and discover your
                    favorite NFTs
                    <br />
                    from top creators around the world.
                </p>
                <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full px-8 py-3 text-lg hover:opacity-90 transition-opacity">
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default HeroSection

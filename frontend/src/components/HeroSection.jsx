import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const HeroSection = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
        })

        renderer.setSize(window.innerWidth, window.innerHeight)

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
        })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)

        camera.position.z = 5

        const animate = () => {
            requestAnimationFrame(animate)
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            renderer.render(scene, camera)
        }

        animate()

        return () => {
            renderer.dispose()
        }
    }, [])

    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />
            <div className="relative z-10 text-center">
                <h1 className="text-6xl font-bold mb-4 text-white">
                    The NFT winmctpace
                    <br />
                    to hittold was
                </h1>
                <p className="text-xl mb-8 text-gray-300">
                    Oniarig defnree rosue menieling eniploy ouixe NFm hoat
                    appanese yer
                    <br />
                    your dight to squiteodarls.
                </p>
                <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full px-8 py-3 text-lg hover:opacity-90 transition-opacity">
                    New-Der
                </button>
            </div>
        </div>
    )
}

export default HeroSection

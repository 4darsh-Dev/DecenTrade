import Pako from 'pako'
// Utility function to convert Base64 to ArrayBuffer
const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
}

export const handleCompressedBase64Data = (imageData) => {
    // Convert Base64 to ArrayBuffer
    const arrayBuffer = base64ToArrayBuffer(imageData.data)
    // Decompress the ArrayBuffer using pako
    const decompressed = Pako.inflate(arrayBuffer)

    // Create a Blob from the decompressed ArrayBuffer
    const blob = new Blob([decompressed], { type: imageData.contentType })

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob)
    return url
}

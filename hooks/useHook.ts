'use client'
import { useState } from "react"

export const useHook = () => {
   const [    open, onClose] = useState()
    return {
           open, onClose

    }
}
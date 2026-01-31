"use client"

import * as React from "react"
import { Pencil, Square, Type, Undo, Save, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Annotator({ imageUrl }: { imageUrl: string }) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = React.useState(false)
    const [tool, setTool] = React.useState<"pen" | "rect" | "text">("pen")
    const [color, setColor] = React.useState("#ef4444") // Red default

    React.useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const img = new Image()
        img.src = imageUrl
        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
        }
    }, [imageUrl])

    const getCanvasCoordinates = (e: React.MouseEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        }
    }

    const [history, setHistory] = React.useState<ImageData[]>([])

    const saveHistory = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Save current state
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        setHistory(prev => [...prev, imageData])
    }

    const undo = () => {
        if (history.length === 0) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const newHistory = [...history]
        const previousState = newHistory.pop()
        setHistory(newHistory)

        if (previousState) {
            ctx.putImageData(previousState, 0, 0)
        } else {
            // If we popped the last state, we might want to clear or reload original image
            // ideally we keep the "original" image as history[0]
            // but for simple undo, if empty, we re-draw the original image
            const img = new Image()
            img.src = imageUrl
            img.onload = () => ctx.drawImage(img, 0, 0)
        }
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Save state before clearing
        saveHistory()

        // Reload original image
        const img = new Image()
        img.src = imageUrl
        img.onload = () => ctx.drawImage(img, 0, 0)
    }

    const startDrawing = (e: React.MouseEvent) => {
        if (tool !== "pen") return
        saveHistory() // Save before new stroke
        setIsDrawing(true)
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const { x, y } = getCanvasCoordinates(e, canvas)
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.strokeStyle = color
        ctx.lineWidth = 3
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
    }

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing || tool !== "pen") return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const { x, y } = getCanvasCoordinates(e, canvas)
        ctx.lineTo(x, y)
        ctx.stroke()
    }

    const stopDrawing = () => {
        setIsDrawing(false)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 p-2 border rounded-md bg-background">
                <Button variant={tool === "pen" ? "secondary" : "ghost"} size="sm" onClick={() => setTool("pen")}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant={tool === "rect" ? "secondary" : "ghost"} size="sm" onClick={() => setTool("rect")}>
                    <Square className="h-4 w-4" />
                </Button>
                <Button variant={tool === "text" ? "secondary" : "ghost"} size="sm" onClick={() => setTool("text")}>
                    <Type className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-border mx-2" />
                <div className="flex gap-1">
                    {["#ef4444", "#3b82f6", "#22c55e", "#000000"].map((c) => (
                        <button
                            key={c}
                            className={`w-6 h-6 rounded-full border ${color === c ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                            style={{ backgroundColor: c }}
                            onClick={() => setColor(c)}
                        />
                    ))}
                </div>
                <div className="flex-1" />
                <Button variant="ghost" size="sm" onClick={undo} disabled={history.length === 0}>
                    <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive" onClick={clearCanvas}>
                    <Trash className="h-4 w-4" />
                </Button>
                <Button size="sm">
                    <Save className="mr-2 h-4 w-4" /> Save Markup
                </Button>
            </div>

            <div className="border rounded-md overflow-hidden bg-muted/20 flex justify-center p-4">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="border bg-white shadow-sm cursor-crosshair max-w-full"
                />
            </div>
        </div>
    )
}

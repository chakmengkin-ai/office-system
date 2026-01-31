"use client"

import * as React from "react"
import { Upload, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import Annotator from "@/components/markup/annotator"

export default function MarkupPage() {
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null)

    // Quick mock for demo - In real app, use file uploader to create object URL
    const handleUpload = () => {
        // Setting a placeholder architectural drawing
        setSelectedImage("https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop")
    }

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Markup & Review</h1>
                    <p className="text-muted-foreground mt-1">Annotate designs and share feedback visually.</p>
                </div>
                <Button onClick={handleUpload} disabled={!!selectedImage}>
                    <Upload className="mr-2 h-4 w-4" /> Upload Document
                </Button>
            </div>

            {!selectedImage ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-xl bg-muted/10 text-muted-foreground">
                    <div className="bg-muted p-4 rounded-full mb-4">
                        <ImageIcon className="h-8 w-8" />
                    </div>
                    <p className="text-lg font-medium">No Document Selected</p>
                    <p className="text-sm">Upload an image or blueprint to start annotating.</p>
                    <Button className="mt-6" variant="secondary" onClick={handleUpload}>
                        Select Mock Image
                    </Button>
                </div>
            ) : (
                <Annotator imageUrl={selectedImage} />
            )}
        </div>
    )
}

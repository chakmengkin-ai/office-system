"use client"

import * as React from "react"
import { Upload, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import Annotator from "@/components/markup/annotator"

export default function MarkupPage() {
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null)

    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setSelectedImage(url)
        }
    }

    // Cleanup object URL
    React.useEffect(() => {
        return () => {
            if (selectedImage && selectedImage.startsWith('blob:')) {
                URL.revokeObjectURL(selectedImage)
            }
        }
    }, [selectedImage])

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Markup & Review</h1>
                    <p className="text-muted-foreground mt-1">Annotate designs and share feedback visually.</p>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <Button onClick={handleUploadClick} disabled={!!selectedImage}>
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
                    <Button className="mt-6" variant="secondary" onClick={handleUploadClick}>
                        Select Image
                    </Button>
                </div>
            ) : (
                <Annotator imageUrl={selectedImage} />
            )}
        </div>
    )
}

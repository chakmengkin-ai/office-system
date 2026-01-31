"use client"

import * as React from "react"
import { Folder, FileText, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import TiptapEditor from "@/components/editor/tiptap-editor"

const MOCK_FOLDERS = [
    { id: 1, name: "Project Alpha", active: true },
    { id: 2, name: "Meeting Minutes", active: false },
    { id: 3, name: "Personal Ideas", active: false },
]

const MOCK_NOTES = [
    { id: 1, title: "Design Kickoff", preview: "The team agreed on the brutalist approach...", date: "2h ago" },
    { id: 2, title: "Material Selection", preview: "Marble vs Granite for the lobby...", date: "1d ago" },
]

export default function NotesPage() {
    const [selectedNote, setSelectedNote] = React.useState<number | null>(1)

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            {/* Sidebar Folders */}
            <div className="w-64 border-r bg-muted/10 flex flex-col">
                <div className="p-4 border-b">
                    <Button className="w-full justify-start" variant="outline">
                        <Plus className="mr-2 h-4 w-4" /> New Folder
                    </Button>
                </div>
                <div className="flex-1 overflow-auto p-2">
                    <div className="space-y-1">
                        {MOCK_FOLDERS.map((folder) => (
                            <Button key={folder.id} variant={folder.active ? "secondary" : "ghost"} className="w-full justify-start font-normal">
                                <Folder className="mr-2 h-4 w-4 text-blue-500" />
                                {folder.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Note List */}
            <div className="w-80 border-r bg-background flex flex-col">
                <div className="p-4 border-b space-y-4">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search notes..." className="pl-8" />
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    {MOCK_NOTES.map((note) => (
                        <div
                            key={note.id}
                            className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${selectedNote === note.id ? 'bg-muted/50' : ''}`}
                            onClick={() => setSelectedNote(note.id)}
                        >
                            <h3 className="font-semibold text-sm mb-1">{note.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">{note.preview}</p>
                            <span className="text-[10px] text-muted-foreground mt-2 block">{note.date}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col bg-background">
                <div className="h-14 border-b flex items-center justify-between px-6">
                    <h2 className="font-semibold">Design Kickoff</h2>
                    <Button size="sm">Share</Button>
                </div>
                <div className="flex-1 p-8 overflow-auto">
                    <div className="max-w-3xl mx-auto">
                        <TiptapEditor content="<h2>Meeting Agenda</h2><p>Discussion about the new brutalist direction...</p>" />
                    </div>
                </div>
            </div>
        </div>
    )
}

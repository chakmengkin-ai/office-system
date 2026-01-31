"use client"

import * as React from "react"
import { Send, Plus, Filter, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { supabase } from "@/lib/supabase"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface FeedbackItem {
    id: number
    client_name: string
    project_name: string
    content: string
    status: string
    urgency: string
    created_at: string
}

export default function FeedbackPage() {
    const [feedback, setFeedback] = React.useState<FeedbackItem[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isFormOpen, setIsFormOpen] = React.useState(false)
    const [formData, setFormData] = React.useState({ client: '', project: '', content: '' })

    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [statusMessage, setStatusMessage] = React.useState<{ type: 'success' | 'error', text: string } | null>(null)

    const fetchFeedback = React.useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('feedback')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            if (data) setFeedback(data)
        } catch (error) {
            console.error('Error fetching feedback:', error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        fetchFeedback()

        // Real-time subscription
        const channel = supabase
            .channel('feedback_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'feedback' }, () => {
                fetchFeedback()
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [fetchFeedback])

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen)
        setStatusMessage(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatusMessage(null)

        try {
            const { error } = await supabase.from('feedback').insert([
                {
                    client_name: formData.client,
                    project_name: formData.project,
                    content: formData.content,
                    status: 'new',
                    urgency: 'medium'
                }
            ])
            if (error) throw error

            setFormData({ client: '', project: '', content: '' })
            setStatusMessage({ type: 'success', text: 'Feedback submitted successfully!' })

            // Close form after distinct delay or keep open to show success? 
            // Better UX: Keep open for a moment or close immediately. Choosing close after short delay.
            setTimeout(() => {
                setIsFormOpen(false)
                setIsSubmitting(false)
                setStatusMessage(null)
            }, 1500)
        } catch (error) {
            console.error('Error submitting feedback:', error)
            setStatusMessage({ type: 'error', text: 'Failed to submit feedback. Please try again.' })
            setIsSubmitting(false)
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "resolved": return <CheckCircle2 className="h-4 w-4 text-green-500" />
            case "in-progress": return <Clock className="h-4 w-4 text-yellow-500" />
            default: return <AlertCircle className="h-4 w-4 text-blue-500" />
        }
    }

    const getUrgencyBadge = (urgency: string) => {
        switch (urgency) {
            case "high": return <Badge variant="destructive">High Priority</Badge>
            case "medium": return <Badge variant="secondary">Medium</Badge>
            default: return <Badge variant="outline">Low</Badge>
        }
    }

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Client Feedback Hub</h1>
                    <p className="text-muted-foreground mt-1">Manage and track client requests across projects.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button onClick={toggleForm}>
                        <Plus className="mr-2 h-4 w-4" /> New Feedback
                    </Button>
                </div>
            </div>

            {isFormOpen && (
                <Card className="mb-8 border-primary/20 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="text-lg">Submit New Feedback</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {statusMessage && (
                                <div className={`p-3 rounded-md text-sm ${statusMessage.type === 'error' ? 'bg-destructive/15 text-destructive' : 'bg-green-500/15 text-green-600'}`}>
                                    {statusMessage.text}
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Client Name</label>
                                    <Input
                                        placeholder="e.g. Acme Corp"
                                        value={formData.client}
                                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Project</label>
                                    <Input
                                        placeholder="e.g. HQ Redesign"
                                        value={formData.project}
                                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Feedback Details</label>
                                <Textarea
                                    placeholder="Describe the issue or request..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" onClick={toggleForm} type="button" disabled={isSubmitting}>Cancel</Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? <span className="animate-spin mr-2">⏳</span> : <Send className="mr-2 h-4 w-4" />}
                                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {isLoading ? (
                    <div className="text-center py-10 text-muted-foreground">Loading feedback...</div>
                ) : feedback.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                        No feedback entries yet. Create one to get started.
                    </div>
                ) : (
                    feedback.map((item) => (
                        <Card key={item.id} className="transition-all hover:shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold">{item.client_name}</span>
                                            <span className="text-muted-foreground">/</span>
                                            <span className="text-sm text-muted-foreground">{item.project_name}</span>
                                        </div>
                                        <p className="text-sm leading-relaxed">{item.content}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 min-w-[120px]">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            {getStatusIcon(item.status)}
                                            <span className="capitalize">{item.status.replace('-', ' ')}</span>
                                        </div>
                                        {getUrgencyBadge(item.urgency)}
                                        <span className="text-xs text-muted-foreground mt-1">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}

"use client"

import * as React from "react"
import { useFormStatus } from "react-dom"
import { login, signup } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"

function SubmitButton({ children }: { children: React.ReactNode }) {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Processing..." : children}
        </Button>
    )
}

export default function LoginPage() {
    const [mode, setMode] = React.useState<'login' | 'signup'>('login')
    const [message, setMessage] = React.useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        setMessage(null)
        if (mode === 'login') {
            const res = await login(formData)
            if (res?.error) setMessage(res.error)
        } else {
            const res = await signup(formData)
            if (res?.error) setMessage(res.error)
            if (res?.success) setMessage(res.success)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-6 bg-muted/20">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2 w-fit">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </CardTitle>
                    <CardDescription>
                        Office Organization System
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input name="email" type="email" placeholder="name@company.com" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input name="password" type="password" required />
                        </div>

                        {message && (
                            <div className="text-sm p-3 rounded bg-muted text-center font-medium">
                                {message}
                            </div>
                        )}

                        <SubmitButton>
                            {mode === 'login' ? 'Sign In' : 'Sign Up'}
                        </SubmitButton>
                    </form>

                    <div className="mt-4 text-center text-sm text-muted-foreground">
                        {mode === 'login' ? (
                            <>Don't have an account? <button onClick={() => setMode('signup')} className="text-primary hover:underline">Sign up</button></>
                        ) : (
                            <>Already have an account? <button onClick={() => setMode('login')} className="text-primary hover:underline">Log in</button></>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

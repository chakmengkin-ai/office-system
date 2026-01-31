import Link from "next/link"
import { ArrowRight, MessageSquare, FileText, PenTool } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-12">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Office Organization System&nbsp;
          <code className="font-mono font-bold">v1.0</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <span className="flex items-center gap-2 p-8 lg:p-0 font-semibold">
            By Antigravity
          </span>
        </div>
      </div>

      <div className="relative flex place-items-center mb-16 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl text-center">
          Centralized Command <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            For Modern Architecture
          </span>
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3 w-full max-w-5xl">
        <Link href="/feedback" className="group">
          <Card className="h-full transition-colors hover:border-primary/50 hover:bg-accent/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                Feedback Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Centralized client feedback collection and tracking. Monitor requests and urgency.
              </p>
              <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
                Access Hub <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/notes" className="group">
          <Card className="h-full transition-colors hover:border-primary/50 hover:bg-accent/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5 text-emerald-500" />
                Notes & Docs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Rich text note-taking and document repository. Organize project specs and meeting logs.
              </p>
              <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
                Open Notes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/markup" className="group">
          <Card className="h-full transition-colors hover:border-primary/50 hover:bg-accent/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <PenTool className="h-5 w-5 text-purple-500" />
                Markup Tool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Visual annotation for blueprints and renders. Collaborative design review interface.
              </p>
              <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
                Start Annotating <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  )
}

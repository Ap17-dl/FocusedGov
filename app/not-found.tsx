import { Button } from '@/components/ui/button'
import { Brain, Home, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">InnovativeFlow</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md text-center space-y-8">
          <div className="space-y-4">
            <div className="text-6xl font-bold text-primary/20 mb-4">404</div>
            <h1 className="text-4xl font-semibold">Page Not Found</h1>
            <p className="text-lg text-muted-foreground">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Link href="/">
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Need help? <Link href="mailto:support@innovativeflow.com" className="text-primary hover:underline">Contact support</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

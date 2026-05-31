'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Bell, Lock, User, Zap, CreditCard, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsSaving(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Profile</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                defaultValue="John Doe"
                className="bg-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue="john@example.com"
                className="bg-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="exam">Exam Preparing For</Label>
            <select
              id="exam"
              className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              defaultValue="upsc"
            >
              <option value="upsc">UPSC Civil Services</option>
              <option value="jee">JEE Main & Advanced</option>
              <option value="neet">NEET</option>
              <option value="cat">CAT</option>
              <option value="gate">GATE</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">Target Score / Rank</Label>
            <Input
              id="target"
              type="text"
              defaultValue="Top 100"
              className="bg-input"
            />
          </div>

          <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </Card>

      {/* Learning Preferences */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Learning Preferences</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-secondary/30 cursor-pointer transition-colors">
              <input
                type="radio"
                name="study-pace"
                defaultChecked
                className="w-4 h-4"
              />
              <div>
                <p className="font-medium">Intensive (2+ hours/day)</p>
                <p className="text-xs text-muted-foreground">Fast-paced learning for final preparation</p>
              </div>
            </label>
          </div>

          <div>
            <label className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-secondary/30 cursor-pointer transition-colors">
              <input
                type="radio"
                name="study-pace"
                className="w-4 h-4"
              />
              <div>
                <p className="font-medium">Moderate (1-2 hours/day)</p>
                <p className="text-xs text-muted-foreground">Balanced and sustainable approach</p>
              </div>
            </label>
          </div>

          <div>
            <label className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-secondary/30 cursor-pointer transition-colors">
              <input
                type="radio"
                name="study-pace"
                className="w-4 h-4"
              />
              <div>
                <p className="font-medium">Flexible (30 min+/day)</p>
                <p className="text-xs text-muted-foreground">Build consistency gradually</p>
              </div>
            </label>
          </div>

          <div className="space-y-2 pt-4">
            <Label htmlFor="preferred-time">Preferred Study Time</Label>
            <select
              id="preferred-time"
              className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              defaultValue="morning"
            >
              <option value="early-morning">Early Morning (5-7 AM)</option>
              <option value="morning">Morning (7-10 AM)</option>
              <option value="afternoon">Afternoon (12-3 PM)</option>
              <option value="evening">Evening (4-7 PM)</option>
              <option value="night">Night (8 PM+)</option>
            </select>
          </div>

          <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
            <div>
              <p className="font-medium text-sm">Daily Reminders</p>
              <p className="text-xs text-muted-foreground">Remind me to start my daily study session</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </label>

          <label className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
            <div>
              <p className="font-medium text-sm">Revision Alerts</p>
              <p className="text-xs text-muted-foreground">Notify when topics are due for revision</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </label>

          <label className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
            <div>
              <p className="font-medium text-sm">Performance Updates</p>
              <p className="text-xs text-muted-foreground">Weekly summaries of your progress</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </label>

          <label className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
            <div>
              <p className="font-medium text-sm">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Receive updates via email</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </label>

          <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
            {isSaving ? 'Saving...' : 'Save Notification Settings'}
          </Button>
        </div>
      </Card>

      {/* Subscription */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <CreditCard className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Subscription</h2>
        </div>

        <div className="p-4 border border-primary/30 rounded-lg bg-primary/5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Pro Plan</p>
              <p className="text-sm text-muted-foreground">₹999/month</p>
            </div>
            <span className="text-xs font-semibold bg-primary/20 text-primary px-3 py-1 rounded">Active</span>
          </div>
          <p className="text-xs text-muted-foreground">Next billing date: July 3, 2026</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Change Plan</Button>
            <Button variant="outline" size="sm">Manage Billing</Button>
          </div>
        </div>
      </Card>

      {/* Password & Security */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Password & Security</h2>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Enable Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start">
            View Active Sessions
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 space-y-6 border-destructive/30">
        <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>

        <div className="space-y-4">
          <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <p className="text-sm font-medium mb-3">Delete Account</p>
            <p className="text-xs text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button variant="destructive" size="sm">Delete Account</Button>
          </div>

          <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <p className="text-sm font-medium mb-3">Logout</p>
            <p className="text-xs text-muted-foreground mb-4">
              Sign out from this device.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/'}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

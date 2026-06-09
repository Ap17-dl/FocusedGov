'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, FileText, Video, Download, Search, Filter, Star, Eye } from 'lucide-react'
import { useState } from 'react'

interface BaseResource {
  id: number
  title: string
  category: string
  rating: number
  downloads: number
}

interface PDFResource extends BaseResource {
  type: 'pdf'
  size: string
  pages: number
}

interface VideoResource extends BaseResource {
  type: 'video'
  duration: string
  views: number
}

type Resource = PDFResource | VideoResource

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const resources: Resource[] = [
    {
      id: 1,
      title: 'Modern Indian History: Complete Guide',
      type: 'pdf',
      category: 'History',
      rating: 4.8,
      downloads: 2340,
      size: '2.4 MB',
      pages: 45,
    },
    {
      id: 2,
      title: 'Constitutional Law - Articles Explained',
      type: 'video',
      category: 'Polity',
      rating: 4.9,
      downloads: 3102,
      duration: '2h 30m',
      views: 5600,
    },
    {
      id: 3,
      title: 'Geography Atlas - Physical Features',
      type: 'pdf',
      category: 'Geography',
      rating: 4.7,
      downloads: 1890,
      size: '8.5 MB',
      pages: 120,
    },
    {
      id: 4,
      title: 'Economics for UPSC - Part 1',
      type: 'video',
      category: 'Economics',
      rating: 4.6,
      downloads: 1234,
      duration: '3h 15m',
      views: 4200,
    },
    {
      id: 5,
      title: 'Essay Writing Masterclass',
      type: 'video',
      category: 'Writing',
      rating: 4.9,
      downloads: 4560,
      duration: '1h 45m',
      views: 8900,
    },
    {
      id: 6,
      title: 'Current Affairs Summary - 2026',
      type: 'pdf',
      category: 'Current Affairs',
      rating: 4.8,
      downloads: 5670,
      size: '3.2 MB',
      pages: 72,
    },
  ]

  const categories = ['All', 'History', 'Polity', 'Geography', 'Economics', 'Writing', 'Current Affairs']

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === 'all' || resource.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Learning Resources</h1>
        <p className="text-muted-foreground">Curated study materials, PDFs, and videos to enhance your preparation</p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedCategory === category.toLowerCase()
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Resources</p>
            <p className="text-2xl font-semibold">{resources.length}</p>
          </div>
          <BookOpen className="w-8 h-8 text-primary/50" />
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Downloads</p>
            <p className="text-2xl font-semibold">22.8K</p>
          </div>
          <Download className="w-8 h-8 text-accent/50" />
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
            <p className="text-2xl font-semibold">4.8/5</p>
          </div>
          <Star className="w-8 h-8 text-yellow-500/50" />
        </Card>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource: Resource) => (
          <Card key={resource.id} className="p-6 space-y-4 hover:border-primary transition-colors group cursor-pointer">
            {/* Type Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {resource.type === 'pdf' ? (
                  <FileText className="w-5 h-5 text-red-600" />
                ) : (
                  <Video className="w-5 h-5 text-blue-600" />
                )}
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  {resource.type}
                </span>
              </div>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>

            {/* Title */}
            <div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">{resource.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{resource.category}</p>
            </div>

            {/* Details */}
            <div className="text-xs text-muted-foreground space-y-1">
              {resource.type === 'pdf' ? (
                <>
                  <p>Size: {resource.size} • Pages: {resource.pages}</p>
                  <p className="flex items-center gap-1">
                    <Download className="w-3 h-3" /> {resource.downloads.toLocaleString()} downloads
                  </p>
                </>
              ) : (
                <>
                  <p>Duration: {resource.duration}</p>
                  <p className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {resource.views?.toLocaleString() ?? ''} views
                  </p>
                </>
              )}
            </div>

            {/* Rating and CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">{resource.rating}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(resource.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-border'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                {resource.type === 'pdf' ? 'Download' : 'Watch'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No resources found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

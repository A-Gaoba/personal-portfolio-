"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ExternalLink, Github, X, Check } from "lucide-react"
import type { JSX } from "react/jsx-runtime"

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: string
  year: string
  status: string
  metrics: { label: string; value: string; icon: JSX.Element }[]
  challenges: string[]
  solutions: string[]
  results: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-dark-bg-secondary text-dev-text border-dark-border p-0">
        <DialogHeader className="relative">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg-secondary to-transparent" />
          <DialogTitle className="absolute bottom-4 left-6 text-3xl font-bold text-dev-text z-10">
            {project.title}
          </DialogTitle>
          <Button
            variant="ghost"
            onClick={onClose}
            className="absolute top-4 right-4 text-dev-text-muted hover:text-dev-text hover:bg-dark-bg-tertiary"
          >
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>
        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-2xl font-bold text-dev-text mb-4">Overview</h3>
            <p className="text-dev-text-muted leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-2xl font-bold text-dev-text mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-dark-bg-tertiary text-dev-text-muted rounded-full font-semibold text-sm font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div>
            <h3 className="text-2xl font-bold text-dev-text mb-4">Key Results & Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {project.metrics.map((metric, index) => (
                <div key={index} className="flex items-center p-4 bg-dark-bg-tertiary rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 bg-syntax-green text-dark-bg rounded-full mr-3">
                    {metric.icon}
                  </div>
                  <div>
                    <div className="font-bold text-dev-text text-lg">{metric.value}</div>
                    <div className="text-dev-text-muted text-sm">{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div>
            <h3 className="text-2xl font-bold text-dev-text mb-4">Challenges & Solutions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-dev-text mb-2 flex items-center">
                  <X className="w-5 h-5 text-syntax-red mr-2" /> Challenges
                </h4>
                <ul className="list-disc list-inside text-dev-text-muted space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-dev-text mb-2 flex items-center">
                  <Check className="w-5 h-5 text-syntax-green mr-2" /> Solutions
                </h4>
                <ul className="list-disc list-inside text-dev-text-muted space-y-2">
                  {project.solutions.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-2xl font-bold text-dev-text mb-4">Achieved Results</h3>
            <ul className="list-disc list-inside text-dev-text-muted space-y-2">
              {project.results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 border-t border-dark-border">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View Live Project
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-dark-bg-tertiary border-2 border-dark-border text-dev-text-muted rounded-xl hover:border-syntax-blue hover:text-syntax-blue hover:bg-dark-bg-secondary transition-all duration-300 font-semibold shadow-dev-md hover:shadow-dev-lg"
            >
              <Github className="w-5 h-5 mr-2" />
              View Source Code
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

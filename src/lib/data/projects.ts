import type { Language } from '$lib/stores/language'

/** Per-language copy for a project card. */
export interface SelectedProjectCopy {
  title: string
  /** Problem + solution in ~2 lines. */
  tagline: string
  role: string
  architecture: string
  /** Numbers in this string (e.g. "+30%", "~6,000") are highlighted on the card. */
  impact: string
}

/** Why a project has no public link — shown as a status pill in the card's hover overlay. */
export type ProjectAccess = 'onPremise' | 'private' | 'hackathon'

/** Single source of truth for project work across the site — rendered by `ProjectCard.svelte`. */
export type SelectedProject = {
  id: string
  year: string
  techStack: string[]
  /** MP4/WebM loop or GIF under `static/`. The card falls back to a placeholder if the file is missing. */
  mediaUrl: string
  liveUrl?: string
  githubUrl?: string
  /** Only used when there is no `liveUrl`/`githubUrl`; defaults to `'private'`. */
  access?: ProjectAccess
} & Record<Language, SelectedProjectCopy>

export const selectedProjects: SelectedProject[] = [
  {
    id: 'muveran-ai',
    year: '2025 - 2026',
    es: {
      title: 'Muveran AI',
      tagline:
        'Plataforma multicanal de agentes de IA con orquestación RAG personalizada para integraciones SaaS en redes sociales.',
      role: 'Desarrollador Técnico Líder & Arquitecto',
      architecture:
        'Capa de orquestación en LangGraph integrada a un pipeline RAG personalizado, con despliegue de microservicios en VPS.',
      impact:
        '+30% de rendimiento en API RAG bajo ejecución paralela; beta en producción con cientos de usuarios activos.'
    },
    en: {
      title: 'Muveran AI',
      tagline:
        'Multi-channel AI agent platform with customized RAG orchestration for SaaS social media integrations.',
      role: 'Lead Technical Developer & Architect',
      architecture:
        'LangGraph orchestration layer integrated into custom RAG pipeline with microservices VPS deployment.',
      impact:
        '+30% RAG API throughput under parallel execution; live beta serving hundreds of active users.'
    },
    techStack: ['Python', 'LangGraph', 'LLMs', 'RAG', 'Docker', 'Meta API'],
    mediaUrl: '/videos/muveran-demo.mp4',
    liveUrl: 'https://muveran.ai'
  },
  {
    id: 'optifacil',
    year: '2025',
    es: {
      title: 'OptiFácil',
      tagline:
        'Aplicación de escritorio edge multiplataforma para optimizar la gestión de stock y analítica de ventas en ópticas.',
      role: 'Ingeniero de Producto End-to-End',
      architecture:
        'Cliente de escritorio en Tauri respaldado por APIs serverless en Cloudflare Workers para persistencia en el edge.',
      impact:
        'Redujo drásticamente las demoras en la carga de stock; excelente recepción de los primeros clientes con métricas de ventas en tiempo real.'
    },
    en: {
      title: 'OptiFácil',
      tagline:
        'Cross-platform edge desktop application streamlining stock management and sales analytics for optical retail.',
      role: 'End-to-End Product Engineer',
      architecture:
        'Tauri desktop client wrapper backed by serverless APIs on Cloudflare Workers for edge persistence.',
      impact:
        'Dramatically reduced stock registration delays; delighted initial retail clients with real-time sales insights.'
    },
    techStack: ['React', 'Tauri', 'Hono', 'Cloudflare Workers', 'TypeScript'],
    mediaUrl: '/videos/optifacil-demo.mp4',
    access: 'private'
  },
  {
    id: 'maxi-ai',
    year: '2023',
    es: {
      title: 'MAXI — Soporte de Decisión Clínica',
      tagline:
        'Sistema de detección de anomalías en radiografías de tórax mediante Deep Learning integrado a flujos clínicos hospitalarios.',
      role: 'Desarrollador Fullstack AI',
      architecture:
        'Pipeline de preprocesamiento de imágenes médicas y fine-tuning de CNN servido mediante Gradio en servidores del hospital.',
      impact:
        '70% AUROC en producción; procesa ~6,000 radiografías de tórax mensuales (~200 diarias) en flujos clínicos activos.'
    },
    en: {
      title: 'MAXI — Clinical Decision Support',
      tagline:
        'Deep learning chest X-ray anomaly detection system integrated into hospital clinical workflows.',
      role: 'Fullstack AI Developer',
      architecture:
        'Medical imaging preprocessing & CNN fine-tuning pipeline served via Gradio on hospital servers.',
      impact:
        '70% AUROC in production; processes ~6,000 chest X-rays monthly (~200 daily) in active clinical workflows.'
    },
    techStack: ['PyTorch', 'CNNs', 'Python', 'Gradio', 'On-Premise Infrastructure'],
    mediaUrl: '/videos/maxi-demo.mp4',
    access: 'onPremise'
  },
  {
    id: 'developer-tooling',
    year: '2024 - 2025',
    es: {
      title: 'Pacto CLI y herramientas Madie para VS Code',
      tagline:
        'Framework CLI en Go para desarrollo guiado por especificaciones y extensión WYSIWYG de Markdown para VS Code.',
      role: 'Creador y Mantenedor',
      architecture:
        'Motor de verificación de specs que vincula slices de planes Markdown con estados de trabajo + sincronización de editor webview.',
      impact:
        'CLI open-source publicado con lanzamientos versionados + extensión publicada en VS Code Marketplace.'
    },
    en: {
      title: 'Pacto CLI & Madie VS Code Tooling',
      tagline:
        'Spec-driven development CLI framework in Go and WYSIWYG Markdown editor extension for VS Code.',
      role: 'Creator & Maintainer',
      architecture:
        'Spec verification engine binding Markdown plan slices to work states + custom webview editor sync.',
      impact:
        'Published open-source CLI with versioned releases + published VS Code Marketplace extension.'
    },
    techStack: ['Go', 'TypeScript', 'VS Code Extension API', 'GitHub Actions'],
    mediaUrl: '/videos/pacto-madie.mp4',
    githubUrl: 'https://github.com/triple0-labs/pacto-spec'
  },
  {
    id: 'pixel-rush',
    year: '2026',
    es: {
      title: 'Pixel Rush Arcade',
      tagline:
        'Minijuego arcade fullstack y servidor de trivia construido y desplegado en vivo durante la Hackathon de Nerdearla.',
      role: 'Líder de Backend e Infraestructura',
      architecture:
        'Backend basado en eventos alojado en Webflow Cloud utilizando Webflow CMS como almacenamiento de trivia en tiempo real.',
      impact:
        'Desarrollado y desplegado en vivo bajo los plazos estrictos de la hackathon para la evaluación del jurado.'
    },
    en: {
      title: 'Pixel Rush Arcade',
      tagline:
        'Fullstack arcade minigame and quiz server built and deployed live during Nerdearla Hackathon.',
      role: 'Backend & Infrastructure Lead',
      architecture:
        'Event-driven backend hosted on Webflow Cloud using Webflow CMS as real-time trivia data storage.',
      impact:
        'Shipped and deployed live under strict hackathon timeline for jury evaluation.'
    },
    techStack: ['Next.js', 'Webflow Cloud', 'Webflow CMS API', 'CI/CD'],
    mediaUrl: '/videos/pixel-rush.mp4',
    access: 'hackathon'
  }
]

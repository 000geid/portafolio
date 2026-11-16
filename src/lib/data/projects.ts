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
  impactDetail?: string
}

/** One numbered step of the project story told by `ArchitectureDiagram`. */
export interface ProjectFlowStep {
  /** Plain-language headline, e.g. 'Llega una radiografía'. */
  title: string
  /** One supporting sentence, no jargon. */
  detail: string
}

/**
 * The consistent project story: what enters → what the system does → what the user gets.
 * Rendered bilingually by `ArchitectureDiagram.svelte` — exactly three steps, in order.
 */
export interface ProjectFlow {
  /** Complementary metric line shown under the steps (should not repeat `impact`). */
  metric: Record<Language, string>
  steps: Record<Language, [ProjectFlowStep, ProjectFlowStep, ProjectFlowStep]>
}

/** Why a project has no public link — shown with the project year. */
export type ProjectAccess = 'onPremise' | 'private' | 'hackathon'

/** Single source of truth for project work across the site — rendered by `ProjectCard.svelte`. */
export type SelectedProject = {
  id: string
  year: string
  featured?: boolean
  techStack: string[]
  /** Bilingual three-step story rendered by `ArchitectureDiagram` inside the card. */
  flow: ProjectFlow
  liveUrl?: string
  githubUrl?: string
  /** Only used when there is no `liveUrl`/`githubUrl`; defaults to `'private'`. */
  access?: ProjectAccess
} & Record<Language, SelectedProjectCopy>

export const selectedProjects: SelectedProject[] = [
  {
    id: 'muveran-ai',
    featured: true,
    year: '2025 – 2026',
    es: {
      title: 'Muveran AI',
      tagline: 'Plataforma de agentes de IA para atender conversaciones en redes sociales.',
      role: 'Liderazgo técnico y arquitectura',
      architecture:
        'Capa de orquestación en LangGraph integrada a un pipeline RAG personalizado, con despliegue de microservicios en VPS.',
      impact: '+30% de rendimiento de la API RAG al procesar solicitudes en paralelo.',
      impactDetail: 'Beta en producción con cientos de usuarios activos.'
    },
    en: {
      title: 'Muveran AI',
      tagline: 'AI agent platform for handling conversations across social channels.',
      role: 'Technical lead and architect',
      architecture:
        'LangGraph orchestration layer integrated into custom RAG pipeline with microservices VPS deployment.',
      impact: '+30% RAG API throughput when processing requests in parallel.',
      impactDetail: 'The live beta serves hundreds of active users.'
    },
    techStack: ['Python', 'LangGraph', 'LLMs', 'RAG', 'Docker', 'Meta API'],
    flow: {
      metric: {
        es: 'Beta en producción · cientos de usuarios activos',
        en: 'Live beta · hundreds of active users'
      },
      steps: {
        es: [
          { title: 'Llega un mensaje', detail: 'Alguien escribe por Instagram, WhatsApp o Facebook.' },
          { title: 'La IA entiende y responde', detail: 'Un agente consulta la información de la marca y redacta la respuesta.' },
          { title: 'Sale la respuesta', detail: 'El cliente recibe una respuesta útil en segundos, sin intervención humana.' }
        ],
        en: [
          { title: 'A message arrives', detail: 'Someone writes on Instagram, WhatsApp or Facebook.' },
          { title: 'The AI understands and answers', detail: 'An agent looks up the brand’s knowledge and drafts the reply.' },
          { title: 'The reply goes out', detail: 'The customer gets a helpful answer in seconds, without human intervention.' }
        ]
      }
    },
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
    flow: {
      metric: {
        es: 'Datos siempre al día, en tiempo real',
        en: 'Always-current data, in real time'
      },
      steps: {
        es: [
          { title: 'El local registra stock y ventas', detail: 'La app de escritorio funciona incluso sin conexión.' },
          { title: 'Los datos se sincronizan', detail: 'Viajan por APIs serverless hasta la nube, en el edge.' },
          { title: 'El negocio se ve en vivo', detail: 'El dueño consulta ventas y stock actualizados al instante.' }
        ],
        en: [
          { title: 'The shop logs stock and sales', detail: 'The desktop app works even while offline.' },
          { title: 'Data syncs to the cloud', detail: 'It travels through serverless APIs to the edge.' },
          { title: 'The business goes live', detail: 'The owner sees sales and stock updated in real time.' }
        ]
      }
    },
    access: 'private'
  },
  {
    id: 'maxi-ai',
    featured: true,
    year: '2023',
    es: {
      title: 'MAXI — Soporte de Decisión Clínica',
      tagline: 'Sistema que detecta anomalías en radiografías de tórax para apoyar decisiones clínicas.',
      role: 'Desarrollo full-stack e IA',
      architecture:
        'Pipeline de preprocesamiento de imágenes médicas y fine-tuning de CNN servido mediante Gradio en servidores del hospital.',
      impact: '≈6.000 radiografías de tórax procesadas al mes en flujos clínicos activos.',
      impactDetail: '70% de AUROC en producción, con unas 200 radiografías procesadas por día.'
    },
    en: {
      title: 'MAXI — Clinical Decision Support',
      tagline: 'System that flags anomalies in chest X-rays to support clinical decisions.',
      role: 'Full-stack and AI development',
      architecture:
        'Medical imaging preprocessing & CNN fine-tuning pipeline served via Gradio on hospital servers.',
      impact: '≈6,000 chest X-rays processed per month in active clinical workflows.',
      impactDetail: '70% AUROC in production, with about 200 X-rays processed per day.'
    },
    techStack: ['PyTorch', 'CNNs', 'Python', 'Gradio', 'On-Premise Infrastructure'],
    flow: {
      metric: {
        es: '70% AUROC · ~200 radiografías por día',
        en: '70% AUROC · ~200 X-rays a day'
      },
      steps: {
        es: [
          { title: 'Llega una radiografía', detail: 'El hospital envía una imagen de tórax al servidor local.' },
          { title: 'La IA marca lo sospechoso', detail: 'El modelo señala las zonas con posibles anomalías.' },
          { title: 'El médico decide mejor', detail: 'Revisa el caso con la IA como segunda opinión.' }
        ],
        en: [
          { title: 'An X-ray comes in', detail: 'The hospital sends a chest image to the on-site server.' },
          { title: 'The AI flags what looks wrong', detail: 'The model marks the areas with possible anomalies.' },
          { title: 'The doctor decides better', detail: 'They review the case with the AI as a second opinion.' }
        ]
      }
    },
    access: 'onPremise'
  },
  {
    id: 'developer-tooling',
    year: '2024 – 2025',
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
    flow: {
      metric: {
        es: 'Open source · publicado en el VS Code Marketplace',
        en: 'Open source · published on the VS Code Marketplace'
      },
      steps: {
        es: [
          { title: 'El plan se escribe en Markdown', detail: 'Cada funcionalidad queda descrita como pasos verificables.' },
          { title: 'La CLI verifica cada paso', detail: 'Compara lo planificado con el estado real del trabajo.' },
          { title: 'Nada se desactualiza', detail: 'El plan y el código cuentan siempre la misma historia.' }
        ],
        en: [
          { title: 'The plan is written in Markdown', detail: 'Each feature is described as verifiable steps.' },
          { title: 'The CLI checks every step', detail: 'It compares what was planned with the actual state of the work.' },
          { title: 'Nothing goes stale', detail: 'The plan and the code always tell the same story.' }
        ]
      }
    },
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
    flow: {
      metric: {
        es: 'Construido y desplegado en vivo, durante el evento',
        en: 'Built and deployed live, during the event'
      },
      steps: {
        es: [
          { title: 'El público entra a jugar', detail: 'Escanea un código y se suma a la trivia desde su celular.' },
          { title: 'El servidor puntúa en vivo', detail: 'Cada respuesta se guarda y se puntúa al instante.' },
          { title: 'El jurado ve los resultados', detail: 'Un ranking en pantalla grande se arma en tiempo real.' }
        ],
        en: [
          { title: 'The crowd jumps in', detail: 'They scan a code and join the quiz from their phones.' },
          { title: 'The server scores live', detail: 'Every answer is stored and scored instantly.' },
          { title: 'The jury sees the results', detail: 'A big-screen ranking builds up in real time.' }
        ]
      }
    },
    access: 'hackathon'
  }
]

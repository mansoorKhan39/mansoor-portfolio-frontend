import { CASE_STUDIES } from '../data/portfolioData'

export function buildFallbackStudy(proj) {
  const autoSlug =
    proj.slug ||
    proj._id ||
    String(proj.title || 'project')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  return {
    ...proj,
    slug: autoSlug,
    subtitle: proj.subtitle || 'Software Engineering Project',
    status: proj.status || 'Completed',
    summary: proj.description || proj.summary || '',
    overview: proj.description || proj.summary || '',
    problemDefinition: 'Project managed dynamically via the portfolio Admin dashboard.',
    solution: proj.description || 'Designed and implemented end-to-end.',
    myContribution: 'Architecture, implementation, and deployment.',
    technologySelection: (proj.techStack || []).join(', '),
    features: proj.techStack?.length
      ? [`Built with ${proj.techStack.join(', ')}`]
      : ['Custom software implementation'],
    architectureNodes: [
      {
        id: 'client',
        label: 'Client Interface',
        layer: 'Client',
        detail: 'Interactive frontend views and user workflows.',
      },
      {
        id: 'backend',
        label: 'Backend & Data Layer',
        layer: 'Backend',
        detail: 'API routes, validation, and data persistence.',
      },
    ],
    frontendArchitecture: 'Component-driven user interface.',
    backendArchitecture: 'Structured REST API and persistence layer.',
    databaseSchema: ['Managed application records.'],
    apiSample: [
      { method: 'GET', route: '/api/projects', auth: 'Public', purpose: 'Retrieve project records' },
    ],
    authAndSecurity: 'Protected admin routes and sanitized API requests.',
    dataFlow: 'Client request -> API validation -> Database persistence -> UI response.',
    implementationDecisions: 'Clean separation between UI, API routes, and storage.',
    testingStrategy: 'Manual browser and API verification.',
    debuggingChallenges: 'Payload validation and responsive state synchronization.',
    securityConsiderations: 'Environment-isolated secrets and authenticated admin mutations.',
    performanceConsiderations: 'Optimized asset loading and indexed queries.',
    limitations: ['Additional documentation can be expanded from case study config.'],
    futureImprovements: ['Expand automated test coverage.'],
  }
}

export function syncProjectsFromApi(apiList) {
  if (!Array.isArray(apiList)) return CASE_STUDIES

  const caseByTitle = new Map(CASE_STUDIES.map((cs) => [cs.title.toLowerCase(), cs]))

  const merged = apiList.map((proj) => {
    const key = String(proj.title || '').toLowerCase()
    const match =
      caseByTitle.get(key) ||
      CASE_STUDIES.find((cs) => key.includes(cs.title.toLowerCase().split(' ')[0]))

    if (match) {
      return {
        ...match,
        ...proj,
        subtitle: proj.subtitle || match.subtitle,
        status: proj.status || match.status,
        imageUrl: proj.imageUrl || match.imageUrl,
        githubUrl: proj.githubUrl !== undefined ? proj.githubUrl : match.githubUrl,
        liveUrl: proj.liveUrl !== undefined ? proj.liveUrl : match.liveUrl,
        summary: proj.description || match.summary,
      }
    }

    return buildFallbackStudy(proj)
  })

  return merged.sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

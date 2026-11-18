import exclusiveImg from '../assets/images/project_exclusive_showcase_1794853421556.jpg'
import truthpulseImg from '../assets/images/project_truthpulse_showcase_1794853421422.jpg'
import architectureImg from '../assets/images/project_architecture_showcase_1794853421550.jpg'
import fixonwayImg from '../assets/images/project_fixonway_showcase_1794857615883.jpg'
import sentimartImg from '../assets/images/project_sentimart_showcase_1794857615966.jpg'

export const PERSONAL_PROFILE = {
  name: 'Mansoor Ali Khan',
  location: 'Islamabad, Pakistan',
  university: 'COMSATS University Islamabad',
  degree: 'BS Software Engineering',
  semester: '6th Semester',
  expectedGraduation: 'January 2028',
  positioning: 'Python Backend Engineering | AI Engineering | Software Development',
  objective:
    'Building reliable backend systems, intelligent AI-powered applications, and scalable software solutions to real-world problems.',
  specialization: 'Python Backend Engineering',
  email: 'mansooralikhan1029@gmail.com',
  github: 'https://github.com/mansoorKhan39',
  linkedin: 'https://www.linkedin.com/in/mansoor-ali-khan-b27a42304',
  existingPortfolio: 'https://mansoor-portfolio-frontend-w3ek.vercel.app/',
  resumePdf: '/Mansoor_Ali_Khan_CV.pdf',
  portrait: '/mansoor.png',
}

export const ABOUT_NARRATIVE = [
  "I'm Mansoor Ali Khan, a Software Engineering student at COMSATS University Islamabad, passionate about building meaningful software products. My journey started with web development and full-stack applications, where I explored frontend technologies, backend development, databases, and API integration.",
  'Over time, my interests expanded into Python, Data Science, Machine Learning, and AI-powered software systems. I enjoy understanding how applications work internally—from system architecture and database design to APIs, authentication, testing, and deployment.',
  "Currently, I'm focusing on Python Backend Engineering while developing practical experience in AI Engineering, Cloud & DevOps, and automation. My goal is to become an engineer capable of designing, building, testing, and deploying reliable software systems.",
]

export const ENGINEERING_PHILOSOPHY = [
  {
    index: '01',
    title: 'Understand the problem deeply before writing code',
    detail: 'Clarify constraints, edge cases, and user requirements before choosing an architecture or library.',
  },
  {
    index: '02',
    title: 'Design system architecture before complex features',
    detail: 'Map data models, API boundaries, and component responsibilities upfront to avoid structural rewrites.',
  },
  {
    index: '03',
    title: 'Prefer clean, modular, and maintainable codebases',
    detail: 'Keep routes, business logic, data access, and UI concerns cleanly separated.',
  },
  {
    index: '04',
    title: 'Understand API contracts, validation, and error handling',
    detail: 'Enforce explicit request/response contracts, schema checks, and bounded failure responses.',
  },
  {
    index: '05',
    title: 'Test implementations systematically',
    detail: 'Verify critical endpoints, edge cases, and invalid input paths rather than assuming happy-path behavior.',
  },
  {
    index: '06',
    title: 'Use AI as an engineering accelerator, never a crutch',
    detail: 'Use AI tools to speed up exploration and boilerplate while retaining full ownership of system behavior.',
  },
  {
    index: '07',
    title: 'Focus on solving practical, real-world problems',
    detail: 'Prioritize grounded software utilities with clear utility over superficial demos.',
  },
]

export const ENGINEERING_PRACTICES = [
  {
    title: 'Backend Architecture',
    detail:
      'Structuring layered Express.js and FastAPI applications with clean separation between routes, business services, and persistence models.',
    tools: ['Python', 'FastAPI', 'Node.js', 'Express.js'],
  },
  {
    title: 'API Development',
    detail:
      'Designing predictable REST contracts, Pydantic/schema validation, status-code discipline, and bounded failure responses.',
    tools: ['REST APIs', 'FastAPI', 'Pydantic', 'Postman'],
  },
  {
    title: 'Database Design',
    detail:
      'Modeling multi-role user, order-splitting, and analytics schemas in MongoDB/Mongoose alongside foundational relational SQL.',
    tools: ['MongoDB', 'Mongoose', 'SQL', 'PostgreSQL (Learning)'],
  },
  {
    title: 'Authentication & Authorization',
    detail:
      'Implementing stateless JWT Bearer sessions, Google OAuth verification, hashed credentials, and route-level Role-Based Access Control.',
    tools: ['JWT', 'Google OAuth', 'RBAC', 'bcryptjs'],
  },
  {
    title: 'AI Integration & RAG',
    detail:
      'Building server-side Gemini API workflows with repository parsing, deterministic citation verification, and NLTK/VADER/TextBlob NLP pipelines.',
    tools: ['Gemini API', 'Repository Parsing', 'NLTK', 'VADER'],
  },
  {
    title: 'Testing & Debugging',
    detail:
      'Verifying role boundaries via Postman collections, validating citation/dataset edge cases, and testing upstream API error handling.',
    tools: ['Postman', 'Edge-Case Verification', 'Fault Handling'],
  },
  {
    title: 'Deployment & Workflow',
    detail:
      'Shipping full-stack web apps with Git/GitHub version control, Docker container setups, and Vercel cloud deployments while studying CI/CD pipelines.',
    tools: ['Git & GitHub', 'Docker', 'Vercel', 'CI/CD (Learning)'],
  },
]

export const WHAT_I_DO_TRACKS = [
  {
    id: 'backend-ai',
    title: 'BACKEND & AI',
    subtitle: 'Python APIs, Auth & Grounded AI',
    description:
      'Architecting structured REST backends, role-based access control, repository parsers, and deterministic citation/NLP validation workflows.',
    tools: [
      'Python',
      'FastAPI',
      'Node.js',
      'Express.js',
      'MongoDB',
      'PostgreSQL',
      'JWT & RBAC',
      'Gemini API',
      'RAG Concepts',
    ],
  },
  {
    id: 'fullstack-data',
    title: 'FULL-STACK & DATA',
    subtitle: 'Web Interfaces, Mobile & NLP Pipelines',
    description:
      'Building multi-role React storefronts, Flutter mobile clients, and reproducible Pandas/NLTK sentiment and exploratory data pipelines.',
    tools: [
      'React.js',
      'Tailwind CSS',
      'Flutter & Dart',
      'NLTK & VADER',
      'Pandas & NumPy',
      'Scikit-learn',
      'Docker',
      'Postman',
      'Vercel',
    ],
  },
]

export const JOURNEY_MILESTONES = [
  {
    period: '2024',
    role: 'Software Engineering Foundation & Full-Stack Systems',
    org: 'COMSATS · FixOnWay & Exclusive E-Commerce',
    description:
      'Commenced formal software engineering journey. Mastered core algorithms and database systems while architecting practical multi-role MERN and Flutter applications with JWT/OAuth, RBAC route security, and Docker containerization.',
  },
  {
    period: '2025',
    role: 'AI, NLP & Analytics Pipelines',
    org: 'TruthPulse, CodeMind AI & SentiMart',
    description:
      'Processed 44,898 news articles and 160,000 tweets with NLTK/VADER, authored SRS v1.4 multi-seller specs, and began building FastAPI + Gemini citation-checked code Q&A.',
  },
  {
    period: 'NOW',
    role: 'Python Backend & AI Engineering Focus',
    org: '6th Semester · Expected Grad Jan 2028',
    description:
      'Deepening Python Backend Engineering with FastAPI, PostgreSQL, distributed systems, automated testing, containerization, and Cloud/DevOps practices.',
  },
]

export const SKILL_CATEGORIES = [
  {
    category: 'Programming',
    items: [
      {
        name: 'Python',
        tier: 'Actively Used',
        context:
          'Primary backend and data language used for FastAPI orchestration, repository parsing, NLP sentiment pipelines, and Jupyter EDA workflows.',
        appliedIn: ['CodeMind AI', 'TruthPulse', 'SentiMart (NLP)', 'DataSK'],
      },
      {
        name: 'JavaScript',
        tier: 'Actively Used',
        context:
          'Core full-stack language for Express REST APIs, async middleware, React interfaces, and client-server data contracts.',
        appliedIn: ['FixOnWay', 'Exclusive E-Commerce', 'TruthPulse', 'SentiMart'],
      },
    ],
  },
  {
    category: 'Backend',
    items: [
      {
        name: 'Node.js',
        tier: 'Actively Used',
        context:
          'Used to build modular server runtimes, environment-isolated API services, and multi-role backend applications.',
        appliedIn: ['FixOnWay', 'Exclusive E-Commerce', 'SentiMart', 'TruthPulse'],
      },
      {
        name: 'Express.js',
        tier: 'Actively Used',
        context:
          'Structured layered routes, JWT/RBAC middleware guards, validation checks, and commerce order-splitting endpoints.',
        appliedIn: ['FixOnWay', 'Exclusive E-Commerce', 'SentiMart', 'TruthPulse'],
      },
      {
        name: 'REST API Development',
        tier: 'Actively Used',
        context:
          'Designed predictable endpoint contracts, query/filter parameters, HTTP status semantics, and bounded error responses.',
        appliedIn: ['FixOnWay', 'Exclusive E-Commerce', 'CodeMind AI'],
      },
      {
        name: 'FastAPI',
        tier: 'Currently Learning',
        context:
          'Building async Python endpoints with Pydantic validation for repository ingestion, Gemini Q&A, and decoupled NLP scoring services.',
        appliedIn: ['CodeMind AI', 'SentiMart (NLP)'],
      },
    ],
  },
  {
    category: 'Frontend',
    items: [
      {
        name: 'React.js',
        tier: 'Actively Used',
        context:
          'Built component-driven storefronts, role-protected dashboards, Recharts analytics views, and interactive system showcases.',
        appliedIn: ['Exclusive E-Commerce', 'TruthPulse', 'SentiMart'],
      },
      {
        name: 'HTML5',
        tier: 'Actively Used',
        context:
          'Semantic document structure, accessible form landmarks, and clean keyboard-navigable layouts across web projects.',
        appliedIn: ['Exclusive E-Commerce', 'TruthPulse'],
      },
      {
        name: 'CSS3',
        tier: 'Actively Used',
        context:
          'Custom properties, responsive grid/flexbox layouts, reduced-motion media queries, and high-contrast theming tokens.',
        appliedIn: ['Exclusive E-Commerce', 'TruthPulse', 'Portfolio UI'],
      },
      {
        name: 'Tailwind CSS',
        tier: 'Actively Used',
        context:
          'Utility-first design systems for responsive multi-device layouts, dark-surface hierarchy, and rapid UI iteration.',
        appliedIn: ['SentiMart', 'Portfolio UI'],
      },
    ],
  },
  {
    category: 'Databases',
    items: [
      {
        name: 'MongoDB',
        tier: 'Actively Used',
        context:
          'Modeled multi-role user accounts, service requests, split sub-orders, and pre-aggregated NLP analytics collections in Atlas.',
        appliedIn: ['FixOnWay', 'Exclusive E-Commerce', 'TruthPulse', 'SentiMart'],
      },
      {
        name: 'Mongoose',
        tier: 'Actively Used',
        context:
          'Defined schema validation, document references, indexed query fields, and structured persistence models in Express APIs.',
        appliedIn: ['FixOnWay', 'Exclusive E-Commerce', 'SentiMart'],
      },
      {
        name: 'SQL',
        tier: 'Working Knowledge',
        context:
          'Relational schema normalization, joins, constraints, and structured querying practiced through COMSATS Database Systems coursework.',
        appliedIn: ['COMSATS Database Systems'],
      },
      {
        name: 'PostgreSQL',
        tier: 'Currently Learning',
        context:
          'Studying relational modeling, indexing, and production-grade Python backend persistence as part of the core backend roadmap.',
        appliedIn: ['Python Backend Track'],
      },
    ],
  },
  {
    category: 'Python & Data Science',
    items: [
      {
        name: 'NumPy',
        tier: 'Working Knowledge',
        context:
          'Vectorized array operations and numerical summary calculations across structured exploratory notebooks.',
        appliedIn: ['DataSK Notebooks', 'TruthPulse'],
      },
      {
        name: 'Pandas',
        tier: 'Working Knowledge',
        context:
          'Tabular dataframe loading, missing-value audits, column transformations, and grouping across large CSV corpora.',
        appliedIn: ['DataSK Notebooks', 'TruthPulse'],
      },
      {
        name: 'Matplotlib',
        tier: 'Working Knowledge',
        context:
          'Rendered distribution histograms, trend plots, and figure exports to inspect cleaned dataset behavior.',
        appliedIn: ['DataSK Notebooks'],
      },
      {
        name: 'Seaborn',
        tier: 'Working Knowledge',
        context:
          'Created statistical pair plots, boxplots, and correlation heatmaps during exploratory data diagnostics.',
        appliedIn: ['DataSK Notebooks'],
      },
      {
        name: 'Data Cleaning',
        tier: 'Working Knowledge',
        context:
          'Handled noisy social text, duplicate entries, missing attributes, and inconsistent dtypes prior to analysis.',
        appliedIn: ['DataSK Notebooks', 'TruthPulse'],
      },
      {
        name: 'Exploratory Data Analysis',
        tier: 'Working Knowledge',
        context:
          'Audited dataset shapes, distribution skew, and feature correlations before selecting modeling baselines.',
        appliedIn: ['DataSK Notebooks'],
      },
    ],
  },
  {
    category: 'Machine Learning',
    items: [
      {
        name: 'Scikit-learn',
        tier: 'Working Knowledge',
        context:
          'Practiced train/test splits, feature preprocessing, and classical classification/regression workflows in Python.',
        appliedIn: ['ML Practice & Coursework'],
      },
      {
        name: 'Linear Regression',
        tier: 'Working Knowledge',
        context:
          'Implemented continuous target prediction baselines and evaluated residual fit on structured practice datasets.',
        appliedIn: ['ML Practice & Coursework'],
      },
      {
        name: 'Logistic Regression',
        tier: 'Working Knowledge',
        context:
          'Applied binary classification pipelines and evaluated decision boundaries on labeled tabular exercises.',
        appliedIn: ['ML Practice & Coursework'],
      },
      {
        name: 'Naive Bayes',
        tier: 'Working Knowledge',
        context:
          'Explored probabilistic text and feature classification baselines for spam and news credibility experiments.',
        appliedIn: ['ML Practice & Coursework'],
      },
    ],
  },
  {
    category: 'AI & NLP',
    items: [
      {
        name: 'Gemini API',
        tier: 'Working Knowledge',
        context:
          'Integrated server-side code reasoning workflows paired with repository context assembly and bounded failure handling.',
        appliedIn: ['CodeMind AI'],
      },
      {
        name: 'NLTK',
        tier: 'Working Knowledge',
        context:
          'Used for tokenization, stopword removal, and text normalization across 44,898 news articles and 160,000 tweets.',
        appliedIn: ['TruthPulse'],
      },
      {
        name: 'VADER',
        tier: 'Working Knowledge',
        context:
          'Computed compound social sentiment polarity scores over large-scale tweet corpora prior to MongoDB persistence.',
        appliedIn: ['TruthPulse'],
      },
      {
        name: 'TextBlob',
        tier: 'Working Knowledge',
        context:
          'Evaluated polarity and subjectivity metrics alongside VADER to cross-check dataset sentiment distributions.',
        appliedIn: ['TruthPulse'],
      },
      {
        name: 'AI-Powered App Development',
        tier: 'Working Knowledge',
        context:
          'Connecting deterministic validation layers, prompt scoping, and microservice boundaries around LLM/NLP outputs.',
        appliedIn: ['CodeMind AI', 'SentiMart'],
      },
      {
        name: 'RAG Concepts',
        tier: 'Currently Learning',
        context:
          'Studying repository chunking, citation verification against indexed manifests, and semantic vector retrieval patterns.',
        appliedIn: ['CodeMind AI'],
      },
    ],
  },
  {
    category: 'Auth & Security',
    items: [
      {
        name: 'JWT',
        tier: 'Actively Used',
        context:
          'Issued and verified stateless Bearer tokens carrying role claims across web storefronts and Flutter mobile clients.',
        appliedIn: ['FixOnWay', 'Exclusive E-Commerce', 'SentiMart'],
      },
      {
        name: 'Google OAuth',
        tier: 'Actively Used',
        context:
          'Implemented Google sign-in token verification exchanging verified user profiles for application-scoped JWT sessions.',
        appliedIn: ['Exclusive E-Commerce'],
      },
      {
        name: 'Role-Based Access Control (RBAC)',
        tier: 'Actively Used',
        context:
          'Enforced route-level middleware separating Customer, Mechanic, Seller, Buyer, and Admin permissions.',
        appliedIn: ['FixOnWay', 'Exclusive E-Commerce', 'SentiMart'],
      },
    ],
  },
  {
    category: 'Mobile',
    items: [
      {
        name: 'Flutter',
        tier: 'Working Knowledge',
        context:
          'Built role-specific mobile screens, OpenStreetMap pin selection, and polling-based job/chat synchronization.',
        appliedIn: ['FixOnWay'],
      },
      {
        name: 'Dart',
        tier: 'Working Knowledge',
        context:
          'Wrote async REST API clients, typed model serialization, and state controllers for cross-platform mobile workflows.',
        appliedIn: ['FixOnWay'],
      },
    ],
  },
  {
    category: 'Tools & DevOps',
    items: [
      {
        name: 'Git',
        tier: 'Actively Used',
        context:
          'Daily branching, clean commit history, and version control across backend, frontend, and notebook repositories.',
        appliedIn: ['All Projects'],
      },
      {
        name: 'GitHub',
        tier: 'Actively Used',
        context:
          'Hosting project repositories, tracking codebase structure, and managing deployment-linked branches.',
        appliedIn: ['All Projects'],
      },
      {
        name: 'VS Code',
        tier: 'Actively Used',
        context:
          'Primary IDE configured for Python virtual environments, Node.js debugging, and full-stack React development.',
        appliedIn: ['Daily Engineering Workflow'],
      },
      {
        name: 'Postman',
        tier: 'Actively Used',
        context:
          'Tested multi-role auth headers, payload validation edge cases, and REST error responses prior to UI wiring.',
        appliedIn: ['FixOnWay', 'Exclusive E-Commerce', 'CodeMind AI'],
      },
      {
        name: 'Jupyter Notebook',
        tier: 'Actively Used',
        context:
          'Documented reproducible Pandas cleaning steps, statistical diagnostics, and inline Matplotlib/Seaborn visualizations.',
        appliedIn: ['DataSK Notebooks', 'TruthPulse'],
      },
      {
        name: 'Vercel',
        tier: 'Actively Used',
        context:
          'Deployed live frontend builds and environment-configured web previews for portfolio and commerce applications.',
        appliedIn: ['Exclusive E-Commerce', 'TruthPulse'],
      },
      {
        name: 'Docker',
        tier: 'Working Knowledge',
        context:
          'Containerized local backend and full-stack environments to keep dependencies consistent across machines.',
        appliedIn: ['Exclusive E-Commerce', 'Backend Containers'],
      },
    ],
  },
]

export const CAREER_ROADMAP = {
  core: {
    title: 'Core Specialization — Python Backend Engineering',
    label: 'Primary Direction',
    description:
      'Long-term engineering focus centered on designing reliable server-side architectures, clean API contracts, relational data modeling, and secure production deployments.',
    topics: [
      'Python',
      'FastAPI',
      'Django',
      'PostgreSQL',
      'REST APIs',
      'Authentication & Authorization',
      'Automated Testing',
      'Software Architecture',
      'Backend Security',
      'Performance & Scalability',
    ],
  },
  supporting: [
    {
      title: 'AI Engineering',
      stage: 'Supporting Track',
      topics: ['LLMs', 'Gemini & AI APIs', 'RAG Pipelines', 'Vector Embeddings', 'AI Agents'],
    },
    {
      title: 'Cloud & DevOps',
      stage: 'Supporting Track',
      topics: ['Linux', 'Docker', 'AWS / Azure', 'CI/CD Pipelines', 'Kubernetes Fundamentals'],
    },
    {
      title: 'Automation',
      stage: 'Supporting Track',
      topics: ['Python Scripting', 'n8n', 'API Integrations', 'Business Workflow Automation'],
    },
    {
      title: 'Frontend',
      stage: 'Supporting Track',
      topics: ['React', 'JavaScript', 'Tailwind CSS'],
    },
  ],
  engineeringRoadmap: {
    title: 'Cloud & Distributed Systems Roadmap',
    stages: [
      { level: 'Phase 1', label: 'Docker & Containerization', status: 'In Progress' },
      { level: 'Phase 2', label: 'CI/CD Pipelines & Redis Caching', status: 'Planned' },
      { level: 'Phase 3', label: 'Distributed Systems & Orchestration', status: 'Target Milestone' },
    ],
  },
}

export const EDUCATION_INFO = {
  degree: 'Bachelor of Science in Software Engineering',
  institution: 'COMSATS University Islamabad',
  semester: '6th Semester',
  expectedGraduation: 'January 2028',
  location: 'Islamabad, Pakistan',
  coursework: [
    'Data Structures & Algorithms',
    'Database Systems',
    'Operating Systems',
    'Linear Algebra',
    'Software Requirements Engineering',
    'Software Construction & Development',
    'Computer Networks',
  ],
}

export const OPEN_OPPORTUNITIES = [
  'Junior Python Backend Developer',
  'Junior Software Engineer',
  'Backend Engineering Intern',
  'AI Engineering Intern',
  'Remote Development Roles',
  'Flexible Part-Time Engineering Roles',
  'Technical Collaborations',
]

export const CASE_STUDIES = [
  {
    _id: 'case-fixonway',
    slug: 'fixonway',
    title: 'FixOnWay',
    subtitle: 'Roadside Assistance & Mechanic Discovery Platform',
    status: 'Completed',
    summary:
      'On-demand roadside assistance connecting drivers with verified mechanics.',
    techStack: ['Flutter', 'Dart', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose', 'JWT', 'OpenStreetMap', 'Geolocation'],
    githubUrl: '',
    liveUrl: '',
    imageUrl: fixonwayImg,
    featured: true,
    order: 1,
    overview:
      'FixOnWay bridges stranded drivers and local roadside mechanics in Pakistan through a three-role platform (Customer, Mechanic, Admin) built with Flutter on mobile and Node.js/Express + MongoDB Atlas on the backend.',
    problemDefinition:
      'Drivers experiencing roadside breakdowns face delays finding verified, nearby mechanics and lack transparent cost estimates or structured status updates before dispatch.',
    solution:
      'Implemented a location-aware request workflow using device geolocation and OpenStreetMap coordinates to match customers with nearby verified mechanics, exchange estimates, and coordinate service jobs via structured REST APIs.',
    myContribution:
      'Designed the multi-role backend APIs, Mongoose data models, JWT role-based authentication, geolocation discovery queries, polling-based job/chat synchronization, and admin verification workflows.',
    technologySelection:
      'Flutter & Dart for cross-platform mobile UI; Node.js, Express.js & Mongoose on MongoDB Atlas for flexible geospatial/service schemas; JWT for stateless mobile auth; OpenStreetMap to avoid paid map quota lock-in.',
    features: [
      'Multi-role workflows for Customer, Mechanic, and Admin',
      'Geolocation-based nearby mechanic discovery with OpenStreetMap',
      'Roadside service request creation and mechanic cost estimation',
      'Job lifecycle status tracking and HTTP-polling chat functionality',
      'User and mechanic identity verification with admin moderation panel',
    ],
    architectureNodes: [
      {
        id: 'mobile-client',
        label: 'Flutter Mobile Client',
        layer: 'Client',
        detail: 'Role-tailored views for Customers, Mechanics, and Admin with OpenStreetMap coordinate selection.',
      },
      {
        id: 'api-gateway',
        label: 'Express REST API + JWT RBAC',
        layer: 'Backend',
        detail: 'Handles auth, role guards, request validation, mechanic discovery, and polling endpoints.',
      },
      {
        id: 'mongo-atlas',
        label: 'MongoDB Atlas (Mongoose)',
        layer: 'Database',
        detail: 'Stores users, mechanic verification profiles, service jobs, estimates, and chat messages.',
      },
      {
        id: 'osm',
        label: 'OpenStreetMap & Geolocation',
        layer: 'External',
        detail: 'Provides map tiles and coordinate distance resolution for nearby mechanic lookup.',
      },
    ],
    frontendArchitecture:
      'Modular Flutter screens separated by authenticated user role, state controllers for periodic job/chat polling, and map pin placement.',
    backendArchitecture:
      'Layered Express routes with middleware-enforced JWT role checks separating customer request creation, mechanic acceptance/estimates, and admin verification.',
    databaseSchema: [
      'Users { _id, name, phone/email, passwordHash, role: customer|mechanic|admin, verified }',
      'MechanicProfiles { userId, location: { lat, lng }, skills[], availability, verificationDocs }',
      'ServiceRequests { customerId, mechanicId, coordinates, issueType, estimatedCost, status }',
      'Messages { requestId, senderId, text, createdAt }',
    ],
    apiSample: [
      { method: 'POST', route: '/api/auth/login', auth: 'Public', purpose: 'Authenticate user and issue role-scoped JWT' },
      { method: 'GET', route: '/api/mechanics/nearby?lat=&lng=', auth: 'Customer', purpose: 'Query verified nearby mechanics' },
      { method: 'POST', route: '/api/requests', auth: 'Customer', purpose: 'Create roadside assistance job request' },
      { method: 'PATCH', route: '/api/requests/:id/estimate', auth: 'Mechanic', purpose: 'Submit cost estimate & accept job' },
      { method: 'GET', route: '/api/requests/:id/messages', auth: 'Participant', purpose: 'Poll job chat & status updates' },
    ],
    authAndSecurity:
      'Stateless JWT Bearer tokens carrying user ID and role claims, password hashing, and route-level RBAC middleware preventing customers or unverified mechanics from calling privileged actions.',
    dataFlow:
      'Customer captures GPS coordinates -> Backend queries verified mechanics within radius -> Mechanic submits estimate -> Customer confirms -> Client polls job status & messages until completion.',
    implementationDecisions:
      'Selected HTTP polling for chat and job tracking to keep deployment simple on stateless hosting without maintaining persistent WebSocket server state.',
    testingStrategy:
      'Manual Postman collection verification across Customer, Mechanic, and Admin role boundaries, edge-case checks for unauthorized role access, and end-to-end emulator walkthroughs.',
    debuggingChallenges:
      'Synchronizing polling intervals without overlapping stale responses when switching active jobs, and normalizing coordinate formats between Flutter geolocation plugins and MongoDB queries.',
    securityConsiderations:
      'Strict role verification on estimate updates and admin verification routes; sanitized user input before Mongoose queries.',
    performanceConsiderations:
      'Scoped polling payloads to fetch only active request updates and indexed status/location fields for faster lookup.',
    limitations: [
      'Payments are simulated (no real payment gateway integrated).',
      'Chat and job tracking rely on HTTP polling rather than WebSockets.',
    ],
    futureImprovements: [
      'Migrate chat and live tracking from HTTP polling to WebSockets (Socket.IO).',
      'Integrate a real local payment gateway after sandbox and compliance testing.',
    ],
  },
  {
    _id: 'case-codemind-ai',
    slug: 'codemind-ai',
    title: 'CodeMind AI',
    subtitle: 'AI-Powered Codebase Understanding Assistant',
    status: 'In Progress',
    summary:
      'An AI-powered codebase understanding assistant allowing developers to upload repositories and query codebases using natural language.',
    techStack: ['Python', 'FastAPI', 'Gemini API', 'Repository Parsing', 'RAG Techniques'],
    githubUrl: '',
    liveUrl: '',
    imageUrl: architectureImg,
    featured: true,
    order: 2,
    overview:
      'CodeMind AI is an actively developing Python/FastAPI engineering tool built to help developers inspect unfamiliar repositories by uploading source files and asking grounded natural-language questions.',
    problemDefinition:
      'Navigating an unfamiliar codebase requires tedious manual file hopping, while raw LLM prompts frequently hallucinate file paths, symbol names, or non-existent functions.',
    solution:
      'Built a FastAPI ingestion pipeline that parses uploaded repository structures, feeds scoped code context to the Gemini API, extracts automated code citations, and validates every citation against actual indexed files.',
    myContribution:
      'Implementing the FastAPI backend endpoints, repository ingestion/parsing pipeline, Gemini API integration, citation verification layer, and bounded error handling.',
    technologySelection:
      'Python & FastAPI for fast async API development and clean Pydantic validation; Gemini API for long-context code reasoning; deterministic validation logic to catch hallucinated references.',
    features: [
      'File and repository upload with structured directory analysis',
      'AI-powered code Q&A chat grounded in repository context',
      'Automated code citations referencing file paths and snippets',
      'Citation validation layer that flags invalid or hallucinated citations',
      'Bounded error handling for Gemini API service failures and rate limits',
    ],
    architectureNodes: [
      {
        id: 'upload-ui',
        label: 'Upload & Chat Interface',
        layer: 'Client',
        detail: 'Allows developers to upload source files/repositories and inspect grounded answers with warnings.',
      },
      {
        id: 'fastapi-core',
        label: 'FastAPI Orchestrator',
        layer: 'Backend',
        detail: 'Handles multipart uploads, repository tree extraction, prompt assembly, and bounded error boundaries.',
      },
      {
        id: 'citation-validator',
        label: 'Citation Validation Layer',
        layer: 'Verification',
        detail: 'Cross-checks every AI-cited file path and snippet against the actual uploaded repository manifest.',
      },
      {
        id: 'gemini',
        label: 'Gemini API',
        layer: 'AI Model',
        detail: 'Generates architectural explanations and symbol-level answers from retrieved repository context.',
      },
    ],
    frontendArchitecture:
      'Developer-focused Q&A workspace displaying repository tree context, cited code snippets, and explicit warning banners whenever citation validation fails.',
    backendArchitecture:
      'Async FastAPI service with structured request/response schemas, file extension filtering, context chunking, and post-generation verification.',
    databaseSchema: [
      'SessionWorkspace { sessionId, uploadedFiles[], treeSummary, createdAt }',
      'IndexedChunk { filePath, startLine, endLine, contentHash, text }',
      'ChatTurn { sessionId, question, answer, citations[], validationWarnings[] }',
    ],
    apiSample: [
      { method: 'POST', route: '/api/repos/upload', auth: 'Session', purpose: 'Ingest files and parse repository structure' },
      { method: 'GET', route: '/api/repos/:id/structure', auth: 'Session', purpose: 'Return analyzed file tree and metadata' },
      { method: 'POST', route: '/api/chat/query', auth: 'Session', purpose: 'Run grounded Gemini Q&A + citation validation' },
    ],
    authAndSecurity:
      'Input size caps, safe file-path sanitization against directory traversal during uploads, and server-side Gemini API key isolation.',
    dataFlow:
      'Developer uploads repo -> FastAPI filters & indexes files -> Query selects relevant context -> Gemini generates answer with citations -> Citation validator checks file existence -> Response returns with any warnings.',
    implementationDecisions:
      'Added an explicit deterministic citation validation pass after LLM generation rather than trusting model citations blindly.',
    testingStrategy:
      'Tested upload parsing, malformed/invalid citation detection triggers, and simulated Gemini API failure/timeout scenarios to confirm bounded error responses.',
    debuggingChallenges:
      'Handling inconsistent citation formatting from LLM outputs and ensuring Gemini API failures surface clear, bounded error messages instead of crashing request handlers.',
    securityConsiderations:
      'Restricting allowed file types, enforcing upload size bounds, and isolating secret API keys strictly on the backend.',
    performanceConsiderations:
      'Skipping binary assets, build directories, and `node_modules` during repository parsing to keep context windows lean.',
    limitations: [
      'Actively under development; large multi-thousand-file repositories and full vector-store persistence are still evolving.',
    ],
    futureImprovements: [
      'Add persistent vector embeddings for semantic retrieval across much larger repositories.',
      'Support direct GitHub URL cloning and AST-level symbol graph indexing.',
    ],
  },
  {
    _id: 'case-sentimart',
    slug: 'sentimart',
    title: 'SentiMart',
    subtitle: 'Multi-Seller Marketplace & Review Analytics Platform',
    status: 'In Progress',
    summary:
      'A multi-seller e-commerce marketplace featuring seller workflows and intelligent review analytics (Designed to SRS v1.4).',
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'FastAPI (NLP)'],
    githubUrl: '',
    liveUrl: '',
    imageUrl: sentimartImg,
    featured: true,
    order: 3,
    overview:
      'SentiMart is an in-progress full-stack platform designed against Software Requirements Specification (SRS v1.4) combining multi-vendor marketplace workflows with FastAPI-based NLP review sentiment and spam analytics.',
    problemDefinition:
      'Standard e-commerce marketplaces mix items from multiple vendors without clear order splitting or automated filtering for fake/spam product reviews.',
    solution:
      'Architected a hybrid Node.js/Express core marketplace paired with FastAPI NLP microservices to score review sentiment and detect suspicious review patterns.',
    myContribution:
      'Authored SRS v1.4 system specifications, defined multi-seller database schemas and order-splitting logic, and building core frontend/backend modules alongside NLP microservice integration.',
    technologySelection:
      'React + Tailwind CSS for storefront and dashboards; Node.js/Express + MongoDB for multi-seller commerce APIs; Python FastAPI for isolating NLP sentiment and spam scoring.',
    features: [
      'SRS v1.4 Scope: Multi-seller architecture with seller registration and admin approval',
      'SRS v1.4 Scope: Product catalog, cart, wishlist, and multi-seller order splitting',
      'SRS v1.4 Scope: Automated NLP sentiment analysis and review spam detection',
      'SRS v1.4 Scope: Seller performance and admin platform analytics dashboards',
    ],
    architectureNodes: [
      {
        id: 'storefront',
        label: 'React Storefront & Dashboards',
        layer: 'Client',
        detail: 'Separate buyer shopping flows, seller inventory portals, and admin approval views.',
      },
      {
        id: 'core-api',
        label: 'Express Commerce API',
        layer: 'Backend',
        detail: 'Manages auth, vendor approvals, catalog, cart, and multi-seller order splitting.',
      },
      {
        id: 'nlp-service',
        label: 'FastAPI NLP Microservice',
        layer: 'AI / NLP',
        detail: 'Evaluates incoming product reviews for sentiment polarity and spam indicators.',
      },
      {
        id: 'mongo-db',
        label: 'MongoDB',
        layer: 'Database',
        detail: 'Stores vendors, products, split sub-orders, and annotated review analytics.',
      },
    ],
    frontendArchitecture:
      'Role-separated React views for buyers, sellers, and administrators backed by Tailwind CSS utility layouts.',
    backendArchitecture:
      'Decoupled Express commerce gateway coordinating transactional state in MongoDB while delegating text classification to Python FastAPI.',
    databaseSchema: [
      'Sellers { userId, storeName, approvalStatus: pending|approved|rejected }',
      'Products { sellerId, title, price, stock, category, avgSentimentScore }',
      'Orders { buyerId, totalAmount, subOrders: [{ sellerId, items[], status }] }',
      'Reviews { productId, userId, rating, text, sentimentLabel, spamFlag }',
    ],
    apiSample: [
      { method: 'POST', route: '/api/sellers/apply', auth: 'User', purpose: 'Submit seller onboarding request (SRS v1.4)' },
      { method: 'POST', route: '/api/orders', auth: 'Buyer', purpose: 'Create parent order and split into per-seller sub-orders' },
      { method: 'POST', route: '/nlp/analyze-review', auth: 'Internal', purpose: 'FastAPI sentiment & spam classification' },
    ],
    authAndSecurity:
      'JWT authentication with RBAC guards isolating buyer actions, approved-seller inventory routes, and admin moderation endpoints.',
    dataFlow:
      'Buyer checks out multi-vendor cart -> Express splits order into seller sub-orders -> Buyer posts review -> Express forwards text to FastAPI NLP -> Annotated score saved to MongoDB.',
    implementationDecisions:
      'Separated NLP workloads into FastAPI instead of running Python child processes inside Node.js so both services stay clean and independently testable.',
    testingStrategy:
      'Incremental endpoint testing via Postman and SRS traceability checks as each module moves from specification into working code.',
    debuggingChallenges:
      'Designing clean parent/child order status transitions when one seller ships an item while another seller sub-order is still pending.',
    securityConsiderations:
      'Preventing unapproved sellers from publishing products and isolating internal FastAPI NLP endpoints.',
    performanceConsiderations:
      'Decoupling review NLP analysis from blocking critical checkout operations.',
    limitations: [
      'Currently in active development: several SRS v1.4 workflows (full payment settlement and advanced spam models) remain under implementation.',
    ],
    futureImprovements: [
      'Complete remaining SRS v1.4 seller analytics modules and automated integration tests across Node and FastAPI services.',
    ],
  },
  {
    _id: 'case-truthpulse',
    slug: 'truthpulse',
    title: 'TruthPulse',
    subtitle: 'Fake News Detection & Sentiment Analysis Dashboard',
    status: 'Completed',
    summary:
      'A fake news detection and public sentiment analysis dashboard built across 44,898 news articles and 160,000 tweets.',
    techStack: ['React', 'Node.js', 'Express', 'Python', 'NLTK', 'VADER', 'TextBlob', 'MongoDB', 'Recharts'],
    githubUrl: 'https://github.com/mansoorKhan39/truthpulse',
    liveUrl: 'https://truthpulse-aymd.vercel.app',
    imageUrl: truthpulseImg,
    featured: true,
    order: 4,
    overview:
      'TruthPulse combines a Python NLP preprocessing and sentiment scoring pipeline with a MERN stack web dashboard to surface credibility and public sentiment trends across large text datasets.',
    problemDefinition:
      'Raw news and social datasets are too large and noisy to manually gauge misinformation patterns or public sentiment polarity shifts.',
    solution:
      'Processed 44,898 news articles and 160,000 tweets with NLTK, VADER, and TextBlob, persisted structured scoring results in MongoDB, and visualized insights through Recharts.',
    myContribution:
      'Built the Python text cleaning and VADER/TextBlob sentiment scoring workflow, Express REST endpoints, MongoDB persistence, and interactive React + Recharts analytics views.',
    technologySelection:
      'Python with NLTK, VADER & TextBlob for reliable lexicon-based sentiment scoring and tokenization; MongoDB for flexible document storage; Recharts for responsive browser charts.',
    features: [
      'NLP preprocessing and analysis over 44,898 news articles',
      'Sentiment scoring pipeline across 160,000 tweets using VADER & TextBlob',
      'Interactive React dashboard with Recharts visualizations',
      'REST API & MongoDB integration serving aggregated insights',
    ],
    architectureNodes: [
      {
        id: 'python-nlp',
        label: 'Python NLP Pipeline',
        layer: 'Data / ML',
        detail: 'Cleans text with NLTK and computes VADER/TextBlob polarity across articles and tweets.',
      },
      {
        id: 'mongo-store',
        label: 'MongoDB Database',
        layer: 'Database',
        detail: 'Stores processed article classifications, tweet sentiment scores, and topic aggregates.',
      },
      {
        id: 'express-api',
        label: 'Node.js & Express API',
        layer: 'Backend',
        detail: 'Queries and aggregates processed metrics into chart-ready JSON endpoints.',
      },
      {
        id: 'react-recharts',
        label: 'React + Recharts UI',
        layer: 'Client',
        detail: 'Renders interactive distribution, polarity, and trend charts.',
      },
    ],
    frontendArchitecture:
      'React dashboard views powered by Recharts with filterable chart panels and responsive metric cards.',
    backendArchitecture:
      'Express REST routes querying pre-scored MongoDB collections and returning aggregated distribution payloads.',
    databaseSchema: [
      'NewsArticles { title, category, label: real|fake, sentimentScore, publishedDate }',
      'TweetSentiments { textHash, polarity, subjectivity, compoundScore, sentimentLabel }',
    ],
    apiSample: [
      { method: 'GET', route: '/api/analytics/overview', auth: 'Public', purpose: 'Return aggregated news & tweet sentiment totals' },
      { method: 'GET', route: '/api/analytics/news', auth: 'Public', purpose: 'Fetch real vs fake news distribution breakdowns' },
    ],
    authAndSecurity:
      'Read-focused public analytics API with server-side aggregation so raw database credentials remain protected.',
    dataFlow:
      'CSV datasets -> Python NLTK cleaning + VADER/TextBlob scoring -> Bulk insert to MongoDB -> Express aggregation -> React Recharts rendering.',
    implementationDecisions:
      'Pre-computed batch sentiment scores in Python before persisting to MongoDB so interactive dashboard queries respond rapidly without re-running NLP on every page load.',
    testingStrategy:
      'Validated dataset row counts, checked VADER/TextBlob score distributions on sample texts, and verified API responses in browser and Postman.',
    debuggingChallenges:
      'Cleaning noisy social text (URLs, mentions, encoding artifacts) in the 160k-tweet corpus before feeding into NLTK tokenizers.',
    securityConsiderations:
      'Read-only public routes with CORS restrictions and environment-protected MongoDB Atlas URIs.',
    performanceConsiderations:
      'Batch preprocessing + pre-aggregated summary queries prevent heavy browser or API CPU spikes.',
    limitations: [
      'Lexicon-based sentiment (VADER/TextBlob) can miss deep sarcasm or context-dependent nuances compared to fine-tuned transformers.',
    ],
    futureImprovements: [
      'Benchmark transformer-based classifiers alongside existing VADER/TextBlob baselines.',
    ],
  },
  {
    _id: 'case-exclusive',
    slug: 'exclusive-ecommerce',
    title: 'Exclusive E-Commerce',
    subtitle: 'Full-Stack MERN E-Commerce Platform',
    status: 'Completed',
    summary:
      'A full-stack MERN e-commerce web application with JWT & Google OAuth, RBAC admin management, flash sales, and Docker support.',
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Google OAuth', 'Docker'],
    githubUrl: 'https://github.com/mansoorKhan39/Exclusive-Ecommerce',
    liveUrl: 'https://exclusive-ecommerce-maah.vercel.app',
    imageUrl: exclusiveImg,
    featured: true,
    order: 5,
    overview:
      'Exclusive is a full-stack MERN e-commerce web application built end-to-end with authentication, protected user/admin routes, cart & wishlist persistence, flash sale countdowns, coupons, and containerized setup.',
    problemDefinition:
      'Building a complete commerce workflow requires coordinating secure multi-method authentication, inventory accuracy, promotional pricing, and administrative oversight cleanly.',
    solution:
      'Implemented a modular MERN architecture supporting email/JWT + Google OAuth sign-in, protected RBAC admin dashboards, coupon/flash-sale logic, and Docker configuration.',
    myContribution:
      'Developed the React storefront & admin UI, Express REST endpoints, Mongoose models, JWT & Google OAuth authentication flow, and Docker setup.',
    technologySelection:
      'MERN stack for unified JavaScript development across UI and API; JWT + Google OAuth for flexible user login; Docker for reproducible local setup.',
    features: [
      'JWT authentication & Google OAuth login with protected routes',
      'Role-based admin dashboard for product, order & user management',
      'Persistent shopping cart, wishlist, and order placement/tracking',
      'Flash sales with countdown timers, coupon codes, and reviews/ratings',
      'Responsive UI and Docker support',
    ],
    architectureNodes: [
      {
        id: 'react-store',
        label: 'React Storefront & Admin UI',
        layer: 'Client',
        detail: 'Protected user checkout, wishlist, flash-sale views, and admin inventory management.',
      },
      {
        id: 'express-commerce',
        label: 'Express REST API + Auth',
        layer: 'Backend',
        detail: 'Verifies JWT/OAuth tokens, applies RBAC checks, validates coupons, and manages orders.',
      },
      {
        id: 'mongodb',
        label: 'MongoDB & Mongoose',
        layer: 'Database',
        detail: 'Persists users, products, orders, reviews, and promo coupons.',
      },
    ],
    frontendArchitecture:
      'React Context-backed authentication/cart state paired with protected route wrappers for customer checkout and admin views.',
    backendArchitecture:
      'Express MVC-style routes and auth middleware separating public catalog browsing from authenticated orders and admin mutations.',
    databaseSchema: [
      'Users { name, email, passwordHash, googleId, role: user|admin }',
      'Products { title, price, discountPrice, stock, category, ratingsAverage }',
      'Orders { userId, items[], total, couponApplied, status }',
      'Reviews { productId, userId, rating, comment }',
    ],
    apiSample: [
      { method: 'POST', route: '/api/auth/google', auth: 'Public', purpose: 'Verify Google OAuth credential and issue app JWT' },
      { method: 'GET', route: '/api/products', auth: 'Public', purpose: 'List catalog items with filters and flash-sale pricing' },
      { method: 'POST', route: '/api/orders', auth: 'Authenticated', purpose: 'Place order and update inventory counts' },
      { method: 'PUT', route: '/api/admin/orders/:id', auth: 'Admin', purpose: 'Update fulfillment status' },
    ],
    authAndSecurity:
      'JWT Bearer authentication, Google OAuth verification, hashed passwords, and admin-only RBAC guards on product/order mutation endpoints.',
    dataFlow:
      'User signs in via email or Google OAuth -> Receives JWT -> Adds items / applies coupon -> Places order -> Admin manages fulfillment from dashboard.',
    implementationDecisions:
      'Calculated coupon discounts and final order totals server-side so client tampering cannot alter checkout amounts.',
    testingStrategy:
      'Verified auth redirects, role protection on admin routes, coupon expiration checks, and responsive layouts across viewports.',
    debuggingChallenges:
      'Keeping cart state synchronized cleanly across guest browsing and authenticated checkout transitions.',
    securityConsiderations:
      'Server-side total validation, protected admin endpoints, and environment-isolated OAuth/JWT secrets.',
    performanceConsiderations:
      'Paginated/filtered product queries and lightweight image asset delivery.',
    limitations: [
      'Built as a portfolio commerce platform without live production merchant settlement.',
    ],
    futureImprovements: [
      'Add automated backend unit/integration test suites with Jest or Supertest.',
    ],
  },
  {
    _id: 'case-datask',
    slug: 'datask',
    title: 'DataSK / Data Analysis Work',
    subtitle: 'Exploratory Data Analysis & Statistical Visualization',
    status: 'Verified Notebooks & Analysis',
    summary:
      'Python exploratory data analysis, data cleaning, and statistical visualization notebooks built with NumPy, Pandas, Matplotlib, and Seaborn.',
    techStack: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    featured: false,
    order: 6,
    overview:
      'Collection of exploratory data analysis (EDA) and statistical visualization workflows conducted in Jupyter Notebook to examine structured datasets, surface anomalies, and communicate quantitative patterns.',
    problemDefinition:
      'Raw datasets frequently contain missing values, inconsistent types, and hidden distribution skew that distort downstream modeling if uninspected.',
    solution:
      'Applied systematic Pandas/NumPy cleaning steps followed by univariate and multivariate Matplotlib/Seaborn visual diagnostics.',
    myContribution:
      'Authored Jupyter notebooks covering missing-value audits, feature transformations, summary statistics, and correlation visualizations.',
    technologySelection:
      'Python, NumPy & Pandas for vectorized dataframe manipulation; Matplotlib & Seaborn for publication-grade statistical charts.',
    features: [
      'Data cleaning, null-handling, and type normalization workflows',
      'Exploratory Data Analysis (EDA) summary distributions',
      'Correlation heatmaps, pair plots, and outlier visual diagnostics',
      '[Placeholder: Verified Jupyter Notebook & Dataset Links]',
    ],
    architectureNodes: [
      {
        id: 'raw-csv',
        label: 'Raw Structured Datasets',
        layer: 'Input',
        detail: 'CSV/tabular sources audited for missing values, duplicates, and schema drift.',
      },
      {
        id: 'pandas-clean',
        label: 'Pandas & NumPy Cleaning',
        layer: 'Transform',
        detail: 'Imputation, type casting, and summary statistical profiling.',
      },
      {
        id: 'seaborn-viz',
        label: 'Matplotlib & Seaborn Visuals',
        layer: 'Output',
        detail: 'Distributions, boxplots, and correlation heatmaps for feature insights.',
      },
    ],
    frontendArchitecture:
      'Jupyter Notebook interactive narrative mixing Markdown explanations, code cells, and inline visual outputs.',
    backendArchitecture:
      'Reproducible local Python data scripts / notebook execution environment.',
    databaseSchema: [
      'Structured tabular CSV / DataFrame inputs (dataset-dependent columns)',
    ],
    apiSample: [
      { method: 'NOTEBOOK', route: '[Verified Notebook Link Placeholder]', auth: 'Public', purpose: 'Inspect cleaned dataframe & EDA plots' },
    ],
    authAndSecurity:
      'Local notebook analysis on non-sensitive public/practice datasets.',
    dataFlow:
      'Load dataset -> Audit missing/duplicate rows -> Clean & transform columns -> Generate statistical summaries & Seaborn visualizations.',
    implementationDecisions:
      'Documented cleaning assumptions alongside plots so transformations remain transparent and reproducible.',
    testingStrategy:
      'Shape, null-count, and dtype assertions before and after each transformation step.',
    debuggingChallenges:
      'Handling mixed numeric/string formatting and skewed distributions without distorting summary trends.',
    securityConsiderations:
      'Ensuring only verified, non-PII datasets are referenced.',
    performanceConsiderations:
      'Vectorized NumPy/Pandas operations instead of Python row loops.',
    limitations: [
      'Standalone analysis notebooks; verified GitHub notebook links are pending confirmation.',
    ],
    futureImprovements: [
      'Publish verified notebook links and pair EDA findings with Scikit-learn baseline models.',
    ],
  },
]

export const EXPERIMENTAL_CONCEPTS = [
  {
    name: 'Sketchboard',
    status: 'Proposal / SRS & Design Stage',
    summary:
      'Collaborative digital whiteboard and architecture sketching concept currently documented at the proposal, SRS, and UI design stage.',
  },
  {
    name: 'CampusFind AI',
    status: 'Early FYP Concept',
    summary:
      'Previously explored Final Year Project (FYP) concept focused on intelligent campus lost-and-found matching.',
  },
  {
    name: 'AI Lecture Assistant',
    status: 'Proposed Concept',
    summary:
      'Proposed concept for processing lecture recordings/materials into concise study notes alongside factual claim verification.',
  },
]

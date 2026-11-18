import type { PortfolioContent } from '../portfolio'

export const en: PortfolioContent = {
    experience: [
        {
            company: 'Bússola Social',
            meta: 'Full-time · Oct 2023 – Nov 2026',
            location: 'Itajaí, Brazil · Remote',
            roles: [
                {
                    title: 'Software Engineer (Mid-Level II)',
                    period: 'Nov 2025 – Nov 2026',
                    summary:
                        'Full stack work on a financial platform, with Vue.js and TypeScript on the front end and PHP/Laravel on the back end.',
                    highlights: [
                        'Financial features, complex business rules, REST APIs and data modeling with Laravel.',
                        'AI integration that generates custom financial reports through a chat interface, backed by SQL queries.',
                        'Built MCPs (Model Context Protocol) connecting applications to AI tools and agents.',
                        'Evolved the Design System with Storybook, Vue.js, SCSS and TypeScript; PWA and E2E tests with Cypress.',
                    ],
                },
                {
                    title: 'Front-End Engineer (Mid-Level I)',
                    period: 'Feb 2025 – Nov 2025',
                    summary:
                        'Built a financial product from scratch, from the architecture to scalable, high-performance interfaces.',
                    highlights: [
                        'New features and legacy code improvements focused on readability, organization and Clean Code.',
                        'Worked across multiple squads in a Job Rotation model, with dynamic prioritization.',
                        'Buddy for new developers, supporting knowledge transfer and onboarding.',
                    ],
                },
                {
                    title: 'Front-End Engineer (Junior)',
                    period: 'Oct 2023 – Feb 2025',
                    summary: 'Feature development with Vue.js 2 and 3, TypeScript and JavaScript.',
                    highlights: [
                        'Full redesign of the company blog on HubSpot, with HubL templates and customizations.',
                        'Unit tests with Jest and Vitest and E2E tests with Cypress.',
                        'Design System components, PWA applications and maintenance of a legacy Laravel system.',
                        'Code reviews, technical refinements with the Tech Lead and documentation of business rules.',
                    ],
                },
            ],
        },
        {
            company: 'Polo Trial',
            meta: 'Part-time · Nov 2025 – Jul 2026',
            location: 'Ribeirão Preto, Brazil · Remote',
            roles: [
                {
                    title: 'Mid-Level Software Engineer · Tech Lead',
                    period: 'Nov 2025 – Jul 2026',
                    summary: 'Built and improved interfaces with React, Angular and Material-UI, acting as tech lead.',
                    highlights: [
                        'Created and maintained the Design System.',
                        'Performance optimization with lazy loading, plus internationalization (i18n).',
                        'Automated tests to keep the codebase stable.',
                    ],
                },
            ],
        },
        {
            company: 'Equifax | Boa Vista',
            meta: 'Feb 2022 – Jun 2023',
            location: 'Barueri, Brazil · Remote',
            roles: [
                {
                    title: 'Software Engineer',
                    period: 'Feb 2022 – Jun 2023',
                    summary:
                        'High-availability web applications with React.js and TypeScript in a Micro Frontends architecture, integrated with microservices through REST APIs.',
                    highlights: [
                        'Built and maintained BFF (Backend for Frontend) layers in Node.js.',
                        'Unit and integration tests with Jest for production applications.',
                        'Worked with DevOps teams on GCP, supporting deploys, monitoring and availability.',
                    ],
                },
            ],
        },
    ],

    education: [
        {
            title: 'Systems Analysis and Development',
            period: "Associate's degree",
            description: "Associate's degree (Tecnólogo) in Systems Analysis and Development.",
        },
    ],

    stackGroups: [
        {
            title: 'Languages',
            file: 'languages.ts',
            icon: 'mdi-code-tags',
            description: 'The foundation of every web app.',
            items: ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'HTML', 'CSS'],
        },
        {
            title: 'Back end & architecture',
            file: 'backend.php',
            icon: 'mdi-server-outline',
            description: 'APIs, business rules and service integration.',
            items: ['PHP & Laravel', 'Node.js (BFF)', 'REST APIs', 'SQL & data modeling', 'Micro Frontends', 'GCP'],
        },
        {
            title: 'Front end',
            file: 'frontend.vue',
            icon: 'mdi-layers-outline',
            description: 'Reactive apps, SSR, SSG and PWA.',
            items: ['Vue.js 2 & 3', 'Nuxt', 'React', 'Next.js', 'Angular'],
        },
        {
            title: 'UI & Design Systems',
            file: 'design-system.scss',
            icon: 'mdi-palette-outline',
            description: 'Consistent, documented, scalable components.',
            items: ['Storybook', 'SCSS', 'Material-UI', 'Vuetify', 'i18n', 'HubSpot / HubL'],
        },
        {
            title: 'Quality',
            file: 'quality.spec.ts',
            icon: 'mdi-check-decagram-outline',
            description: 'Reliable code from the first commit to deploy.',
            items: ['Jest', 'Vitest', 'Cypress (E2E)', 'Code review', 'Clean Code', 'Performance'],
        },
        {
            title: 'Artificial Intelligence',
            file: 'ai.mcp.ts',
            icon: 'mdi-creation-outline',
            description: 'AI applied to real products.',
            items: ['MCP (Model Context Protocol)', 'AI chat', 'AI-generated reports'],
        },
    ],

    projects: [
        {
            title: 'CL Academy',
            type: 'Training app (PWA)',
            description:
                'App and website for CL Academy, a personal training and running coaching business. Students get their workout plans on their phone, log each session and effort level, and the coach replies in the app. Installable, works offline and sends notifications.',
            image: 'clacademy',
            stack: ['Nuxt', 'Vue', 'PWA', 'Offline', 'Notifications'],
            live: 'https://www.clacademy.com.br/',
        },
        {
            title: 'Acanto GR',
            type: 'Company website',
            description: 'Company website for Acanto GR, focused on design, clear information and performance.',
            image: 'acanto',
            stack: ['Vue', 'Responsive', 'SEO'],
            live: 'https://www.acantogr.com.br/',
        },
        {
            title: 'Marechal Segurança',
            type: 'Landing page',
            description:
                "Landing page that showcases Marechal Segurança's services and sends customers to their tracking system.",
            image: 'marechal',
            stack: ['Landing page', 'Conversion', 'Responsive'],
            live: 'https://www.marechalseguranca.com.br/',
        },
        {
            title: 'Carvalho Freire',
            type: 'Company website',
            description: 'Company website for Carvalho Freire, focused on design and performance.',
            image: 'carvalho_freire',
            stack: ['Corporate', 'Performance', 'SEO'],
            live: 'https://carvalhofreire.com.br/',
        },
    ],

    services: [
        { icon: 'mdi-web', title: 'Landing pages', description: 'High-converting pages to promote products or services.' },
        { icon: 'mdi-office-building-outline', title: 'Company websites', description: 'A professional online presence for your business.' },
        { icon: 'mdi-application-outline', title: 'Web applications', description: 'Interfaces and dashboards with Vue, Nuxt or React, built to scale.' },
        { icon: 'mdi-account-box-outline', title: 'Portfolios', description: 'Personal portfolios that highlight your skills and work.' },
        { icon: 'mdi-tools', title: 'Maintenance', description: 'Updates, improvements and support to keep your site running.' },
        { icon: 'mdi-lightbulb-on-outline', title: 'Consulting', description: 'Front-end and performance reviews and online presence strategy.' },
    ],
}

import type { PortfolioContent } from '../portfolio'

export const es: PortfolioContent = {
    experience: [
        {
            company: 'Bússola Social',
            meta: 'Tiempo completo · oct. 2023 – nov. 2026',
            location: 'Itajaí, Brasil · Remoto',
            roles: [
                {
                    title: 'Software Engineer (Semi Senior II)',
                    period: 'nov. 2025 – nov. 2026',
                    summary:
                        'Trabajo full stack en un sistema financiero, con Vue.js y TypeScript en el front-end y PHP/Laravel en el back-end.',
                    highlights: [
                        'Funcionalidades financieras, reglas de negocio complejas, APIs REST y modelado de datos con Laravel.',
                        'Integración de IA para generar informes financieros personalizados a través de un chat, con consultas SQL.',
                        'Desarrollo de MCPs (Model Context Protocol) que conectan aplicaciones con herramientas y agentes de IA.',
                        'Evolución del Design System con Storybook, Vue.js, SCSS y TypeScript; PWA y pruebas E2E con Cypress.',
                    ],
                },
                {
                    title: 'Front-End Engineer (Semi Senior I)',
                    period: 'feb. 2025 – nov. 2025',
                    summary:
                        'Construcción de un producto financiero desde cero, desde la arquitectura hasta interfaces escalables y de alto rendimiento.',
                    highlights: [
                        'Nuevas funcionalidades y mejoras en código legado con foco en legibilidad, organización y Clean Code.',
                        'Trabajo en varios squads con el modelo de Job Rotation y priorización dinámica de tareas.',
                        'Buddy de nuevos desarrolladores, apoyando la transferencia de conocimiento y la integración al equipo.',
                    ],
                },
                {
                    title: 'Front-End Engineer (Junior)',
                    period: 'oct. 2023 – feb. 2025',
                    summary: 'Desarrollo de funcionalidades con Vue.js 2 y 3, TypeScript y JavaScript.',
                    highlights: [
                        'Rediseño completo del blog institucional en HubSpot, con plantillas y personalizaciones en HubL.',
                        'Pruebas unitarias con Jest y Vitest y pruebas E2E con Cypress.',
                        'Componentes del Design System, aplicaciones PWA y mantenimiento de un sistema legado en Laravel.',
                        'Code reviews, refinamientos técnicos con el Tech Lead y documentación de reglas de negocio.',
                    ],
                },
            ],
        },
        {
            company: 'Polo Trial',
            meta: 'Medio tiempo · nov. 2025 – jul. 2026',
            location: 'Ribeirão Preto, Brasil · Remoto',
            roles: [
                {
                    title: 'Software Engineer Semi Senior · Líder Técnico',
                    period: 'nov. 2025 – jul. 2026',
                    summary: 'Desarrollo y mejora de interfaces con React, Angular y Material-UI, como líder técnico.',
                    highlights: [
                        'Creación y mantenimiento del Design System.',
                        'Optimización de rendimiento con lazy loading e internacionalización (i18n).',
                        'Pruebas automatizadas para garantizar la estabilidad del código.',
                    ],
                },
            ],
        },
        {
            company: 'Equifax | Boa Vista',
            meta: 'feb. 2022 – jun. 2023',
            location: 'Barueri, Brasil · Remoto',
            roles: [
                {
                    title: 'Software Engineer',
                    period: 'feb. 2022 – jun. 2023',
                    summary:
                        'Aplicaciones web de alta disponibilidad con React.js y TypeScript en una arquitectura de Micro Frontends, integradas a microservicios mediante APIs REST.',
                    highlights: [
                        'Construcción y mantenimiento de capas BFF (Backend for Frontend) en Node.js.',
                        'Pruebas unitarias y de integración con Jest para aplicaciones en producción.',
                        'Trabajo con equipos de DevOps en GCP, apoyando despliegues, monitoreo y disponibilidad.',
                    ],
                },
            ],
        },
    ],

    education: [
        {
            title: 'Análisis y Desarrollo de Sistemas',
            period: 'Grado',
            description: 'Tecnólogo en Análisis y Desarrollo de Sistemas.',
        },
    ],

    stackGroups: [
        {
            title: 'Lenguajes',
            file: 'languages.ts',
            icon: 'mdi-code-tags',
            description: 'La base de toda aplicación web.',
            items: ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'HTML', 'CSS'],
        },
        {
            title: 'Back-end y arquitectura',
            file: 'backend.php',
            icon: 'mdi-server-outline',
            description: 'APIs, reglas de negocio e integración entre servicios.',
            items: ['PHP y Laravel', 'Node.js (BFF)', 'APIs REST', 'SQL y modelado de datos', 'Micro Frontends', 'GCP'],
        },
        {
            title: 'Front-end',
            file: 'frontend.vue',
            icon: 'mdi-layers-outline',
            description: 'Aplicaciones reactivas, SSR, SSG y PWA.',
            items: ['Vue.js 2 y 3', 'Nuxt', 'React', 'Next.js', 'Angular'],
        },
        {
            title: 'UI y Design Systems',
            file: 'design-system.scss',
            icon: 'mdi-palette-outline',
            description: 'Componentes consistentes, documentados y escalables.',
            items: ['Storybook', 'SCSS', 'Material-UI', 'Vuetify', 'i18n', 'HubSpot / HubL'],
        },
        {
            title: 'Calidad',
            file: 'quality.spec.ts',
            icon: 'mdi-check-decagram-outline',
            description: 'Código confiable desde el primer commit hasta el deploy.',
            items: ['Jest', 'Vitest', 'Cypress (E2E)', 'Code review', 'Clean Code', 'Rendimiento'],
        },
        {
            title: 'Inteligencia Artificial',
            file: 'ai.mcp.ts',
            icon: 'mdi-creation-outline',
            description: 'IA aplicada a productos reales.',
            items: ['MCP (Model Context Protocol)', 'Chat con IA', 'Informes con IA'],
        },
    ],

    projects: [
        {
            title: 'CL Academy',
            type: 'App de entrenamiento (PWA)',
            description:
                'App y sitio de CL Academy, entrenador personal y asesoría de running. El alumno recibe su rutina y su plan en el celular, registra el entrenamiento y el esfuerzo, y el profesor responde desde la app. Instalable, funciona sin conexión y envía avisos.',
            image: 'clacademy',
            stack: ['Nuxt', 'Vue', 'PWA', 'Offline', 'Notificaciones'],
            live: 'https://www.clacademy.com.br/',
        },
        {
            title: 'Acanto GR',
            type: 'Sitio institucional',
            description: 'Sitio institucional para Acanto GR, con foco en diseño, claridad de la información y rendimiento.',
            image: 'acanto',
            stack: ['Vue', 'Responsive', 'SEO'],
            live: 'https://www.acantogr.com.br/',
        },
        {
            title: 'Marechal Segurança',
            type: 'Landing page',
            description:
                'Landing page que destaca los servicios de Marechal Segurança y lleva a los clientes a su sistema de seguimiento.',
            image: 'marechal',
            stack: ['Landing page', 'Conversión', 'Responsive'],
            live: 'https://www.marechalseguranca.com.br/',
        },
        {
            title: 'Carvalho Freire',
            type: 'Sitio institucional',
            description: 'Sitio institucional para Carvalho Freire, con foco en diseño y rendimiento.',
            image: 'carvalho_freire',
            stack: ['Institucional', 'Rendimiento', 'SEO'],
            live: 'https://carvalhofreire.com.br/',
        },
    ],

    services: [
        { icon: 'mdi-web', title: 'Landing pages', description: 'Páginas de alta conversión para promocionar productos o servicios.' },
        { icon: 'mdi-office-building-outline', title: 'Sitios institucionales', description: 'Presencia profesional para presentar tu empresa en internet.' },
        { icon: 'mdi-application-outline', title: 'Aplicaciones web', description: 'Interfaces y paneles con Vue, Nuxt o React, listos para escalar.' },
        { icon: 'mdi-account-box-outline', title: 'Portafolios', description: 'Portafolios personales que destacan tus habilidades y trabajos.' },
        { icon: 'mdi-tools', title: 'Mantenimiento', description: 'Actualizaciones, mejoras y soporte para mantener tu sitio en línea.' },
        { icon: 'mdi-lightbulb-on-outline', title: 'Consultoría', description: 'Revisión de front-end, rendimiento y estrategia de presencia online.' },
    ],
}

import type { PortfolioContent } from '../portfolio'

export const pt: PortfolioContent = {
    experience: [
        {
            company: 'Bússola Social',
            meta: 'Tempo integral · out. 2023 a nov. 2026',
            location: 'Itajaí, SC · Remoto',
            roles: [
                {
                    title: 'Software Engineer Pleno II',
                    period: 'nov. 2025 a nov. 2026',
                    summary:
                        'Atuação full stack em um sistema financeiro, com Vue.js e TypeScript no front-end e PHP/Laravel no back-end.',
                    highlights: [
                        'Funcionalidades financeiras, regras de negócio complexas, APIs REST e modelagem de dados com Laravel.',
                        'Integração de IA para geração de relatórios financeiros personalizados via interface de chat, com consultas SQL.',
                        'Desenvolvimento de MCPs (Model Context Protocol) conectando aplicações a ferramentas e agentes de IA.',
                        'Evolução do Design System com Storybook, Vue.js, SCSS e TypeScript; PWA e testes E2E com Cypress.',
                    ],
                },
                {
                    title: 'Front-End Engineer Pleno I',
                    period: 'fev. 2025 a nov. 2025',
                    summary:
                        'Construção de um projeto financeiro do zero, da definição da arquitetura às interfaces escaláveis e performáticas.',
                    highlights: [
                        'Novas funcionalidades e melhorias em código legado com foco em legibilidade, organização e Clean Code.',
                        'Atuação em múltiplas squads no modelo de Job Rotation, com priorização dinâmica de demandas.',
                        'Buddy de novos desenvolvedores, apoiando a passagem de conhecimento e a integração ao time.',
                    ],
                },
                {
                    title: 'Front-End Engineer Júnior',
                    period: 'out. 2023 a fev. 2025',
                    summary: 'Desenvolvimento de features com Vue.js 2 e 3, TypeScript e JavaScript.',
                    highlights: [
                        'Redesign completo do blog institucional no HubSpot, com templates e personalizações em HubL.',
                        'Testes unitários com Jest e Vitest e testes E2E com Cypress.',
                        'Componentes do Design System, aplicações PWA e manutenção de sistema legado em Laravel.',
                        'Code reviews, refinamentos técnicos com o Tech Lead e documentação de regras de negócio.',
                    ],
                },
            ],
        },
        {
            company: 'Polo Trial',
            meta: 'Meio período · nov. 2025 a jul. 2026',
            location: 'Ribeirão Preto, SP · Remoto',
            roles: [
                {
                    title: 'Software Engineer Mid-Level · Líder Técnico',
                    period: 'nov. 2025 a jul. 2026',
                    summary:
                        'Desenvolvimento e aprimoramento de interfaces com React, Angular e Material-UI, atuando como líder técnico.',
                    highlights: [
                        'Criação e manutenção de Design System.',
                        'Otimização de performance com lazy loading e internacionalização (i18n).',
                        'Testes automatizados para garantir a estabilidade do código.',
                    ],
                },
            ],
        },
        {
            company: 'Equifax | Boa Vista',
            meta: 'fev. 2022 a jun. 2023',
            location: 'Barueri, SP · Remoto',
            roles: [
                {
                    title: 'Software Engineer',
                    period: 'fev. 2022 a jun. 2023',
                    summary:
                        'Aplicações web de alta disponibilidade com React.js e TypeScript em arquitetura de Micro Frontends, integradas a microsserviços via APIs REST.',
                    highlights: [
                        'Construção e manutenção de camadas BFF (Backend for Frontend) em Node.js.',
                        'Testes unitários e de integração com Jest para aplicações em produção.',
                        'Atuação com times de DevOps em GCP, apoiando deploys, monitoramento e disponibilidade.',
                    ],
                },
            ],
        },
    ],

    education: [
        {
            title: 'Análise e Desenvolvimento de Sistemas',
            period: 'Graduação',
            // TODO: adicionar a instituição de ensino e o ano de conclusão (nos três idiomas)
            description: 'Tecnólogo em Análise e Desenvolvimento de Sistemas.',
        },
    ],

    stackGroups: [
        {
            title: 'Linguagens',
            file: 'languages.ts',
            icon: 'mdi-code-tags',
            description: 'A base de toda aplicação web.',
            items: ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'HTML', 'CSS'],
        },
        {
            title: 'Back-end e arquitetura',
            file: 'backend.php',
            icon: 'mdi-server-outline',
            description: 'APIs, regras de negócio e integração entre serviços.',
            items: ['PHP e Laravel', 'Node.js (BFF)', 'APIs REST', 'SQL e modelagem de dados', 'Micro Frontends', 'GCP'],
        },
        {
            title: 'Front-end',
            file: 'frontend.vue',
            icon: 'mdi-layers-outline',
            description: 'Aplicações reativas, SSR, SSG e PWA.',
            items: ['Vue.js 2 e 3', 'Nuxt', 'React', 'Next.js', 'Angular'],
        },
        {
            title: 'UI e Design Systems',
            file: 'design-system.scss',
            icon: 'mdi-palette-outline',
            description: 'Componentes consistentes, documentados e escaláveis.',
            items: ['Storybook', 'SCSS', 'Material-UI', 'Vuetify', 'i18n', 'HubSpot / HubL'],
        },
        {
            title: 'Qualidade',
            file: 'quality.spec.ts',
            icon: 'mdi-check-decagram-outline',
            description: 'Código confiável do primeiro commit ao deploy.',
            items: ['Jest', 'Vitest', 'Cypress (E2E)', 'Code review', 'Clean Code', 'Performance'],
        },
        {
            title: 'Inteligência Artificial',
            file: 'ai.mcp.ts',
            icon: 'mdi-creation-outline',
            description: 'IA aplicada a produtos reais.',
            items: ['MCP (Model Context Protocol)', 'Chat com IA', 'Relatórios com IA'],
        },
    ],

    projects: [
        {
            title: 'CL Academy',
            type: 'App de treinos (PWA)',
            description:
                'App e site da CL Academy, personal trainer e assessoria de corrida. O aluno recebe a ficha e a planilha no celular, registra o treino e o esforço, e o professor responde pelo app. Instalável, funciona offline e envia avisos.',
            image: 'clacademy',
            stack: ['Nuxt', 'Vue', 'PWA', 'Offline', 'Notificações'],
            live: 'https://www.clacademy.com.br/',
        },
        {
            title: 'Acanto GR',
            type: 'Site institucional',
            description: 'Site institucional para a Acanto GR, com foco em design, clareza da informação e performance.',
            image: 'acanto',
            stack: ['Vue', 'Responsivo', 'SEO'],
            live: 'https://www.acantogr.com.br/',
        },
        {
            title: 'Marechal Segurança',
            type: 'Landing page',
            description:
                'Landing page que destaca serviços e soluções da Marechal Segurança e direciona clientes para o sistema de acompanhamento.',
            image: 'marechal',
            stack: ['Landing page', 'Conversão', 'Responsivo'],
            live: 'https://www.marechalseguranca.com.br/',
        },
        {
            title: 'Carvalho Freire',
            type: 'Site institucional',
            description: 'Site institucional para a Carvalho Freire, com foco em design e performance.',
            image: 'carvalho_freire',
            stack: ['Institucional', 'Performance', 'SEO'],
            live: 'https://carvalhofreire.com.br/',
        },
    ],

    services: [
        { icon: 'mdi-web', title: 'Landing pages', description: 'Páginas de alta conversão para divulgar produtos ou serviços.' },
        { icon: 'mdi-office-building-outline', title: 'Sites institucionais', description: 'Presença profissional para apresentar sua empresa na internet.' },
        { icon: 'mdi-application-outline', title: 'Aplicações web', description: 'Interfaces e painéis com Vue, Nuxt ou React, prontos para escalar.' },
        { icon: 'mdi-account-box-outline', title: 'Portfólios', description: 'Portfólios pessoais que destacam suas habilidades e trabalhos.' },
        { icon: 'mdi-tools', title: 'Manutenção', description: 'Atualizações, melhorias e suporte para manter seu site no ar.' },
        { icon: 'mdi-lightbulb-on-outline', title: 'Consultoria', description: 'Revisão de front-end, performance e estratégia de presença online.' },
    ],
}

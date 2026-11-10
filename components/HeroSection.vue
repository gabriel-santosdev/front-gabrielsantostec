<template>
    <section class="hero" id="hero">
        <div class="hero__text">
            <p class="gs-kicker">Gabriel Santos · Software Engineer Full Stack</p>
            <h1 class="gs-display">Do banco de dados<br />à interface.</h1>
            <p class="hero__lead">
                Desenvolvo produtos web de ponta a ponta: APIs e regras de negócio com Laravel e Node.js,
                interfaces com Vue, React e Angular, e integrações com Inteligência Artificial.
            </p>

            <div class="hero__actions">
                <a href="#cv" class="gs-btn gs-btn--primary">Ver currículo</a>
                <a href="#projects" class="gs-btn gs-btn--outline">Ver projetos</a>
            </div>

            <div class="hero__social">
                <a href="https://linkedin.com/in/devgabrielsantos" target="_blank" rel="noopener noreferrer"
                    class="gs-link">LinkedIn</a>
                <a href="https://github.com/gabriel-santosdev" target="_blank" rel="noopener noreferrer"
                    class="gs-link">GitHub</a>
            </div>
        </div>

        <div class="hero__stage" aria-hidden="true">
            <div class="editor">
                <div class="editor__pane" v-for="file in files" :key="file.name">
                    <div class="editor__tab">
                        <span class="editor__layer">{{ file.layer }}</span>
                        <span class="editor__name">{{ file.name }}</span>
                    </div>
                    <pre class="editor__code"><code v-html="highlight(file.code)"></code></pre>
                </div>
            </div>

            <div class="hero__callout">
                <div>
                    <p class="hero__callout-title">Disponível para novos projetos</p>
                    <p class="hero__callout-sub">Freelance, consultoria e skills para IA</p>
                </div>
                <a href="#contact" class="gs-btn gs-btn--primary gs-btn--sm" tabindex="-1">Contato</a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const files = [
    {
        layer: 'Back-end',
        name: 'ReportController.php',
        code: `class ReportController extends Controller
{
    public function store(ReportRequest $request)
    {
        $data = $this->finance->query(
            $request->filters()
        );

        return new ReportResource(
            $this->ai->summarize($data, $request->prompt)
        );
    }
}`,
    },
    {
        layer: 'Front-end',
        name: 'ReportChat.vue',
        code: `<script setup lang="ts">
const { data: report } = await useFetch('/api/reports', {
    method: 'POST',
    body: { prompt },
})
<\/script>

<template>
    <ChatMessage :content="report.summary" />
    <FinanceChart :series="report.series" />
</template>`,
    },
]

const KEYWORDS = /\b(class|extends|public|function|return|new|const|await|method|body)\b/

function escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Realce simples e estático (conteúdo controlado, sem entrada do usuário)
function highlight(code: string): string {
    const pattern = new RegExp(`('[^']*'|"[^"]*")|${KEYWORDS.source}|(</?[\\w-]+)|(\\$\\w+)`, 'g')
    let html = ''
    let last = 0
    for (const match of code.matchAll(pattern)) {
        html += escapeHtml(code.slice(last, match.index))
        const [token, str, keyword, tag, variable] = match
        const cls = str ? 'tk-str' : keyword ? 'tk-key' : tag ? 'tk-tag' : variable ? 'tk-var' : ''
        html += `<span class="${cls}">${escapeHtml(token)}</span>`
        last = (match.index ?? 0) + token.length
    }
    return html + escapeHtml(code.slice(last))
}
</script>

<style scoped>
.hero {
    background: var(--color-gallery-white);
    padding: calc(var(--header-height) + 72px) 22px 0;
    text-align: center;
    overflow: hidden;
}

.hero__text {
    max-width: 880px;
    margin: 0 auto;
}

.hero__lead {
    font-size: 21px;
    line-height: 1.38;
    letter-spacing: 0.011em;
    color: var(--color-ink);
    max-width: 680px;
    margin: 24px auto 0;
}

.hero__actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 36px;
}

.hero__social {
    display: flex;
    justify-content: center;
    gap: 28px;
    margin-top: 24px;
}

.hero__stage {
    position: relative;
    max-width: 1040px;
    margin: 72px auto 0;
    padding-bottom: 56px;
}

.editor {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    background: var(--color-studio-mist);
    border-radius: var(--radius-cards);
    overflow: hidden;
    text-align: left;
}

.editor__pane+.editor__pane {
    border-left: 1px solid var(--color-control-gray);
}

.editor__tab {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 18px 28px;
    border-bottom: 1px solid var(--color-control-gray);
}

.editor__layer {
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: -0.12px;
    color: var(--color-ink);
}

.editor__name {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.12px;
    color: var(--color-slate);
}

.editor__code {
    margin: 0;
    padding: 24px 28px 96px;
    font-family: ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas, monospace;
    font-size: 13px;
    line-height: 1.7;
    color: var(--color-ink);
    overflow-x: auto;
    white-space: pre;
}

.editor__code :deep(.tk-key) {
    color: var(--color-apple-blue);
}

.editor__code :deep(.tk-str) {
    color: var(--color-launch-orange);
}

.editor__code :deep(.tk-tag) {
    color: var(--color-apple-blue);
}

.editor__code :deep(.tk-var) {
    color: var(--color-slate);
}

.hero__callout {
    position: absolute;
    left: 50%;
    bottom: 28px;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 12px 12px 12px 24px;
    background: var(--color-gallery-white);
    border-radius: var(--radius-cards);
    box-shadow: var(--shadow-subtle, 0 0 0 1px #e6e6e8);
    text-align: left;
    white-space: nowrap;
}

.hero__callout p {
    margin: 0;
}

.hero__callout-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.29;
    letter-spacing: -0.224px;
    color: var(--color-ink);
}

.hero__callout-sub {
    font-size: 12px;
    line-height: 1.33;
    letter-spacing: -0.12px;
    color: var(--color-slate);
}

@media (max-width: 834px) {
    .editor {
        grid-template-columns: 1fr;
    }

    .editor__pane+.editor__pane {
        border-left: 0;
        border-top: 1px solid var(--color-control-gray);
    }

    .editor__code {
        padding-bottom: 28px;
    }

    .editor__pane:last-child .editor__code {
        padding-bottom: 96px;
    }
}

@media (max-width: 734px) {
    .hero {
        padding: calc(var(--header-height) + 48px) 16px 0;
    }

    .hero__lead {
        font-size: 19px;
    }

    .hero__stage {
        margin-top: 48px;
    }

    .editor__tab,
    .editor__code {
        padding-left: 20px;
        padding-right: 20px;
    }

    .editor__code {
        font-size: 12px;
    }

    .hero__callout {
        left: 16px;
        right: 16px;
        bottom: 72px;
        transform: none;
        white-space: normal;
        justify-content: space-between;
    }
}
</style>

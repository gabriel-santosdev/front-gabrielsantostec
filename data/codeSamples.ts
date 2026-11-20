// A descrição de cada arquivo vem de terminal.files.<key> em i18n/locales
export interface CodeSample {
  key: 'reportController' | 'reportChat' | 'financeMcp' | 'askPost'
  name: string
  layer: string
  code: string
}

export const codeSamples: CodeSample[] = [
  {
    key: 'reportController',
    name: 'ReportController.php',
    layer: 'back-end',
    code: `class ReportController extends Controller
{
    public function store(ReportRequest $request)
    {
        // Query the filtered financial data
        $data = $this->finance->query($request->filters());

        // Let the AI summarize the result in plain language
        return new ReportResource(
            $this->ai->summarize($data, $request->prompt)
        );
    }
}`,
  },
  {
    key: 'reportChat',
    name: 'ReportChat.vue',
    layer: 'front-end',
    code: `<script setup lang="ts">
const prompt = ref('')

const { data: report } = await useFetch('/api/reports', {
    method: 'POST',
    body: { prompt },
})
</script>

<template>
    <ChatMessage :content="report.summary" />
    <FinanceChart :series="report.series" />
</template>`,
  },
  {
    key: 'financeMcp',
    name: 'finance.mcp.ts',
    layer: 'ai',
    code: `// MCP tool that AI agents can call
server.tool('monthly_report', {
    description: 'Monthly financial summary',
    input: z.object({ month: z.string() }),
}, async ({ month }) => {
    const rows = await db.report(month)

    return {
        content: [{ type: 'text', text: toMarkdown(rows) }],
    }
})`,
  },
  {
    key: 'askPost',
    name: 'ask.post.ts',
    layer: 'this site',
    code: `export default defineEventHandler(async (event) => {
    const { question, history, locale } = await readBody(event)

    const stream = await ai.models.generateContentStream({
        model: 'gemini-3.8-flash',
        contents: [...history, { role: 'user', parts: [{ text: question }] }],
        config: { systemInstruction: buildPrompt(locale) },
    })

    // Stream the text to the terminal as it is generated
    return toTextStream(stream)
})`,
  },
]

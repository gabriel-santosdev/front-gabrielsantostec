/**
 * Trechos de código exibidos no terminal do hero (comando "cat <arquivo>").
 * Mostram uma feature full stack real: do controller Laravel ao componente Vue e ao MCP.
 */
export interface CodeSample {
  name: string
  layer: string
  description: string
  code: string
}

export const codeSamples: CodeSample[] = [
  {
    name: 'ReportController.php',
    layer: 'back-end',
    description: 'Laravel: consulta os dados e pede o resumo para a IA',
    code: `class ReportController extends Controller
{
    public function store(ReportRequest $request)
    {
        // Consulta os dados financeiros filtrados
        $data = $this->finance->query($request->filters());

        // A IA resume o resultado em linguagem natural
        return new ReportResource(
            $this->ai->summarize($data, $request->prompt)
        );
    }
}`,
  },
  {
    name: 'ReportChat.vue',
    layer: 'front-end',
    description: 'Vue + TypeScript: o chat que exibe o relatório',
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
    name: 'finance.mcp.ts',
    layer: 'ia',
    description: 'MCP: expõe os dados do produto para agentes de IA',
    code: `// Ferramenta MCP que agentes de IA podem chamar
server.tool('monthly_report', {
    description: 'Resumo financeiro do mês',
    input: z.object({ month: z.string() }),
}, async ({ month }) => {
    const rows = await db.report(month)

    return {
        content: [{ type: 'text', text: toMarkdown(rows) }],
    }
})`,
  },
  {
    name: 'ask.post.ts',
    layer: 'este site',
    description: 'Nuxt: a rota que responde as perguntas deste terminal',
    code: `export default defineEventHandler(async (event) => {
    const { question, history } = await readBody(event)

    const stream = await ai.models.generateContentStream({
        model: 'gemini-3.8-flash',
        contents: [...history, { role: 'user', parts: [{ text: question }] }],
        config: { systemInstruction: PORTFOLIO_SYSTEM_PROMPT },
    })

    // Repassa o texto para o terminal enquanto é gerado
    return toTextStream(stream)
})`,
  },
]

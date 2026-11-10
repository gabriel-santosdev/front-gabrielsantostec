<template>
    <footer class="footer">
        <div class="gs-container footer__inner">
            <nav class="footer__links" aria-label="Rodapé">
                <a href="#cv">Sobre</a>
                <a href="#projects">Projetos</a>
                <a href="#ai-skills">Skills para IA</a>
                <a href="#services">Serviços</a>
                <a href="#contact">Contato</a>
            </nav>
            <p class="footer__copy">
                &copy; {{ currentYear }} gabrielsantos.tec. Todos os direitos reservados.
            </p>
        </div>
    </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
    background: var(--color-studio-mist);
    padding: 0 22px 32px;
}

.footer__inner {
    border-top: 1px solid var(--color-hairline-silver);
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px 24px;
}

.footer__links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
}

.footer__links a,
.footer__copy {
    font-size: 12px;
    line-height: 1.33;
    letter-spacing: -0.12px;
    color: var(--color-slate);
    text-decoration: none;
    margin: 0;
}

.footer__links a:hover {
    color: var(--color-ink);
    text-decoration: underline;
}

@media (max-width: 734px) {
    .footer {
        padding: 0 16px 24px;
    }
}
</style>

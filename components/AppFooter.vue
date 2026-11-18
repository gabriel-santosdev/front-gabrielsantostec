<template>
    <footer class="footer">
        <div class="gs-container--wide footer__inner">
            <div class="footer__brand">
                <img src="/logo-gs.png" alt="Gabriel Santos" width="2712" height="724" class="footer__logo" />
                <p class="footer__tagline">{{ t('footer.tagline') }}</p>
            </div>

            <nav class="footer__links" :aria-label="t('footer.label')">
                <a href="#cv">{{ t('nav.about') }}</a>
                <a href="#stack">{{ t('nav.stack') }}</a>
                <a href="#projects">{{ t('nav.projects') }}</a>
                <a href="#services">{{ t('nav.services') }}</a>
                <a href="#contact">{{ t('nav.contact') }}</a>
            </nav>

            <div class="footer__social">
                <a href="https://github.com/gabriel-santosdev" target="_blank" rel="noopener noreferrer"
                    aria-label="GitHub"><i class="mdi mdi-github" aria-hidden="true"></i></a>
                <a href="https://linkedin.com/in/devgabrielsantos" target="_blank" rel="noopener noreferrer"
                    aria-label="LinkedIn"><i class="mdi mdi-linkedin" aria-hidden="true"></i></a>
            </div>
        </div>

        <div class="gs-container--wide footer__bottom">
            <p>&copy; {{ currentYear }} gabrielsantos.tec</p>
            <p>{{ t('footer.madeWith') }} <span class="footer__accent">Nuxt</span> + <span class="footer__accent">Vue</span> ·
                <a href="#hero" class="footer__top">{{ t('footer.top') }}</a>
            </p>
        </div>
    </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
    position: relative;
    background: var(--color-bg-deep);
    border-top: 1px solid var(--color-border);
    padding: 56px 24px 28px;
}

.footer__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 28px 40px;
    padding-bottom: 32px;
    border-bottom: 1px solid var(--color-border);
}

.footer__logo {
    height: 22px;
    width: auto;
}

.footer__tagline {
    margin: 10px 0 0;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-subtle);
}

.footer__links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 24px;
}

.footer__links a {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--color-muted);
    text-decoration: none;
    transition: color 0.2s ease;
}

.footer__links a:hover {
    color: var(--color-accent);
}

.footer__social {
    display: flex;
    gap: 8px;
}

.footer__social a {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    font-size: 19px;
    color: var(--color-muted);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    text-decoration: none;
    transition: color 0.2s ease, border-color 0.2s ease;
}

.footer__social a:hover {
    color: var(--color-accent);
    border-color: rgba(187, 153, 255, 0.4);
}

.footer__bottom {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px 24px;
    padding-top: 20px;
}

.footer__bottom p {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-subtle);
}

.footer__accent {
    color: var(--color-accent);
}

.footer__top {
    color: var(--color-muted);
    text-decoration: none;
}

.footer__top:hover {
    color: var(--color-text);
}

@media (max-width: 734px) {
    .footer {
        padding: 48px 16px 24px;
    }

    .footer__inner {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>

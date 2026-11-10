<template>
    <header class="global-nav" :class="{ 'is-open': menuOpen }">
        <nav class="global-nav__inner" aria-label="Navegação principal">
            <a href="#hero" class="global-nav__logo" aria-label="Gabriel Santos, início" @click="menuOpen = false">
                <img src="/logo-gs.png" alt="gabriel" />
            </a>

            <ul class="global-nav__links">
                <li v-for="item in navItems" :key="item.href">
                    <a :href="item.href">{{ item.label }}</a>
                </li>
            </ul>

            <div class="global-nav__actions">
                <a href="#contact" class="gs-btn gs-btn--primary gs-btn--sm">Fale comigo</a>
                <button class="global-nav__toggle" type="button" :aria-expanded="menuOpen" aria-controls="mobile-menu"
                    aria-label="Abrir menu" @click="menuOpen = !menuOpen">
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>

        <ul v-show="menuOpen" id="mobile-menu" class="global-nav__mobile">
            <li v-for="item in navItems" :key="item.href">
                <a :href="item.href" @click="menuOpen = false">{{ item.label }}</a>
            </li>
        </ul>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)

const navItems = [
    { label: 'Sobre', href: '#cv' },
    { label: 'Stack', href: '#stack' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Skills para IA', href: '#ai-skills' },
    { label: 'Serviços', href: '#services' },
    { label: 'Contato', href: '#contact' },
]
</script>

<style scoped>
.global-nav {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid var(--color-control-gray);
}

.global-nav.is-open {
    background: var(--color-paper-frost);
}

.global-nav__inner {
    max-width: 1024px;
    height: var(--header-height);
    margin: 0 auto;
    padding: 0 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
}

.global-nav__logo {
    display: flex;
    align-items: center;
}

.global-nav__logo img {
    height: 18px;
    width: auto;
    /* logo original é branco; deixamos monocromático em Ink */
    filter: brightness(0) saturate(100%);
    opacity: 0.88;
}

.global-nav__links {
    display: flex;
    gap: 32px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.global-nav__links a,
.global-nav__mobile a {
    font-size: 12px;
    line-height: 1;
    letter-spacing: -0.12px;
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    transition: color 0.2s ease;
}

.global-nav__links a:hover {
    color: var(--color-ink);
}

.global-nav__actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.global-nav__toggle {
    display: none;
    width: 32px;
    height: 32px;
    border: 0;
    background: transparent;
    cursor: pointer;
    position: relative;
}

.global-nav__toggle span {
    position: absolute;
    left: 8px;
    right: 8px;
    height: 1.5px;
    background: var(--color-ink);
    transition: transform 0.25s ease, top 0.25s ease;
}

.global-nav__toggle span:first-child {
    top: 12px;
}

.global-nav__toggle span:last-child {
    top: 19px;
}

.is-open .global-nav__toggle span:first-child {
    top: 15.5px;
    transform: rotate(45deg);
}

.is-open .global-nav__toggle span:last-child {
    top: 15.5px;
    transform: rotate(-45deg);
}

.global-nav__mobile {
    list-style: none;
    margin: 0;
    padding: 8px 22px 24px;
}

.global-nav__mobile a {
    display: block;
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 600;
    line-height: 1.17;
    color: var(--color-ink);
    padding: 10px 0;
}

@media (max-width: 834px) {
    .global-nav__links {
        display: none;
    }

    .global-nav__toggle {
        display: block;
    }

    .global-nav__inner {
        padding: 0 16px;
    }
}

@media (min-width: 835px) {
    .global-nav__mobile {
        display: none !important;
    }
}
</style>

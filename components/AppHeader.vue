<template>
    <header class="nav" :class="{ 'is-scrolled': scrolled, 'is-open': menuOpen }">
        <nav class="nav__inner" :aria-label="t('nav.label')">
            <a href="#hero" class="nav__logo" :aria-label="t('nav.home')" @click="menuOpen = false">
                <img src="/logo-gs.png" alt="" width="2712" height="724" />
            </a>

            <ul class="nav__links">
                <li v-for="(item, i) in navItems" :key="item.href">
                    <a :href="item.href" :class="{ 'is-active': active === item.href }"
                        :aria-current="active === item.href ? 'true' : undefined">
                        <span class="nav__index">{{ String(i + 1).padStart(2, '0') }}.</span>{{ item.label }}
                    </a>
                </li>
            </ul>

            <div class="nav__actions">
                <LangSwitch class="nav__lang" />
                <a href="#contact" class="gs-btn gs-btn--primary gs-btn--sm nav__cta">{{ t('nav.cta') }}</a>
                <button class="nav__toggle" type="button" :aria-expanded="menuOpen" aria-controls="mobile-menu"
                    :aria-label="menuOpen ? t('nav.closeMenu') : t('nav.openMenu')" @click="menuOpen = !menuOpen">
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>

        <ul v-show="menuOpen" id="mobile-menu" class="nav__mobile">
            <li v-for="(item, i) in navItems" :key="item.href">
                <a :href="item.href" @click="menuOpen = false">
                    <span class="nav__index">{{ String(i + 1).padStart(2, '0') }}.</span>{{ item.label }}
                </a>
            </li>
            <li class="nav__mobile-cta">
                <LangSwitch />
                <a href="#contact" class="gs-btn gs-btn--primary" @click="menuOpen = false">{{ t('nav.cta') }}</a>
            </li>
        </ul>
    </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const { t } = useI18n()

const menuOpen = ref(false)
const scrolled = ref(false)
const active = ref('')

const navItems = computed(() => [
    { label: t('nav.about'), href: '#cv' },
    { label: t('nav.stack'), href: '#stack' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.contact'), href: '#contact' },
])

let observer: IntersectionObserver | null = null

function onScroll() {
    scrolled.value = window.scrollY > 8
}

onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) active.value = `#${entry.target.id}`
            }
        },
        { rootMargin: '-45% 0px -50% 0px' }
    )
    for (const item of navItems.value) {
        const el = document.querySelector(item.href)
        if (el) observer.observe(el)
    }
    const hero = document.querySelector('#hero')
    if (hero) observer.observe(hero)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    observer?.disconnect()
})
</script>

<style scoped>
.nav {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 100;
    border-bottom: 1px solid transparent;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.nav.is-scrolled,
.nav.is-open {
    background: rgba(25, 25, 25, 0.78);
    backdrop-filter: saturate(160%) blur(16px);
    -webkit-backdrop-filter: saturate(160%) blur(16px);
    border-bottom-color: var(--color-border);
}

.nav.is-open {
    background: var(--color-bg);
}

.nav__inner {
    max-width: 1200px;
    height: var(--header-height);
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
}

.nav__logo {
    display: flex;
    align-items: center;
    border-radius: 4px;
}

.nav__logo img {
    height: 22px;
    width: auto;
}

.nav__links {
    display: flex;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav__links a {
    display: inline-flex;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--color-muted);
    text-decoration: none;
    padding: 8px 12px;
    border-radius: var(--radius-sm);
    transition: color 0.2s ease, background-color 0.2s ease;
}

.nav__links a:hover {
    color: var(--color-text);
    background: rgba(242, 242, 242, 0.04);
}

.nav__links a.is-active {
    color: var(--color-text);
}

.nav__links a.is-active .nav__index,
.nav__links a:hover .nav__index {
    color: var(--color-accent);
}

.nav__index {
    color: var(--color-subtle);
    margin-right: 4px;
    transition: color 0.2s ease;
}

.nav__actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.nav__toggle {
    display: none;
    width: 40px;
    height: 40px;
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
    background: transparent;
    cursor: pointer;
    position: relative;
}

.nav__toggle span {
    position: absolute;
    left: 11px;
    right: 11px;
    height: 1.5px;
    background: var(--color-text);
    transition: transform 0.25s ease, top 0.25s ease;
}

.nav__toggle span:first-child {
    top: 15px;
}

.nav__toggle span:last-child {
    top: 22px;
}

.is-open .nav__toggle span:first-child {
    top: 18.5px;
    transform: rotate(45deg);
}

.is-open .nav__toggle span:last-child {
    top: 18.5px;
    transform: rotate(-45deg);
}

.nav__mobile {
    list-style: none;
    margin: 0;
    padding: 8px 16px 28px;
    height: calc(100dvh - var(--header-height));
    overflow-y: auto;
}

.nav__mobile a:not(.gs-btn) {
    display: flex;
    align-items: baseline;
    font-family: var(--font-display);
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--color-text);
    text-decoration: none;
    padding: 14px 0;
    border-bottom: 1px solid var(--color-border);
}

.nav__mobile .nav__index {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 400;
    color: var(--color-accent);
    margin-right: 14px;
}

.nav__mobile-cta {
    display: flex;
    gap: 12px;
    margin-top: 28px;
}

.nav__mobile-cta .gs-btn {
    flex: 1;
}

@media (max-width: 1080px) {
    .nav__links {
        display: none;
    }

    .nav__toggle {
        display: block;
    }
}

@media (max-width: 734px) {
    .nav__inner {
        padding: 0 16px;
    }

    .nav__cta,
    .nav__lang {
        display: none;
    }
}

@media (min-width: 1081px) {
    .nav__mobile {
        display: none !important;
    }
}
</style>

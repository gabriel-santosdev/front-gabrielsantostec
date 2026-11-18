<template>
    <section class="gs-section resume" id="cv">
        <div class="gs-container">
            <!-- Sobre -->
            <div class="about">
                <div class="about__text" v-reveal>
                    <p class="gs-kicker">{{ t('about.kicker') }}</p>
                    <h2 class="gs-heading">{{ t('about.title') }}<br /><span class="gs-gradient-text">{{
                            t('about.titleAccent') }}</span></h2>
                    <div class="about__body">
                        <!-- textos estáticos de i18n/locales, com <strong> -->
                        <p class="gs-body gs-body--muted" v-html="t('about.p1')"></p>
                        <p class="gs-body gs-body--muted" v-html="t('about.p2')"></p>
                        <p class="gs-body gs-body--muted" v-html="t('about.p3')"></p>
                    </div>
                    <p class="about__caption">
                        <span><i class="mdi mdi-map-marker-outline" aria-hidden="true"></i> {{ t('about.location') }}</span>
                        <span><i class="mdi mdi-school-outline" aria-hidden="true"></i> {{ t('about.degree') }}</span>
                    </p>
                </div>
            </div>

            <!-- Experiência -->
            <div class="resume__block">
                <div class="resume__block-head" v-reveal>
                    <h3 class="resume__block-title">{{ t('resume.experience') }}</h3>
                    <p class="resume__cmd"><span>$</span> {{ t('resume.gitLog') }}</p>
                </div>

                <div class="timeline">
                    <article v-for="job in portfolio.experience" :key="job.company" class="job" v-reveal>
                        <header class="job__head">
                            <span class="job__node" aria-hidden="true"></span>
                            <h4 class="job__company">{{ job.company }}</h4>
                            <p class="job__meta">{{ job.meta }} · {{ job.location }}</p>
                        </header>

                        <ol class="job__roles">
                            <li v-for="role in job.roles" :key="role.title" class="role">
                                <span class="role__node" aria-hidden="true"></span>
                                <p class="role__period">{{ role.period }}</p>
                                <h5 class="role__title">{{ role.title }}</h5>
                                <p class="role__summary">{{ role.summary }}</p>
                                <ul class="role__highlights">
                                    <li v-for="item in role.highlights" :key="item">{{ item }}</li>
                                </ul>
                            </li>
                        </ol>
                    </article>
                </div>
            </div>

            <!-- Formação -->
            <div class="resume__block resume__block--edu">
                <div class="resume__block-head" v-reveal>
                    <h3 class="resume__block-title">{{ t('resume.education') }}</h3>
                </div>
                <article v-for="item in portfolio.education" :key="item.title" class="gs-card edu" v-reveal>
                    <i class="mdi mdi-school-outline edu__icon" aria-hidden="true"></i>
                    <div>
                        <p class="role__period">{{ item.period }}</p>
                        <p class="gs-feature-heading">{{ item.title }}</p>
                        <p class="gs-small">{{ item.description }}</p>
                    </div>
                </article>

                <div class="resume__cta">
                    <a href="https://linkedin.com/in/devgabrielsantos" target="_blank" rel="noopener noreferrer"
                        class="gs-link">{{ t('resume.linkedin') }}</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const portfolio = usePortfolio()

</script>

<style scoped>
/* ---------- Sobre ---------- */
.about {
    max-width: 820px;
}

.about__body {
    display: grid;
    gap: 18px;
    margin-top: 32px;
    max-width: 640px;
}

.about__caption {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin: 32px 0 0;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-subtle);
}

.about__caption .mdi {
    color: var(--color-accent);
}

/* ---------- Blocos ---------- */
.resume__block {
    margin-top: 120px;
}

.resume__block-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 40px;
}

.resume__block-title {
    font-family: var(--font-display);
    font-size: clamp(28px, 3.4vw, 40px);
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.1;
    color: var(--color-text);
    margin: 0;
}

.resume__cmd {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--color-subtle);
    margin: 0;
}

.resume__cmd span {
    color: var(--color-accent);
}

/* ---------- Timeline (git log) ---------- */
.timeline {
    position: relative;
    padding-left: 36px;
}

.timeline::before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 7px;
    width: 2px;
    background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary) 70%, transparent);
}

.job+.job {
    margin-top: 56px;
}

.job__head {
    position: relative;
    margin-bottom: 24px;
}

.job__node {
    position: absolute;
    left: -36px;
    top: 5px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-primary);
    box-shadow: 0 0 0 4px var(--color-bg), 0 0 18px rgba(111, 0, 255, 0.8);
}

.job__company {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: var(--color-text);
    margin: 0;
}

.job__meta {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-subtle);
    margin: 6px 0 0;
}

.job__roles {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 16px;
}

.role {
    position: relative;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 24px 28px;
    transition: border-color 0.3s ease;
}

.role:hover {
    border-color: rgba(187, 153, 255, 0.3);
}

.role__node {
    position: absolute;
    left: -34px;
    top: 30px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--color-bg);
    border: 2px solid var(--color-accent);
}

.role p,
.role h5 {
    margin: 0;
}

.role__period {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-accent);
    margin: 0 0 8px;
}

.role__title {
    font-family: var(--font-display);
    font-size: 19px;
    font-weight: 600;
    letter-spacing: -0.015em;
    line-height: 1.3;
    color: var(--color-text);
}

.role__summary {
    margin-top: 8px !important;
    font-size: 15px;
    line-height: 1.6;
    color: var(--color-text);
    opacity: 0.88;
}

.role__highlights {
    list-style: none;
    margin: 16px 0 0;
    padding: 0;
    display: grid;
    gap: 8px;
}

.role__highlights li {
    position: relative;
    padding-left: 20px;
    font-size: 14px;
    line-height: 1.55;
    color: var(--color-muted);
}

.role__highlights li::before {
    content: '▹';
    position: absolute;
    left: 0;
    color: var(--color-accent);
}

/* ---------- Formação ---------- */
.edu {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    max-width: 640px;
}

.edu p {
    margin: 0;
}

.edu .gs-small {
    margin-top: 6px;
}

.edu__icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    font-size: 24px;
    color: var(--color-accent);
    background: var(--color-accent-soft);
    border-radius: var(--radius-md);
}

.resume__cta {
    margin-top: 32px;
}

@media (max-width: 834px) {
    .resume__block {
        margin-top: 88px;
    }
}

@media (max-width: 734px) {
    .timeline {
        padding-left: 28px;
    }

    .timeline::before {
        left: 5px;
    }

    .job__node {
        left: -28px;
        width: 12px;
        height: 12px;
        top: 7px;
    }

    .role__node {
        left: -27px;
        width: 10px;
        height: 10px;
    }

    .role {
        padding: 20px;
    }
}
</style>

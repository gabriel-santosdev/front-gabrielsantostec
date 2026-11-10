<template>
    <section class="gs-section services" id="services">
        <div class="gs-container">
            <div class="services__intro">
                <p class="gs-kicker">Serviços</p>
                <h2 class="gs-heading">Seu projeto, do papel<br />para a web.</h2>
                <p class="gs-body gs-body--muted services__lead">
                    Sites e aplicações com foco em performance, estética e resultado. Do primeiro rascunho ao site no
                    ar, e depois dele.
                </p>
            </div>

            <ul class="services__list">
                <li v-for="service in services" :key="service.title" class="services__item">
                    <i :class="['mdi', service.icon]" aria-hidden="true"></i>
                    <div>
                        <h3 class="services__title">{{ service.title }}</h3>
                        <p class="gs-small">{{ service.description }}</p>
                    </div>
                </li>
            </ul>

            <div class="services__cta">
                <a :href="budgetLink" target="_blank" rel="noopener noreferrer" class="gs-btn gs-btn--primary">
                    <i class="mdi mdi-whatsapp" aria-hidden="true"></i>
                    Solicitar orçamento
                </a>
                <a href="#contact" class="gs-link">Ou envie uma mensagem</a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { whatsappLink } from '~/utils/whatsapp'

const budgetLink = whatsappLink('Olá! Tenho interesse em um site profissional. Podemos conversar?')

const services = [
    { icon: 'mdi-web', title: 'Landing pages', description: 'Páginas de alta conversão para divulgar produtos ou serviços.' },
    { icon: 'mdi-office-building-outline', title: 'Sites institucionais', description: 'Presença profissional para apresentar sua empresa na internet.' },
    { icon: 'mdi-application-outline', title: 'Aplicações web', description: 'Interfaces e painéis com Vue, Nuxt ou React, prontos para escalar.' },
    { icon: 'mdi-account-box-outline', title: 'Portfólios', description: 'Portfólios pessoais que destacam suas habilidades e trabalhos.' },
    { icon: 'mdi-tools', title: 'Manutenção', description: 'Atualizações, melhorias e suporte para manter seu site no ar.' },
    { icon: 'mdi-lightbulb-on-outline', title: 'Consultoria', description: 'Revisão de front-end, performance e estratégia de presença online.' },
]
</script>

<style scoped>
.services {
    background: var(--color-gallery-white);
}

.services__intro {
    max-width: 720px;
}

.services__lead {
    margin-top: 20px;
}

.services__list {
    list-style: none;
    margin: 56px 0 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 40px;
}

.services__item {
    display: flex;
    gap: 16px;
    padding: 24px 0;
    border-top: 1px solid var(--color-hairline-silver);
}

.services__item .mdi {
    font-size: 24px;
    line-height: 1;
    color: var(--color-ink);
}

.services__title {
    font-size: 17px;
    font-weight: 600;
    line-height: 1.24;
    letter-spacing: -0.374px;
    color: var(--color-ink);
    margin: 0 0 6px;
}

.services__cta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 48px;
}

@media (max-width: 834px) {
    .services__list {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 560px) {
    .services__list {
        grid-template-columns: 1fr;
    }

    .services__intro br {
        display: none;
    }
}
</style>

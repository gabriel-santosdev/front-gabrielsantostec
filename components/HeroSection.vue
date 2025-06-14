<template>
    <section class="hero" id="hero">
        <div class="mouse-glow"></div>
        <v-container class="mb-lg-15">
            <v-row align="center" justify="center" no-gutters class="hero-row">
                <!-- Imagem à esquerda -->
                <v-col cols="12" md="5" class="d-flex justify-center">
                    <v-img src="../public/profile-gs.jpeg" alt="Foto do Desenvolvedor" class="hero-image" contain />
                </v-col>

                <!-- Texto à direita -->
                <v-col cols="12" md="7" class="hero-text">
                    <h1 class="hero-title">Desenvolvedor Front-End</h1>
                    <h2 class="hero-subtitle">Mais de 4 anos desenvolvendo interfaces modernas e eficientes</h2>
                    <p class="hero-description">
                        Desenvolvedor front-end com mais de 4 anos de experiência em aplicações web modernas, atualmente
                        atuando na <strong>Bússola Social</strong>. Sou apaixonado por criar experiências digitais
                        intuitivas, acessíveis e de alta performance, com foco em qualidade de código, escalabilidade e
                        boas práticas.<br /><br />
                        Tenho experiência com <strong>Vue.js</strong>, <strong>TypeScript</strong>,
                        <strong>JavaScript</strong>,<strong>React.js</strong> e testes automatizados.
                        Valorizo a colaboração em equipe, a clareza no código e a entrega de soluções que realmente
                        façam a diferença para o usuário final.<br />Graduado em Análise e Desenvolvimento de
                        Sistemas.
                    </p>


                    <div class="hero-buttons">
                        <a href="https://linkedin.com/in/devgabrielsantos" target="_blank" class="btn-simple linkedin"
                            rel="noopener noreferrer">
                            <i class="mdi mdi-linkedin"></i> LinkedIn
                        </a>
                        <a href="https://github.com/gabriel-santosdev" target="_blank" class="btn-simple github"
                            rel="noopener noreferrer">
                            <i class="mdi mdi-github"></i> GitHub
                        </a>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => {
    const section = document.getElementById('hero')
    const glow = section?.querySelector('.mouse-glow') as HTMLElement

    const updateGlow = (e: MouseEvent) => {
        if (!glow || !section) return
        const rect = section.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent 60%)`
    }

    section?.addEventListener('mousemove', updateGlow)

    onBeforeUnmount(() => {
        section?.removeEventListener('mousemove', updateGlow)
    })
})
</script>

<style scoped>
.hero {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
    background: linear-gradient(135deg, #6f00ff 0%, #31007f 100%);
    color: #f2f2f2;
    display: flex;
    align-items: center;
    padding: 0 24px;
}

.mouse-glow {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.15), transparent 60%);
    transition: background-position 0.1s ease;
    z-index: 0;
}

.hero>*:not(.mouse-glow) {
    position: relative;
    z-index: 1;
}

.hero-row {
    gap: 40px;
}

.hero-image {
    width: 100%;
    max-width: 320px;
    border-radius: 30px;
    object-fit: cover;
    transition: transform 0.3s ease;
    cursor: default;
}

.hero-image:hover {
    transform: scale(1.05);
}

.hero-text {
    max-width: 600px;
}

.hero-title {
    font-weight: 700;
    font-size: 2.8rem;
    margin: 0 0 8px 0;
    letter-spacing: 0.04em;
}

.hero-subtitle {
    font-weight: 500;
    font-size: 1.3rem;
    color: #bb99ff;
    margin: 0 0 24px 0;
}

.hero-description {
    font-size: 1.05rem;
    line-height: 1.6;
    color: #ddd;
    margin-bottom: 32px;
}

.hero-buttons {
    display: flex;
    gap: 20px;
}

.btn-simple {
    font-size: 1.3rem;
    color: #f2f2f2;
    text-decoration: none;
    padding: 10px 24px;
    border-radius: 24px;
    border: 2px solid transparent;
    transition: all 0.25s ease;
    cursor: pointer;
}

.btn-simple:hover {
    border-color: #bb99ff;
    color: #bb99ff;
    background: rgba(187, 153, 255, 0.15);
    text-decoration: underline;
}

.linkedin {
    color: #0a66c2;
    border-color: transparent;
}

.linkedin:hover {
    color: black;
    background: rgba(10, 102, 194, 0.15);
    border-color: #0a66c2;
}

.github {
    color: #fff;
    border-color: transparent;
}

.github:hover {
    color: #ddd;
    background: rgba(255, 255, 255, 0.15);
    border-color: #ddd;
}

@media (max-width: 960px) {
    .hero-row {
        gap: 24px;
    }

    .hero-title {
        font-size: 2.3rem;
    }

    .hero-subtitle {
        font-size: 1.1rem;
    }

    .hero-description {
        font-size: 1rem;
    }
}

@media (max-width: 600px) {
    .hero {
        min-height: auto;
        padding: 64px 16px;
    }

    .hero-row {
        flex-direction: column;
        align-items: center;
    }

    .hero-image {
        max-width: 280px;
        margin-bottom: 32px;
    }

    .hero-text {
        text-align: center;
    }

    .hero-buttons {
        justify-content: center;
    }
}
</style>
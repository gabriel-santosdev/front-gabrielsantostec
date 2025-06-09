<template>
    <section class="hero" id="hero">
        <v-container class="mb-lg-15">
            <v-row align="center" justify="center" no-gutters class="hero-row">
                <!-- Imagem à esquerda -->
                <v-col cols="12" md="5" class="d-flex justify-center">
                    <v-img src="../public/profile-gs.jpeg" alt="Foto do Desenvolvedor" class="hero-image" contain />
                </v-col>

                <!-- Texto à direita -->
                <v-col cols="12" md="7" class="hero-text">
                    <h1 class="hero-title">
                        Desenvolvedor Web
                    </h1>
                    <h2 class="hero-subtitle">Mais de 4 anos de experiência</h2>
                    <p class="hero-description">
                        Como entusiasta de tecnologia, meu foco é o desenvolvimento web. Busco soluções interativas e
                        design
                        atrativo, sempre visando a melhor experiência para o usuário.<br />
                        Graduado em Análise e Desenvolvimento de Sistemas pela UNINOVE.
                    </p>

                    <div class="hero-buttons">
                        <a href="https://linkedin.com/in/seu-perfil" target="_blank" class="btn-simple linkedin"
                            rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://github.com/seu-usuario" target="_blank" class="btn-simple github"
                            rel="noopener noreferrer">GitHub</a>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<style scoped>
.hero {
    min-height: 80vh;
    background: linear-gradient(135deg, #6f00ff 0%, #31007f 100%);
    color: #f2f2f2;
    display: flex;
    align-items: center;
    padding: 0 24px;
}

.hero-row {
    gap: 40px;
}

.hero-image {
    width: 100%;
    max-width: 320px;
    border-radius: 16px;
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
    font-weight: 600;
    font-size: 1rem;
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
    /* Linkedin azul levemente esmaecido */
    color: #0a66c2;
    border-color: transparent;
}

.linkedin:hover {
    color: #004182;
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
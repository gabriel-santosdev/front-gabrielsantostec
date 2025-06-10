<template>
    <section class="services" id="services">
        <v-container class="py-16">
            <h2 class="text-center mb-10 services-title">Serviços</h2>
            <v-row>
                <v-col cols="12" sm="6" md="4" v-for="service in services" :key="service.title">
                    <v-card class="pa-6 service-card">
                        <v-icon size="40" color="primary" class="mb-4">{{ service.icon }}</v-icon>
                        <h3 class="service-title mb-2">{{ service.title }}</h3>
                        <p class="service-description">{{ service.description }}</p>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script setup lang="ts">
const services = [
    {
        icon: 'mdi-web',
        title: 'Landing Pages',
        description: 'Páginas de alta conversão para divulgar produtos ou serviços.'
    },
    {
        icon: 'mdi-office-building',
        title: 'Sites Institucionais',
        description: 'Sites profissionais para apresentar sua empresa na internet.'
    },
    {
        icon: 'mdi-account-box',
        title: 'Portfólios Pessoais',
        description: 'Portfólios personalizados para destacar suas habilidades e trabalhos.'
    },
    {
        icon: 'mdi-newspaper',
        title: 'Blogs e Conteúdo',
        description: 'Plataformas para compartilhar notícias, artigos e novidades.'
    },
    {
        icon: 'mdi-tools',
        title: 'Manutenção de Sites',
        description: 'Atualizações e suporte técnico para manter seu site no ar.'
    },
    {
        icon: 'mdi-cellphone-link',
        title: 'Design Responsivo',
        description: 'Layouts que se adaptam perfeitamente a qualquer dispositivo.'
    },
    {
        icon: 'mdi-lightbulb-on',
        title: 'Consultoria Digital',
        description: 'Estratégias para fortalecer sua marca e presença online.'
    }
]
</script>

<style scoped>
.services {
    background: #f9f9f9;
    color: #191919;
}

.services-title {
    font-size: 2.5rem;
    font-weight: 700;
    position: relative;
}

.services-title::after {
    content: '';
    width: 60px;
    height: 4px;
    background: #6f00ff;
    display: block;
    margin: 12px auto 0;
    border-radius: 2px;
}

.service-card {
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(25, 25, 25, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: white;
}

.service-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 6px 16px rgba(25, 25, 25, 0.2);
}

.service-title {
    font-size: 1.25rem;
    font-weight: 600;
}

.service-description {
    font-size: 0.95rem;
    color: #555;
}
</style>
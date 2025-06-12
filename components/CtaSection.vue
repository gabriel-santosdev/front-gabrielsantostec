<template>
    <section class="highlight-cta">
        <v-container class="py-16">
            <v-row align="center" justify="space-between">
                <v-col cols="12" md="8">
                    <h2 class="highlight-title">
                        Pronto para tirar seu projeto do papel?
                    </h2>
                    <p class="highlight-description">
                        Desenvolvimento de landing pages, blogs, portfólios e sites profissionais com foco em
                        performance, estética e resultado. Solicite um orçamento agora mesmo!
                    </p>
                </v-col>

                <v-col cols="12" md="4" class="text-md-right mt-6 mt-md-0 text-center text-md-end">
                    <v-btn color="success" class="highlight-btn" large :href="whatsappLink" target="_blank">
                        <v-icon left>mdi-whatsapp</v-icon>
                        Solicitar Orçamento
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script setup lang="ts">
const whatsappNumber = '5511976552081'
const message = encodeURIComponent(
    'Olá! Tenho interesse em um site profissional. Podemos conversar?'
)
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`
</script>

<style scoped>
.highlight-cta {
    background-color: #f8f8f8;
    color: #191919;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
}

.highlight-title {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1.3;
}

.highlight-description {
    font-size: 1.125rem;
    color: #555;
    max-width: 600px;
}

.highlight-btn {
    border-radius: 30px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.2);
}

.highlight-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(39, 174, 96, 0.3);
}
</style>
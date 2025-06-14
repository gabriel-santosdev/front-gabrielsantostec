<template>
    <section class="skills-section" id="skills">
        <v-container>
            <h2 class="skills-title">Minhas Skills</h2>

            <v-row class="skills-row" justify="center">
                <v-col v-for="(skill, index) in skills" :key="index" cols="6" sm="4" md="3"
                    class="d-flex justify-center">
                    <v-chip class="skill-chip" large color="primary" variant="elevated">
                        <v-icon start>{{ skill.icon }}</v-icon>
                        {{ skill.name }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script setup lang="ts">
const skills = [
    { name: 'HTML', icon: 'mdi-language-html5' },
    { name: 'CSS', icon: 'mdi-language-css3' },
    { name: 'JavaScript', icon: 'mdi-language-javascript' },
    { name: 'TypeScript', icon: 'mdi-language-typescript' },
    { name: 'Vue', icon: 'mdi-vuejs' },
    { name: 'Nuxt', icon: 'mdi-nuxt' },
    { name: 'React', icon: 'mdi-react' },
    { name: 'Design System', icon: 'mdi-palette' },
    { name: 'SCSS', icon: 'mdi-sass' },
    { name: 'Next.js', icon: 'mdi-web' }
]
</script>

<style scoped>
.skills-section {
    background: linear-gradient(135deg, #191919, #31007f);
    padding: 80px 20px;
    color: #f2f2f2;
}

.skills-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 50px;
    position: relative;
}

.skills-title::after {
    content: '';
    width: 60px;
    height: 4px;
    background: #6f00ff;
    display: block;
    margin: 12px auto 0;
    border-radius: 2px;
}

.skill-chip {
    font-weight: 600;
    padding: 12px 20px !important;
    background: linear-gradient(135deg, #6f00ff, #31007f);
    color: #f2f2f2 !important;
    box-shadow: 0 4px 12px rgba(111, 0, 255, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 30px;
    cursor: default;
}

.skill-chip:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(111, 0, 255, 0.5);
}

.skills-row {
    max-width: 900px;
    margin: 0 auto;
    gap: 16px;
}
</style>
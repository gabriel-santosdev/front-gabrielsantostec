<template>
    <section class="contact" id="contact">
        <v-container class="py-20 text-center">
            <h2 class="contact-title mb-4">Contato</h2>
            <p class="contact-subtitle mb-8">
                Tem um projeto ou ideia? Vamos conversar e criar algo incrível juntos.
            </p>

            <v-form v-model="formValid" ref="contactForm">
                <v-row class="justify-center">
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.name" label="Nome" :rules="[rules.required]" outlined dense
                            color="primary" />
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.email" label="E-mail" :rules="[rules.required, rules.email]"
                            outlined dense color="primary" />
                    </v-col>

                    <v-col cols="12">
                        <v-textarea v-model="form.message" label="Mensagem" :rules="[rules.required]" outlined rows="4"
                            color="primary" />
                    </v-col>

                    <v-col cols="12">
                        <v-btn :loading="loading" :disabled="!formValid || loading" color="primary" class="contact-btn"
                            large @click="submitForm">
                            <v-icon left>mdi-send</v-icon>
                            Enviar Mensagem
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>

            <!-- Modal de Sucesso -->
            <v-dialog v-model="dialog" max-width="400">
                <v-card>
                    <v-card-title class="headline">
                        Mensagem Enviada!
                        <v-icon color="success" class="mr-3 mb-3">mdi-check-bold</v-icon>
                    </v-card-title>
                    <v-card-text>
                        Obrigado pelo contato. Responderei o mais breve possível.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" text @click="dialog = false">Fechar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useContactForm } from '@/composables/useContactForm'

const form = ref({
    name: '',
    email: '',
    message: ''
})

const formValid = ref(false)
const dialog = ref(false)

const rules = {
    required: (v: string) => !!v || 'Campo obrigatório',
    email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido'
}


// Composable com o endpoint do Formspree
const { sendContactForm, loading, error, success } = useContactForm('https://formspree.io/f/mblygplg')

async function submitForm() {
    if (!formValid.value) return
    await sendContactForm(form.value)
}

watch(success, (val) => {
    if (val) {
        dialog.value = true
        form.value = { name: '', email: '', message: '' }
    }
})

watch(error, (val) => {
    if (val) {
        alert(`Erro: ${val}`)
    }
})
</script>

<style scoped>
.contact {
    background-color: #191919;
    color: #f2f2f2;
}

.contact-title {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 1px;
}

.contact-subtitle {
    font-size: 1.1rem;
    color: #ccc;
    max-width: 600px;
    margin: 0 auto;
}

.contact-btn {
    border-radius: 30px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 14px rgba(111, 0, 255, 0.5);
}
</style>
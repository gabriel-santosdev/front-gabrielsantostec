<template>
    <section class="gs-section gs-section--mist" id="contact">
        <div class="gs-container contact">
            <div class="contact__intro">
                <p class="gs-kicker">Contato</p>
                <h2 class="gs-heading">Vamos conversar.</h2>
                <p class="gs-body gs-body--muted contact__lead">
                    Projeto, oportunidade ou skills para IA? Me mande uma mensagem e eu respondo o mais breve
                    possível.
                </p>
                <ul class="contact__channels">
                    <li><a :href="whatsapp" target="_blank" rel="noopener noreferrer" class="gs-link">WhatsApp</a></li>
                    <li><a href="https://linkedin.com/in/devgabrielsantos" target="_blank" rel="noopener noreferrer"
                            class="gs-link">LinkedIn</a></li>
                    <li><a href="https://github.com/gabriel-santosdev" target="_blank" rel="noopener noreferrer"
                            class="gs-link">GitHub</a></li>
                </ul>
            </div>

            <form class="gs-card contact__form" novalidate @submit.prevent="submitForm">
                <div v-if="success" class="contact__success" role="status">
                    <i class="mdi mdi-check-circle-outline" aria-hidden="true"></i>
                    <p class="gs-feature-heading">Mensagem enviada.</p>
                    <p class="gs-small">Obrigado pelo contato! Responderei o mais breve possível.</p>
                    <button type="button" class="gs-link contact__reset" @click="success = false">Enviar outra
                        mensagem</button>
                </div>

                <template v-else>
                    <label class="field">
                        <span class="field__label">Nome</span>
                        <input v-model.trim="form.name" type="text" name="name" autocomplete="name"
                            :aria-invalid="touched && !form.name" />
                        <span v-if="touched && !form.name" class="field__error">Campo obrigatório</span>
                    </label>

                    <label class="field">
                        <span class="field__label">E-mail</span>
                        <input v-model.trim="form.email" type="email" name="email" autocomplete="email"
                            :aria-invalid="touched && !emailValid" />
                        <span v-if="touched && !emailValid" class="field__error">Informe um e-mail válido</span>
                    </label>

                    <label class="field">
                        <span class="field__label">Assunto</span>
                        <select v-model="form.subject" name="subject">
                            <option v-for="option in subjects" :key="option" :value="option">{{ option }}</option>
                        </select>
                    </label>

                    <label class="field">
                        <span class="field__label">Mensagem</span>
                        <textarea v-model.trim="form.message" name="message" rows="5"
                            :aria-invalid="touched && !form.message"></textarea>
                        <span v-if="touched && !form.message" class="field__error">Campo obrigatório</span>
                    </label>

                    <p v-if="error" class="field__error contact__error" role="alert">
                        Não foi possível enviar agora. Tente novamente ou fale comigo pelo WhatsApp.
                    </p>

                    <button type="submit" class="gs-btn gs-btn--primary contact__submit" :disabled="loading">
                        {{ loading ? 'Enviando…' : 'Enviar mensagem' }}
                    </button>
                </template>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useContactForm } from '@/composables/useContactForm'
import { whatsappLink } from '~/utils/whatsapp'

const subjects = ['Projeto / orçamento', 'Skills para IA', 'Oportunidade de trabalho', 'Outro assunto']

const emptyForm = () => ({ name: '', email: '', subject: subjects[0], message: '' })
const form = ref(emptyForm())
const touched = ref(false)

const whatsapp = whatsappLink('Olá, Gabriel! Vim pelo seu site.')

const emailValid = computed(() => /.+@.+\..+/.test(form.value.email))
const formValid = computed(() => !!form.value.name && emailValid.value && !!form.value.message)

const { sendContactForm, loading, error, success } = useContactForm('https://formspree.io/f/mblygplg')

async function submitForm() {
    touched.value = true
    if (!formValid.value) return
    await sendContactForm(form.value)
}

watch(success, (val) => {
    if (val) {
        form.value = emptyForm()
        touched.value = false
    }
})
</script>

<style scoped>
.contact {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    gap: 64px;
    align-items: start;
}

.contact__lead {
    margin-top: 20px;
}

.contact__channels {
    list-style: none;
    margin: 32px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.contact__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.field__label {
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: -0.12px;
    color: var(--color-ink);
}

.field input,
.field select,
.field textarea {
    font-family: var(--font-text);
    font-size: 17px;
    line-height: 1.47;
    letter-spacing: -0.374px;
    color: var(--color-ink);
    background: var(--color-gallery-white);
    border: 1px solid var(--color-steel);
    border-radius: 12px;
    padding: 12px 16px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    width: 100%;
}

.field select {
    appearance: auto;
}

.field textarea {
    resize: vertical;
    min-height: 140px;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
    border-color: var(--color-pricing-blue);
    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.2);
}

.field [aria-invalid='true'] {
    border-color: var(--color-launch-orange);
}

.field__error {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.12px;
    color: var(--color-launch-orange);
}

.contact__error {
    margin: 0;
}

.contact__submit {
    align-self: flex-start;
}

.contact__success {
    text-align: center;
    padding: 32px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.contact__success .mdi {
    font-size: 48px;
    line-height: 1;
    color: var(--color-ink);
    margin-bottom: 8px;
}

.contact__reset {
    background: none;
    border: 0;
    padding: 0;
    margin-top: 16px;
    cursor: pointer;
    font-family: inherit;
}

@media (max-width: 834px) {
    .contact {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .contact__form {
        padding: var(--card-padding);
    }

    .contact__submit {
        align-self: stretch;
    }
}
</style>

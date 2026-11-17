<template>
    <section class="gs-section contact-section" id="contact">
        <div class="contact__glow" aria-hidden="true"></div>
        <div class="gs-container contact">
            <div class="contact__intro" v-reveal>
                <p class="gs-kicker">05. contato</p>
                <h2 class="gs-heading">Vamos construir<br /><span class="gs-gradient-text">algo juntos?</span></h2>
                <p class="gs-body gs-body--muted contact__lead">
                    Tem um projeto ou uma oportunidade? Me mande uma mensagem e eu respondo o mais breve possível.
                </p>
                <ul class="contact__channels">
                    <li v-for="channel in channels" :key="channel.label">
                        <a :href="channel.href" target="_blank" rel="noopener noreferrer" class="channel">
                            <i :class="['mdi', channel.icon]" aria-hidden="true"></i>
                            <span>
                                <span class="channel__label">{{ channel.label }}</span>
                                <span class="channel__value">{{ channel.value }}</span>
                            </span>
                            <i class="mdi mdi-arrow-top-right channel__arrow" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="terminal" v-reveal="120">
                <div class="terminal__bar">
                    <span class="gs-window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
                    <span class="terminal__title">nova-mensagem.sh</span>
                </div>

                <form class="contact__form" novalidate @submit.prevent="submitForm">
                    <div v-if="success" class="contact__success" role="status">
                        <p class="contact__success-line"><span>✓</span> mensagem enviada com sucesso</p>
                        <p class="gs-small">Obrigado pelo contato! Responderei o mais breve possível.</p>
                        <button type="button" class="gs-link contact__reset" @click="success = false">Enviar outra
                            mensagem</button>
                    </div>

                    <template v-else>
                        <div class="field-row">
                            <label class="field">
                                <span class="field__label">nome</span>
                                <input v-model.trim="form.name" type="text" name="name" autocomplete="name"
                                    placeholder="Seu nome" :aria-invalid="touched && !form.name" />
                                <span v-if="touched && !form.name" class="field__error">Campo obrigatório</span>
                            </label>

                            <label class="field">
                                <span class="field__label">email</span>
                                <input v-model.trim="form.email" type="email" name="email" autocomplete="email"
                                    placeholder="voce@empresa.com" :aria-invalid="touched && !emailValid" />
                                <span v-if="touched && !emailValid" class="field__error">Informe um e-mail
                                    válido</span>
                            </label>
                        </div>

                        <label class="field">
                            <span class="field__label">assunto</span>
                            <select v-model="form.subject" name="subject">
                                <option v-for="option in subjects" :key="option" :value="option">{{ option }}
                                </option>
                            </select>
                        </label>

                        <label class="field">
                            <span class="field__label">mensagem</span>
                            <textarea v-model.trim="form.message" name="message" rows="5"
                                placeholder="Conte um pouco sobre o projeto ou a vaga"
                                :aria-invalid="touched && !form.message"></textarea>
                            <span v-if="touched && !form.message" class="field__error">Campo obrigatório</span>
                        </label>

                        <p v-if="error" class="field__error contact__error" role="alert">
                            Não foi possível enviar agora. Tente novamente ou fale comigo pelo WhatsApp.
                        </p>

                        <button type="submit" class="gs-btn gs-btn--primary contact__submit" :disabled="loading">
                            <i :class="['mdi', loading ? 'mdi-loading mdi-spin' : 'mdi-send-outline']"
                                aria-hidden="true"></i>
                            {{ loading ? 'Enviando…' : 'Enviar mensagem' }}
                        </button>
                    </template>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useContactForm } from '@/composables/useContactForm'
import { whatsappLink } from '~/utils/whatsapp'

const subjects = ['Projeto / orçamento', 'Oportunidade de trabalho', 'Outro assunto']

const emptyForm = () => ({ name: '', email: '', subject: subjects[0], message: '' })
const form = ref(emptyForm())
const touched = ref(false)

const whatsapp = whatsappLink('Olá, Gabriel! Vim pelo seu site.')

const channels = [
    { label: 'WhatsApp', value: 'Resposta rápida', icon: 'mdi-whatsapp', href: whatsapp },
    { label: 'LinkedIn', value: 'in/devgabrielsantos', icon: 'mdi-linkedin', href: 'https://linkedin.com/in/devgabrielsantos' },
    { label: 'GitHub', value: 'gabriel-santosdev', icon: 'mdi-github', href: 'https://github.com/gabriel-santosdev' },
]

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
.contact-section {
    overflow: hidden;
}

.contact__glow {
    position: absolute;
    left: 50%;
    bottom: -320px;
    width: 900px;
    height: 600px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: var(--gradient-brand);
    filter: blur(160px);
    opacity: 0.22;
    pointer-events: none;
}

.contact {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
    gap: 64px;
    align-items: start;
}

.contact__lead {
    margin-top: 20px;
    max-width: 440px;
}

.contact__channels {
    list-style: none;
    margin: 40px 0 0;
    padding: 0;
    display: grid;
    gap: 10px;
    max-width: 400px;
}

.channel {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 18px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: border-color 0.2s ease, transform 0.2s var(--ease-out);
}

.channel:hover {
    border-color: rgba(187, 153, 255, 0.4);
    transform: translateX(4px);
}

.channel>.mdi:first-child {
    font-size: 22px;
    color: var(--color-accent);
}

.channel>span {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.channel__label {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text);
}

.channel__value {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-subtle);
}

.channel__arrow {
    font-size: 18px;
    color: var(--color-subtle);
    transition: color 0.2s ease;
}

.channel:hover .channel__arrow {
    color: var(--color-accent);
}

/* ---------- Terminal ---------- */
.terminal {
    background: rgba(18, 18, 18, 0.9);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: 0 40px 100px -40px rgba(111, 0, 255, 0.5);
}

.terminal__bar {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
}

.terminal__title {
    flex: 1;
    text-align: center;
    margin-right: 47px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-subtle);
}

.contact__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 32px;
}

.field-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.field__label {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-accent);
}

.field__label::before {
    content: '> ';
    color: var(--color-subtle);
}

.field input,
.field select,
.field textarea {
    font-family: var(--font-text);
    font-size: 15px;
    line-height: 1.5;
    color: var(--color-text);
    background: var(--color-bg);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
    padding: 12px 14px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    width: 100%;
}

.field input::placeholder,
.field textarea::placeholder {
    color: var(--color-subtle);
}

.field select {
    appearance: auto;
}

.field select option {
    background: var(--color-surface);
    color: var(--color-text);
}

.field textarea {
    resize: vertical;
    min-height: 140px;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(187, 153, 255, 0.18);
}

.field [aria-invalid='true'] {
    border-color: var(--color-danger);
}

.field__error {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-danger);
}

.contact__error {
    margin: 0;
}

.contact__submit {
    align-self: flex-start;
}

.contact__success {
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.contact__success-line {
    font-family: var(--font-mono);
    font-size: 15px;
    color: var(--color-text);
    margin: 0;
}

.contact__success-line span {
    color: var(--color-success);
    margin-right: 6px;
}

.contact__reset {
    align-self: flex-start;
    background: none;
    border: 0;
    padding: 0;
    margin-top: 12px;
    cursor: pointer;
}

@media (max-width: 960px) {
    .contact {
        grid-template-columns: 1fr;
        gap: 48px;
    }
}

@media (max-width: 560px) {
    .contact__form {
        padding: 22px;
    }

    .field-row {
        grid-template-columns: 1fr;
    }

    .contact__submit {
        align-self: stretch;
    }

    .gs-heading br {
        display: none;
    }
}
</style>

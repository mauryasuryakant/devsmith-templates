<script setup lang="ts">
import ContactForm from "./components/ContactForm.vue";
</script>

<template>
  <main class="contact-page">
    <section class="contact-container">
      <header class="contact-header">
        <p class="contact-label">
          devsmith
        </p>

        <h1 class="contact-title">
          contact-api
        </h1>

        <p class="contact-description">
          This is just a test page to test our lego like approach.
        </p>
      </header>

      <ContactForm />
    </section>
  </main>
</template>
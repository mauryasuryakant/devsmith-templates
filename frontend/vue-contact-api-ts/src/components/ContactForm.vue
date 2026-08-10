<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");

const loading = ref(false);
const responseMessage = ref("");
const success = ref(false);

async function submitForm() {
  loading.value = true;
  responseMessage.value = "";

  try {
    const response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    success.value = true;
    responseMessage.value = data.message;

    name.value = "";
    email.value = "";
    message.value = "";
  } catch (error) {
    success.value = false;

    responseMessage.value =
      error instanceof Error
        ? error.message
        : "Something went wrong.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="contact-form" @submit.prevent="submitForm">
    <div class="form-group">
      <label class="form-label" for="name">
        Name
      </label>

      <input
        id="name"
        v-model="name"
        class="form-input"
        type="text"
        placeholder="Ayush Maurya"
        required
      />
    </div>

    <div class="form-group">
      <label class="form-label" for="email">
        Email
      </label>

      <input
        id="email"
        v-model="email"
        class="form-input"
        type="email"
        placeholder="ayush@example.com"
        required
      />
    </div>

    <div class="form-group">
      <label class="form-label" for="message">
        Message
      </label>

      <textarea
        id="message"
        v-model="message"
        class="form-textarea"
        placeholder="Write your message..."
        required
      />
    </div>

    <button
      class="submit-button"
      type="submit"
      :disabled="loading"
    >
      {{ loading ? "Sending..." : "Send Message" }}
    </button>

    <p
      v-if="responseMessage"
      class="response-message"
      :class="
        success
          ? 'response-success'
          : 'response-error'
      "
    >
      {{ responseMessage }}
    </p>
  </form>
</template>
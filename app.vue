<script lang="ts" setup>
</script>
<template>
  <Html class="font-sans theme.text-primary theme.background"></Html>
  <div>
    <form
      id="form"
      class="font-sans max-w-lg mx-auto mt-12 theme.surface p-6 theme.border"
      action="/api/csv"
      method="POST"
      enctype="multipart/form-data"
    >
      <label class="text-lg font-medium">
        File
        <input id="file" type="file" name="file" />
      </label>
      <button class="theme.button">Submit</button>
    </form>
  </div>
</template>

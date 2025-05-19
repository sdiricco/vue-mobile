<template>
  <ion-page>
    <ion-content>
      <Button label="ciao"></Button>
      <div class="text-6xl">hello</div>

      <div class="flex flex-col gap-12">
        <div class="flex gap-6 flex-wrap">
          <div
            class="rounded-border p-4 border border-transparent flex items-center justify-center bg-primary hover:bg-primary-emphasis text-primary-contrast font-medium flex-auto transition-colors"
          >
            primary
          </div>
          <div
            class="rounded-border p-4 border border-transparent flex items-center justify-center bg-highlight hover:bg-highlight-emphasis font-medium flex-auto transition-colors"
          >
            highlight
          </div>
          <div
            class="rounded-border p-4 border border-surface flex items-center justify-center text-muted-color hover:text-color hover:bg-emphasis font-medium flex-auto transition-colors"
          >
            box
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { Button } from "primevue";
</script>

<template>
    <div id="chat-history">
      <div v-for="(message, index) in messages" :key="index" class="message" 
      :class="{'user-message':index % 2 === 0, 'ai-message':index % 2 !== 0}">
        <MdPreview :modelValue="message" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { MdPreview } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  
  const props = defineProps({
    messages: Array
  });

  </script>
  
  <style scoped>
  #chat-history {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  .message {
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 4px;
    margin-left: 20px;
    margin-right: 20px;
  }
  
  .user-message {
    text-align: right;
  }

  .ai-message {
    text-align: left;
  }
  </style>
  
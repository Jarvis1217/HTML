<template>
    <div id="input-area">
      <textarea 
        v-model="newMessage" 
        placeholder="How can I Help you?" 
        @keydown.enter.exact.prevent="sendMessage"
        @keydown.shift.enter="addNewLine"
      ></textarea>
      <button @click="sendMessage">Send</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const newMessage = ref('');
  const emit = defineEmits(['send-message']);
  
  const sendMessage = () => {
    if (newMessage.value.trim()) {
      emit('send-message', newMessage.value);
      newMessage.value = '';
    }
  };
  
  const addNewLine = (event) => {
    event.preventDefault();
    newMessage.value += '\n';
  };
  </script>
  
  <style scoped>
  #input-area {
    display: flex;
    padding: 10px;
    border-top: 2px solid #ccc;
  }
  
  #input-area textarea {
    flex-grow: 1;
    padding: 8px;
    margin-right: 10px;
    border: 3px solid #ccc;
    border-radius: 4px;
  }
  
  #input-area button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  #input-area button:hover {
    background-color: #0056b3;
  }
  </style>
  
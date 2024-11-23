<template>
  <div id="app">
    <div id="chat-container">
      <ChatHistory :messages="messages" />
      <InputArea @send-message="handleSendMessage" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChatHistory from './components/chatHistory.vue';
import InputArea from './components/inputArea.vue';

const messages = ref([]);

const handleSendMessage = (message) => {
  messages.value.push(message);

  // 模拟AI回复
  setTimeout(() => {
    messages.value.push(
      '### 这是来自AI的回复:\n' +
      '```python\n' +
      '[i for i in range(520) if i % 2 == 0]\n' +
      '```'
    );
  }, 1000);
  

};
</script>

<style>
body, html {
  height: 100%;
  margin: 0;
  overflow: hidden; /* 禁止整体页面滚动 */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#chat-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

#chat-container h1 {
  margin: 20px 0;
}
</style>

<template>
  <div id="app">
    <div id="chat-container">
      <ChatHistory :messages="messages" />
      <InputArea @send-message="handleSendMessage" />
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import ChatHistory from './components/chatHistory.vue';
import InputArea from './components/inputArea.vue';

const messages = ref([]);

// 展示聊天消息
const handleSendMessage = (message) => {
  messages.value.push(message);

  //获取AI回复
  messages.value.push("")
  fetchStreamData(message)
};


const fetchStreamData = async (message) => {
  const response = await fetch(`http://127.0.0.1:8080/chat?message=${encodeURIComponent(message)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let {done = false, value = ""} = {};

  while (!done) {
    ({ done, value } = await reader.read());
    if (value) {
      let chunk = decoder.decode(value, { stream: true });
      chunk = chunk.replaceAll("data:","").slice(0, -2);

      if(chunk.startsWith("\n\n"))
        chunk = chunk.slice(2);

      const numCount = (chunk.match(/\n/g) || []).length;
      if (numCount % 2 === 0) {
        chunk = chunk.replace(/\n{3,}/g, '\n');
      } else {
        chunk = chunk.replace(/\n{3,}/g, '\n\n');
      }

      messages.value.push(messages.value.pop() + chunk);
    }
  }
}

// 页面刷新或关闭时调用 /clear
const clearOnExit = async () => {
  try {
    await fetch('http://127.0.0.1:8080/clear', {
      method: 'GET'
    });
  } catch (error) {
    console.error('Error clearing on exit:', error);
  }
};

// 组件挂载时，添加 beforeunload 事件监听器
onMounted(() => {
  window.addEventListener('beforeunload', clearOnExit);
});

// 组件卸载时，移除 beforeunload 事件监听器
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', clearOnExit);
});
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

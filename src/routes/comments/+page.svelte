<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    let newEmail = '';
    let newMessage = '';
    let messages = writable([]);

    // 从后端获取留言数据
    async function fetchMessages() {
        const response = await fetch('/api/war/comments');
        const data = await response.json();
        messages.set(Array.isArray(data) ? data : []);
    }

    // 添加新的留言
    async function addMessage() {
        if (newEmail.trim() === '' || newMessage.trim() === '') {
            alert('请填写所有字段');
            return;
        }

        const response = await fetch('/api/war/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: newEmail,
                content: newMessage
            })
        });

        if (response.ok) {
            newEmail = '';
            newMessage = '';
            await fetchMessages(); // 刷新留言列表
        } else {
            const error = await response.json();
            alert('提交留言失败: ' + error.error);
        }
    }

    // 页面加载时获取留言数据
    onMount(() => {
        fetchMessages();
    });
</script>

<style>
  .container {
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
  }

  .message-list {
      margin-bottom: 20px;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 8px;
  }

  .message-list-item {
      margin-bottom: 10px;
      position: relative;
  }

  .message-list-item p {
      margin-bottom: 5px;
  }

  .message-date {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 12px;
      color: #666;
  }

  .message-input {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
  }

  .message-input label {
      margin-bottom: 5px;
  }

  .message-input input[type="email"] {
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
  }

  .message-input textarea {
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: vertical;
      width: 100%;
      min-height: 150px;
  }

  .message-input button {
      padding: 8px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      align-self: flex-start;
  }

  .message-input button:hover {
      background-color: #45a049;
  }
</style>

<div class="container">
  <div class="message-list">
      <h2>留言</h2>
      {#each $messages as message}
          <div class="message-list-item" key={message._id}>
              <p><strong>用户:</strong> {message.email}</p>
              <p>{message.content}</p>
              <div class="message-date">{new Date(message.time).toLocaleString()}</div>
          </div>
      {/each}
  </div>

  <div class="message-input">
      <label for="email">留言邮箱：</label>
      <input type="email" id="email" placeholder="输入您的邮箱" bind:value={newEmail}>
      
      <label for="message">留言内容：</label>
      <textarea id="message" placeholder="输入您的留言" bind:value={newMessage}></textarea>
      
      <button on:click={addMessage}>提交留言</button>
  </div>
</div>

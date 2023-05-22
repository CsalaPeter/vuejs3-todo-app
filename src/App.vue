<script setup>
import { ref, onMounted, computed, watch } from "vue";

const todos = ref([]);
const inputContent = ref("");
const todosAsc = computed(() =>
  todos.value.sort((a, b) => {
    return a.createdAt - b.createdAt;
  })
);

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  {
    deep: true,
  }
);

const addTodo = () => {
  if (inputContent.value.trim() === "") {
    return;
  }
  todos.value.push({
    content: inputContent.value,
    done: false,
    createdAt: new Date().getTime(),
  });
  inputContent.value = "";
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});
</script>

<template>
  <main class="app">
    <section class="header">
      <h2 class="title">Greetings User!</h2>
    </section>

    <section class="createTodo">
      <h3>Add todo to your list!</h3>
      <form @submit.prevent="addTodo">
        <input
          type="text"
          placeholder="New todo..."
          name="content"
          id="content"
          v-model="inputContent"
        />
        <input type="submit" value="Add todo" />
      </form>
    </section>

    <section class="todoList">
      <h3>Todo List</h3>
      <div class="list">
        <div v-for="todo in todosAsc" :class="todoItem">
          <label>
            <input type="checkbox" v-model="todo.done" />
          </label>
          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>
          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

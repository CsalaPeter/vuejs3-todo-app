<script setup>
import { ref, onMounted, computed, watch } from "vue";

const newLocal = "bubble business";
const todos = ref([]);
const inputContent = ref("");
const inputCategory = ref(null);
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
    category: inputCategory.value,
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
      <h2 class="title">Your To-Do List</h2>
    </section>

    <div class="todo-body">
      <section class="todo-list">
        <h3>To-Do's</h3>
        <div class="list">
          <div
            v-for="todo in todosAsc"
            :class="`todo-item ${todo.done && 'done'}`"
          >
            <div class="icon-container">
              <v-icon
                v-if="todo.category === 'work'"
                class="work-icon"
                name="md-work"
              />
              <v-icon
                v-else-if="todo.category === 'personal'"
                class="person-icon"
                name="io-person"
              />
            </div>
            <label>
              <input type="checkbox" v-model="todo.done" />
              <span class="bubble"></span>
            </label>
            <div class="todo-content">
              <span class="todo-text" type="text">{{ todo.content }}</span>
            </div>

            <div class="actions">
              <button class="delete" @click="removeTodo(todo)">Delete</button>
            </div>
          </div>
        </div>
      </section>

      <section class="create-todo">
        <h3>Add To-Do to your list!</h3>
        <form @submit.prevent="addTodo">
          <input
            type="text"
            placeholder="New todo..."
            name="content"
            id="content"
            v-model="inputContent"
          />
          <h4>Pick a category!</h4>
          <div class="options">
            <label>
              <input
                type="radio"
                name="category"
                id="category1"
                value="work"
                v-model="inputCategory"
              />
              <span class="bubble work"></span>
              <div>
                Work
                <v-icon class="work-icon" name="md-work" />
              </div>
            </label>

            <label>
              <input
                type="radio"
                name="category"
                id="category2"
                value="personal"
                v-model="inputCategory"
              />
              <span class="bubble personal"></span>
              <div>
                Personal <v-icon class="person-icon" name="io-person" />
              </div>
            </label>
          </div>
          <div class="form-actions">
            <button class="add-button" type="submit">Add todo</button>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>

// To-Do List
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById("taskList").innerHTML = tasks.map((task, index) => `
        <li>
            <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleTask(${index})">
            ${task.text}
            <button onclick="removeTask(${index})">Hapus</button>
        </li>
    `).join("");
}
function addTask() {
    const taskInput = document.getElementById("task").value;
    if (!taskInput) return;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskInput, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("task").value = "";
    loadTasks();
}
function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
window.onload = loadTasks;

// Kalkulator
function calculate(op) {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    let result;
    switch(op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num2 !== 0 ? num1 / num2 : 'Error'; break;
        case '%': result = num1 % num2; break;
        case '**': result = num1 ** num2; break;
        case 'sqrt': result = Math.sqrt(num1); break;
    }
    document.getElementById("result").textContent = result;
}

// Validasi Form
function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let errorMsg = "";
    if (name.length <= 3) errorMsg += "Nama harus lebih dari 3 karakter. ";
    if (!email.includes("@") || !email.includes(".")) errorMsg += "Email tidak valid. ";
    if (password.length < 8) errorMsg += "Password minimal 8 karakter. ";
    document.getElementById("errorMsg").textContent = errorMsg;
    if (!errorMsg) alert("Form berhasil dikirim!");
}
// =========================
// SIGNUP
// =========================
function signup() {

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const referral = document.getElementById("referral").value.trim();

  if (!name || !phone || !email || !password) {
    alert("Please fill all required fields.");
    return;
  }

  if (localStorage.getItem(email)) {
    alert("User already exists.");
    return;
  }

  const user = {
    name,
    phone,
    email,
    password,
    referral,
    balance: 0,
    commission: 0
  };

  localStorage.setItem(email, JSON.stringify(user));

  alert("Registration successful!");
  window.location.href = "index.html";
}


// =========================
// LOGIN
// =========================
function login() {

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const user = JSON.parse(localStorage.getItem(email));

  if (!user) {
    alert("User not found.");
    return;
  }

  if (user.password !== password) {
    alert("Incorrect password.");
    return;
  }

  localStorage.setItem("currentUser", email);
  window.location.href = "dashboard.html";
}


// =========================
// LOGOUT
// =========================
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}


// =========================
// LOAD USERS (ADMIN)
// =========================
function loadUsers() {

  const table = document.getElementById("usersTable");
  const totalUsers = document.getElementById("totalUsers");
  const totalBalance = document.getElementById("totalBalance");

  if (!table) return;

  let count = 0;
  let balanceSum = 0;

  table.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {

    const key = localStorage.key(i);

    if (key === "currentUser") continue;

    const user = JSON.parse(localStorage.getItem(key));

    if (user && user.email) {

      count++;
      balanceSum += Number(user.balance);

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.phone}</td>
        <td>${user.email}</td>
        <td>${user.referral || "-"}</td>
        <td>₵${user.balance}</td>
        <td>₵${user.commission}</td>
        <td>
          <button onclick="deleteUser('${user.email}')"
            style="background:red;color:white;padding:5px;border:none;border-radius:5px;">
            Delete
          </button>
        </td>
      `;

      table.appendChild(row);
    }
  }

  totalUsers.innerText = count;
  totalBalance.innerText = balanceSum;
}


// =========================
// DELETE USER
// =========================
function deleteUser(email) {

  if (confirm("Delete this user?")) {
    localStorage.removeItem(email);
    loadUsers();
  }
}


// =========================
// CHART
// =========================
function loadChart() {

  const canvas = document.getElementById("salesChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [{
        label: "Sales",
        data: [120, 190, 300, 250, 400],
        borderColor: "#00f0ff",
        fill: false
      }]
    }
  });
}
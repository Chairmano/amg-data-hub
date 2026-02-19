function signup() {
  const user = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    referral: document.getElementById("referral").value,
    balance: 0,
    commission: 0
  };

  localStorage.setItem(user.email, JSON.stringify(user));
  alert("Registration successful!");
  window.location.href = "index.html";
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    localStorage.setItem("currentUser", email);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

function loadChart() {
  const ctx = document.getElementById("salesChart").getContext("2d");

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
function loadUsers() {
  const table = document.getElementById("usersTable");
  const totalUsers = document.getElementById("totalUsers");
  const totalBalance = document.getElementById("totalBalance");

  let count = 0;
  let balanceSum = 0;

  table.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key !== "currentUser") {
      const user = JSON.parse(localStorage.getItem(key));

      if (user && user.email) {
        count++;
        balanceSum += Number(user.balance);

        const row = `
          <tr>
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
          </tr>
        `;

        table.innerHTML += row;
      }
    }
  }

  totalUsers.innerText = count;
  totalBalance.innerText = balanceSum;
}

function deleteUser(email) {
  if (confirm("Delete this user?")) {
    localStorage.removeItem(email);
    loadUsers();
  }
}

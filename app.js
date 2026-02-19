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
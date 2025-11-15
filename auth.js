let verificationCode = "";

function toggleForm() {
  document.getElementById("loginForm").classList.toggle("hidden");
  document.getElementById("registerForm").classList.toggle("hidden");
  document.getElementById("formTitle").innerText =
    document.getElementById("loginForm").classList.contains("hidden")
      ? "Đăng ký"
      : "Đăng nhập";
}

// Gửi mã xác thực (giả lập)
function sendVerification() {
  const email = document.getElementById("regEmail").value.trim();
  if (!email || !email.includes("@")) {
    alert("Vui lòng nhập Gmail hợp lệ!");
    return;
  }
  verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  alert("Mã xác thực Gmail của bạn là: " + verificationCode);
  document.getElementById("verifySection").classList.remove("hidden");
}

// Đăng ký
function register() {
  const name = regName.value.trim();
  const email = regEmail.value.trim();
  const phone = regPhone.value.trim();
  const pass = regPass.value.trim();
  const repass = regRePass.value.trim();
  const code = verifyCode.value.trim();
  const age = ageCheck.checked;
  const msg = regMsg;

  if (!name || !email || !phone || !pass || !repass) {
    msg.textContent = "Vui lòng điền đầy đủ thông tin!";
    return;
  }
  if (pass !== repass) {
    msg.textContent = "Mật khẩu không khớp!";
    return;
  }
  if (!age) {
    msg.textContent = "Bạn phải xác nhận đủ 18 tuổi!";
    return;
  }
  if (code !== verificationCode) {
    msg.textContent = "Mã xác thực không đúng!";
    return;
  }
  if (localStorage.getItem(email)) {
    msg.textContent = "Tài khoản đã tồn tại!";
    return;
  }

  const user = { name, email, phone, pass };
  localStorage.setItem(email, JSON.stringify(user));
  msg.textContent = "Đăng ký thành công! Mời bạn đăng nhập.";
  setTimeout(() => {
    toggleForm();
  }, 1000);
}

// Đăng nhập
function handleLogin() {
  const email = loginEmail.value.trim();
  const pass = loginPass.value.trim();
  const msg = loginMsg;

  if (!email || !pass) {
    msg.textContent = "Vui lòng nhập Gmail và mật khẩu!";
    return;
  }
  const stored = localStorage.getItem(email);
  if (!stored) {
    msg.textContent = "Tài khoản không tồn tại!";
    return;
  }
  const user = JSON.parse(stored);
  if (user.pass !== pass) {
    msg.textContent = "Sai mật khẩu!";
    return;
  }

  msg.textContent = "Đăng nhập thành công!";
  localStorage.setItem("currentUser", email);
  setTimeout(() => (window.location.href = "index.html"), 800);
}

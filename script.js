// ================== DANH SÁCH SẢN PHẨM ==================
const products = [
  // Điếu cày
  { id: 1, name: "Điếu cày truyền thống", price: 650000, img: "ảnh/images.jpg", category: "dieu-cay" },
  { id: 2, name: "Điếu cày mini tiện lợi", price: 500000, img: "ảnh/điếu mini.jpg", category: "dieu-cay" },
  { id: 3, name: "Điếu cày trong suốt cao cấp", price: 600000, img: "ảnh/z6173829433638_959b41da89854dc273dbe53c4f028860.jpg", category: "dieu-cay" },
  { id: 4, name: "Điếu cày rút ", price: 550000, img: "ảnh/dieu-cay-mini-rut-nua-2.jpg", category: "dieu-cay" },
  { id: 5, name: "Điếu cày đen cao cấp huyền bí", price: 800000, img: "ảnh/1c71bb62-f0e0-495d-b469-f754c144b940.jpeg", category: "dieu-cay" },

  // Hạt đỗ
  { id: 6, name: "Ruốc trố", price: 80000, img: "ảnh/ruốc trố.jpeg", category: "hat-do" },
  { id: 7, name: "1 hộp thuốc lào Việt", price: 90000, img: "ảnh/hộp thuốc lào Việt.jpg", category: "hat-do" },
  { id: 8, name: "Hạt đỗ say", price: 7000, img: "ảnh/hạt đỗ say.jpg", category: "hat-do" },

  // Bật lửa
  { id: 9, name: "Zippo Việt Nam và các tỉnh thành", price: 400000, img: "ảnh/zippo hình Việt Nam và các tỉnh thành.webp", category: "bat-lua" },
  { id: 10, name: "Zippo Việt Nam họa tiết trống đồng", price: 400000, img: "ảnh/zippo hình Việt nam hoạt tiết trống đồng.jpg", category: "bat-lua" },
  { id: 11, name: "Bật lửa điện khò", price: 300000, img: "ảnh/bật lửa ddienj khò.jpg", category: "bat-lua" },
  { id: 12, name: "Bật lửa khò xúc sắc", price: 10000, img: "ảnh/bật lửa khò xúc sắc.jpg", category: "bat-lua" },
  { id: 13, name: "Bật lửa thống nhất", price: 7000, img: "ảnh/bật lửa thoonngs nhất.jpg", category: "bat-lua" }
];


// ================== HIỂN THỊ SẢN PHẨM ==================
function renderProducts(list) {
  const productList = document.getElementById("productList");
  if (!productList) return; // phòng trường hợp trang không có productList

  productList.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "col-10 col-sm-6 col-md-4 col-lg-3 fade-item";
    card.innerHTML = `
      <div class="card bg-secondary text-light shadow-lg h-100 product-card">
        <img src="${p.img}" class="card-img-top" alt="${p.name}">
        <div class="card-body text-center">
          <h6 class="card-title">${p.name}</h6>
          <p class="card-text text-danger fw-bold">${p.price.toLocaleString("vi-VN")}đ</p>
          <button class="btn btn-outline-danger btn-sm" onclick="addToCart(${p.id})">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>`;
    productList.appendChild(card);
  });
  fadeInItems();
}

// Hiệu ứng mượt khi xuất hiện sản phẩm
function fadeInItems() {
  const items = document.querySelectorAll(".fade-item");
  items.forEach((item, i) => {
    item.style.opacity = 0;
    item.style.transform = "translateY(10px)";
    setTimeout(() => {
      item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      item.style.opacity = 1;
      item.style.transform = "translateY(0)";
    }, i * 100);
  });
}

// Lọc theo danh mục (nếu dùng ở products.html)
function filterCategory(category) {
  if (category === "all") renderProducts(products);
  else renderProducts(products.filter(p => p.category === category));
}


// ================== TÌM KIẾM ==================
// Dùng cho thanh search trên navbar: lưu keyword rồi chuyển sang products.html
function searchProduct(event) {
  event.preventDefault();
  const input = document.getElementById("searchInput");
  if (!input) return;

  const keyword = input.value.trim();
  if (!keyword) return;

  localStorage.setItem("searchKeyword", keyword);
  window.location.href = "products.html";
}


// ================== GIỎ HÀNG ==================

// Cập nhật số sản phẩm trên icon Giỏ hàng 🛒
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = 0;
  cart.forEach(p => {
    totalItems += p.quantity || 1;
  });

  const badge = document.getElementById("cartCount");
  if (badge) {
    badge.textContent = totalItems > 0 ? totalItems : "";
  }
}

// Thêm vào giỏ hàng (có quantity, cộng dồn nếu đã có)
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id === id);

  if (index >= 0) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} đã được thêm vào giỏ hàng!`);
}


// ================== KHI LOAD MỖI TRANG ==================
document.addEventListener("DOMContentLoaded", () => {
  // Luôn update badge giỏ hàng (nếu có trong navbar)
  updateCartCount();

  // Chỉ render sản phẩm nếu trang này có #productList
  const productList = document.getElementById("productList");
  if (!productList) return;

  const keyword = localStorage.getItem("searchKeyword");
  if (keyword) {
    localStorage.removeItem("searchKeyword");
    const lower = keyword.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(lower));
    renderProducts(filtered);
  } else {
    renderProducts(products);
  }
});

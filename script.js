// ✅ Toggle mobile menu
function toggleMenu() {
  const nav = document.querySelector('.navbar nav');
  nav.classList.toggle('active');
}

// ✅ Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// ✅ Swipe support for carousel
const track = document.querySelector('.carousel-track');
if (track) {
  let startX = 0;
  let currentTranslate = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchmove', (e) => {
    const deltaX = e.touches[0].clientX - startX;
    track.style.transform = `translateX(${currentTranslate + deltaX}px)`;
  });

  track.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - startX;
    if (Math.abs(deltaX) > 50) {
      currentTranslate += deltaX > 0 ? 100 : -100;
    }
    track.style.transition = 'transform 0.3s ease';
    track.style.transform = `translateX(${currentTranslate}px)`;
    setTimeout(() => (track.style.transition = ''), 300);
  });
}

// ✅ Show Toast Message
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ✅ Booking Form Submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const bookingData = {
      name: document.getElementById('fullName').value,
      gmail: document.getElementById('gmail').value,
      whatsapp: document.getElementById('whatsapp').value,
      phone: document.getElementById('phone').value,
      package: document.getElementById('package').value,
      travelDate: document.getElementById('travelDate').value,
    };

    const spinner = document.getElementById('bookingSpinner');
    if (spinner) spinner.style.display = 'block';

    try {
      const res = await fetch('http://localhost:5000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (spinner) spinner.style.display = 'none';

      showToast(res.ok ? '✅ Booking Confirmed!' : '❌ Booking Failed');
      bookingForm.reset();
    } catch (error) {
      if (spinner) spinner.style.display = 'none';
      showToast('⚠ Network Error');
    }
  });
}


// ✅ Admin Panel: Load and Display Messages
async function loadData() {
  const tbody = document.querySelector('#dataTable tbody');
  if (!tbody) return;
  tbody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

  try {
    const res = await fetch('http://localhost:5000/api/bookings/all');
    const data = await res.json();

    tbody.innerHTML = '';
    if (data.length === 0) {
      tbody.innerHTML = "<tr><td colspan='5'>No messages yet</td></tr>";
      return;
    }

    data.forEach((item) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.email || item.gmail || '-'}</td>
        <td>${item.message || 'No message'}</td>
        <td>${new Date(item.createdAt).toLocaleString()}</td>
        <td><button onclick="deleteMsg('${item._id}')">🗑 Delete</button></td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    tbody.innerHTML = "<tr><td colspan='5'>Error fetching data</td></tr>";
  }
}

async function deleteMsg(id) {
  if (!confirm('Delete this message?')) return;

  try {
    await fetch(`http://localhost:5000/api/bookings/${id}`, { method: 'DELETE' });
    showToast('🗑 Message Deleted');
    loadData();
  } catch (err) {
    alert('Failed to delete message');
  }
}

window.onload = loadData;

// ✅ Smooth Scroll
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ✅ Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const status = document.querySelector('.status');

    status.textContent = 'Sending...';
    status.style.color = '#48afe6';

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (data.success) {
        status.textContent = '✅ Message sent successfully!';
        status.style.color = 'green';
        contactForm.reset();
      } else {
        status.textContent = '⚠ ' + (data.error || 'Something went wrong!');
        status.style.color = 'orange';
      }
    } catch (error) {
      status.textContent = '❌ Unable to connect to the server.';
      status.style.color = 'red';
    }

    status.classList.add('fade-in');
    setTimeout(() => status.classList.remove('fade-in'), 3000);
  });
}
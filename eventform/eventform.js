'use strict';

// ── Field registry ──────────────────────────────────────────────

const fields = {
  firstName:  { el: document.getElementById('firstName'),  err: document.getElementById('firstNameErr') },
  lastName:   { el: document.getElementById('lastName'),   err: document.getElementById('lastNameErr') },
  email:      { el: document.getElementById('email'),      err: document.getElementById('emailErr') },
  type:       { el: document.getElementById('type'),       err: document.getElementById('typeErr') },
  eventDate:  { el: document.getElementById('eventDate'),  err: document.getElementById('eventDateErr') },
  studentId:  { el: document.getElementById('studentId'),  err: document.getElementById('studentIdErr') },
  accessCode: { el: document.getElementById('accessCode'), err: document.getElementById('accessCodeErr') },
};

const studentRow = document.getElementById('studentRow');
const guestRow   = document.getElementById('guestRow');
const ticketCard = document.getElementById('ticketCard');
const ticketBody = document.getElementById('ticketBody');

// ── Date: set min to tomorrow ───────────────────────────────────

function getTomorrowString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0]; // "YYYY-MM-DD"
}

fields.eventDate.el.setAttribute('min', getTomorrowString());

// ── Student ID: numbers only, max 9 digits ──────────────────────

fields.studentId.el.addEventListener('input', () => {
  // Strip any non-digit characters as the user types
  fields.studentId.el.value = fields.studentId.el.value.replace(/\D/g, '').slice(0, 9);
});

// ── Conditional field visibility ────────────────────────────────

function updateConditionalFields() {
  const type = fields.type.el.value;

  if (type === 'student') {
    studentRow.classList.add('visible');
  } else {
    studentRow.classList.remove('visible');
    clearField(fields.studentId);
  }

  if (type === 'guest') {
    guestRow.classList.add('visible');
  } else {
    guestRow.classList.remove('visible');
    clearField(fields.accessCode);
  }
}

fields.type.el.addEventListener('change', updateConditionalFields);

// ── Helpers ─────────────────────────────────────────────────────

function setError(field, message) {
  field.err.textContent = message;
  field.el.classList.add('error');
}

function clearError(field) {
  field.err.textContent = '';
  field.el.classList.remove('error');
}

function clearField(field) {
  field.el.value = '';
  clearError(field);
}

// ── Validation ──────────────────────────────────────────────────

function validate() {
  let valid = true;

  // First name
  if (!fields.firstName.el.value.trim()) {
    setError(fields.firstName, 'First name is required.');
    valid = false;
  } else {
    clearError(fields.firstName);
  }

  // Last name
  if (!fields.lastName.el.value.trim()) {
    setError(fields.lastName, 'Last name is required.');
    valid = false;
  } else {
    clearError(fields.lastName);
  }

  // Email
  const emailVal = fields.email.el.value.trim();
  if (!emailVal) {
    setError(fields.email, 'Email is required.');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    setError(fields.email, 'Enter a valid email address.');
    valid = false;
  } else {
    clearError(fields.email);
  }

  // Ticket type
  if (!fields.type.el.value) {
    setError(fields.type, 'Please choose a ticket type.');
    valid = false;
  } else {
    clearError(fields.type);
  }

  // Event date — must exist and be strictly in the future
  const dateVal = fields.eventDate.el.value;
  if (!dateVal) {
    setError(fields.eventDate, 'Event date is required.');
    valid = false;
  } else {
    const selected = new Date(dateVal + 'T00:00:00');
    const today    = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected <= today) {
      setError(fields.eventDate, 'Date must be in the future.');
      valid = false;
    } else {
      clearError(fields.eventDate);
    }
  }

  // Student ID — required, exactly 9 digits
  if (fields.type.el.value === 'student') {
    const sid = fields.studentId.el.value.trim();
    if (!sid) {
      setError(fields.studentId, 'Student ID is required.');
      valid = false;
    } else if (!/^\d{9}$/.test(sid)) {
      setError(fields.studentId, 'Student ID must be exactly 9 digits.');
      valid = false;
    } else {
      clearError(fields.studentId);
    }
  }

  // Access code — required for guests
  if (fields.type.el.value === 'guest') {
    if (!fields.accessCode.el.value.trim()) {
      setError(fields.accessCode, 'Access code is required.');
      valid = false;
    } else {
      clearError(fields.accessCode);
    }
  }

  return valid;
}

// ── Render ticket info card ──────────────────────────────────────

function renderTicket() {
  const typeEl   = fields.type.el;
  const typeText = typeEl.options[typeEl.selectedIndex].text;
  const date     = new Date(fields.eventDate.el.value + 'T00:00:00')
    .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const rows = [
    ['Name',  `${fields.firstName.el.value.trim()} ${fields.lastName.el.value.trim()}`],
    ['Email', fields.email.el.value.trim()],
    ['Type',  typeText],
    ['Date',  date],
  ];

  if (fields.type.el.value === 'student') {
    rows.push(['Student ID', fields.studentId.el.value.trim()]);
  }
  if (fields.type.el.value === 'guest') {
    rows.push(['Access Code', fields.accessCode.el.value.trim()]);
  }

  ticketBody.innerHTML = rows.map(([label, value]) =>
    `<span class="ticket-label">${label}</span><span class="ticket-value">${value}</span>`
  ).join('');

  ticketCard.classList.add('visible');
}

// ── Submit ───────────────────────────────────────────────────────

document.getElementById('submitBtn').addEventListener('click', () => {
  ticketCard.classList.remove('visible');

  if (!validate()) return;

  renderTicket();

  // Reset form
  Object.values(fields).forEach(f => clearField(f));
  updateConditionalFields();

  // Scroll ticket into view smoothly
  ticketCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
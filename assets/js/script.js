/**
 * Kartikey Singh - Personal Portfolio Website
 * Subject: IT4048 - Version Control with Git and GitHub
 * Enrollment: 202503103510392
 * JavaScript Controller & Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check URL parameters for direct view/testing
  const urlParams = new URLSearchParams(window.location.search);
  const forcedTheme = urlParams.get('theme');
  if (forcedTheme) {
    localStorage.setItem('kartikey_portfolio_theme', forcedTheme);
  }

  initThemeToggle();
  initNavigation();
  initProjectFiltering();
  initContactForm();
  initClipboardCopy();
  initBackToTop();
  initModal();

  const targetSection = urlParams.get('section');
  if (targetSection) {
    const el = document.getElementById(targetSection);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, 50);
    }
  }
});

/* --------------------------------------------------------------------------
   1. Theme Management (Light / Dark Mode with Persistence)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  const savedTheme = localStorage.getItem('kartikey_portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark');

  setTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kartikey_portfolio_theme', theme);
    themeToggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
  }
}

/* --------------------------------------------------------------------------
   2. Navigation, Mobile Drawer & Active Section Observer
   -------------------------------------------------------------------------- */
function initNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      hamburgerBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      }
    });

    navItems.forEach((link) => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      });
    });
  }

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navItems.forEach((item) => {
            const href = item.getAttribute('href');
            if (href === `#${currentId}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }
}

/* --------------------------------------------------------------------------
   3. Interactive Project Filtering
   -------------------------------------------------------------------------- */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Contact Form Validation & Mailto Fallback Engine
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusBox = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    let isValid = true;

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showError(nameInput, 'Please enter your full name (at least 2 characters).');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message should contain at least 10 characters.');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) return;

    const toEmail = '25amtics392@gmail.com';
    const senderName = encodeURIComponent(nameInput.value.trim());
    const subject = encodeURIComponent(subjectInput.value.trim() || `Portfolio Contact from ${nameInput.value.trim()}`);
    const body = encodeURIComponent(
      `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
    );

    const mailtoUrl = `mailto:${toEmail}?subject=${subject}&body=${body}`;

    if (statusBox) {
      statusBox.className = 'form-status info';
      statusBox.innerHTML = `
        <strong>Opening your email client...</strong><br>
        Because GitHub Pages is a static host, this form routes your message through your preferred email application directly to <code>${toEmail}</code>.
      `;
      statusBox.style.display = 'block';
    }

    window.location.href = mailtoUrl;

    setTimeout(() => {
      if (statusBox) {
        statusBox.className = 'form-status success';
        statusBox.innerHTML = `
          <strong>Ready to send!</strong> If your email application didn't open automatically, you can directly email <a href="mailto:${toEmail}" style="text-decoration:underline;">${toEmail}</a>.
        `;
      }
    }, 2000);
  });

  function showError(inputElement, message) {
    const group = inputElement.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    const errorEl = group.querySelector('.form-error-msg');
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(inputElement) {
    const group = inputElement.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
  }
}

/* --------------------------------------------------------------------------
   5. Clipboard Copy Utility (1-Click Email Copy)
   -------------------------------------------------------------------------- */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.backgroundColor = 'var(--accent-emerald)';
        btn.style.color = '#ffffff';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 2200);
      } catch (err) {
        console.error('Failed to copy to clipboard', err);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.pointerEvents = 'auto';
    } else {
      backToTopBtn.style.opacity = '0.6';
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   7. Project Details Modal System
   -------------------------------------------------------------------------- */
const projectDatabase = {
  rtrae: {
    title: 'Real-Time Resource Allocation Engine (RTRAE)',
    category: 'Full-Stack Web Application',
    status: 'Verified Project in Workspace',
    repoUrl: 'https://github.com/kartikeysingh-SK/resource-allocation',
    summary: 'A full-stack resource management and scheduling system built with PHP and MySQL backend, featuring automated resource assignment, dynamic analytics dashboards, audit logs, and natural language allocation assistance.',
    highlights: [
      'Engineered automated task scheduling with conflict detection across users and assets.',
      'Designed role-based access control (Admin, Manager, Staff) with session authentication.',
      'Implemented dynamic analytics charts and audit logs for administrative tracking.',
      'Configured for Vercel and cloud-compatible database deployment.'
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'REST API', 'Vercel']
  },
  grocery: {
    title: 'Smart Grocery Shopkeeper Management System',
    category: 'Full-Stack Web Application / Academic Project',
    status: 'Verified Project in Workspace',
    repoUrl: 'https://github.com/kartikeysingh-SK/deepak-tempo-ptms-main',
    summary: 'A responsive digital ledger (Udhar / Khata) web application designed for local retail merchants to eliminate notebook-based bookkeeping, calculate real-time credit balances, and generate digital customer statements.',
    highlights: [
      'Interactive shopkeeper dashboard with daily credit and settlement summaries.',
      'Customer-wise ledger with automatic balance computation upon transaction entry.',
      'Digital udhar statement generation ready for printing or WhatsApp sharing.',
      'Modular client-side architecture backed by Express.js API services.'
    ],
    tech: ['Node.js', 'Express.js', 'JavaScript', 'HTML5/CSS3', 'RESTful API']
  },
  portfolio: {
    title: 'Personal Portfolio Website (IT4048 Mini Project)',
    category: 'Frontend & Version Control Project',
    status: 'Active Repository',
    repoUrl: 'https://github.com/kartikeysingh-SK/KartikeySingh_PortfolioWebsite',
    summary: 'A modern, accessible developer portfolio website engineered with clean semantic HTML5, custom CSS design system with light/dark theme toggles, and vanilla JavaScript without external bloat.',
    highlights: [
      'Custom CSS3 design tokens supporting high-contrast Dark and Light modes.',
      'Fluid responsiveness tested across mobile (375px), tablet (768px), and desktop (1200px+).',
      'Accessible semantic structure, keyboard navigation, and reduced-motion awareness.',
      'Complete Git and GitHub Pages continuous deployment pipeline.'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub Pages']
  },
  ptms: {
    title: 'Parcel Transport Management System (PTMS)',
    category: 'Academic Concept & Prototype',
    status: 'Sample / Academic Blueprint',
    repoUrl: '',
    summary: 'A conceptual parcel tracking and logistics management platform for handling consignment bookings, shipment transit states, and delivery status verification.',
    highlights: [
      'Designed consignment intake workflows and automated consignment ID generation.',
      'Transit route milestones and delivery checkpoint tracking model.',
      'Clear status indicators for In-Transit, Out for Delivery, and Completed.',
      'Identified as an academic prototype for student customization.'
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Workflow Modeling']
  }
};

function initModal() {
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalSummary = document.getElementById('modal-summary');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalTech = document.getElementById('modal-tech');
  const modalRepoBtn = document.getElementById('modal-repo-btn');
  const modalCloseBtn = document.getElementById('modal-close');

  if (!modalOverlay) return;

  const detailButtons = document.querySelectorAll('.view-project-details-btn');
  detailButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectDatabase[projKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalCategory.textContent = `${data.category} • ${data.status}`;
      modalSummary.textContent = data.summary;

      modalHighlights.innerHTML = data.highlights
        .map((h) => `<li><span style="color:var(--accent-cyan);margin-right:6px;">✓</span>${h}</li>`)
        .join('');

      modalTech.innerHTML = data.tech
        .map((t) => `<span class="tech-tag">${t}</span>`)
        .join('');

      if (data.repoUrl) {
        modalRepoBtn.href = data.repoUrl;
        modalRepoBtn.style.display = 'inline-flex';
      } else {
        modalRepoBtn.style.display = 'none';
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

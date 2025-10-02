// Global variables
    let isSubmitting = false;

    // DOM Elements
    const contactForm = document.getElementById('contactForm');
    const feedbackForm = document.getElementById('feedbackForm');
    const statusMessages = document.getElementById('statusMessages');
    const apiResults = document.getElementById('apiResults');
    const ratingSlider = document.getElementById('rating');
    const ratingValue = document.getElementById('ratingValue');
    const themeToggle = document.getElementById('themeToggle');

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        initializeForms();
        setupEventListeners();
        initializeTheme();
    });

    function initializeTheme() {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.add(savedTheme + '-theme');
        themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';

        // Theme toggle event listener
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.body.classList.remove(currentTheme + '-theme');
            document.body.classList.add(newTheme + '-theme');
            themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
            
            localStorage.setItem('theme', newTheme);
        });
    }

    function initializeForms() {
        // Update rating display
        if (ratingSlider && ratingValue) {
            ratingSlider.addEventListener('input', () => {
                ratingValue.textContent = ratingSlider.value;
            });
        }
    }

    function setupEventListeners() {
        // Contact form submission
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await submitContactForm();
            });

            // Real-time validation for contact form inputs
            const contactInputs = contactForm.querySelectorAll('input, textarea');
            contactInputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    const { isValid, message } = validateField(e.target.name, e.target.value);
                    const errorElement = document.getElementById(`${e.target.name}Error`);
                    if (errorElement) {
                        errorElement.textContent = isValid ? '' : message;
                        errorElement.style.display = isValid ? 'none' : 'block';
                    }
                });
            });
        }

        // Feedback form submission
        if (feedbackForm) {
            feedbackForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await submitFeedbackForm();
            });

            // Real-time validation for feedback form inputs
            const feedbackInputs = feedbackForm.querySelectorAll('input, textarea');
            feedbackInputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    const { isValid, message } = validateField(e.target.name, e.target.value);
                    const errorElement = document.getElementById(`${e.target.name}Error`);
                    if (errorElement) {
                        errorElement.textContent = isValid ? '' : message;
                        errorElement.style.display = isValid ? 'none' : 'block';
                    }
                });
            });
        }
    }

    function validateField(fieldName, value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{9,10}$/;

        switch (fieldName) {
            case 'name':
                if (!value) return { isValid: false, message: 'Name is required' };
                if (value.length < 2) return { isValid: false, message: 'Name must be at least 2 characters' };
                if (value.length > 100) return { isValid: false, message: 'Name must not exceed 100 characters' };
                return { isValid: true, message: '' };

            case 'email':
                if (!value) return { isValid: false, message: 'Email is required' };
                if (!emailRegex.test(value)) return { isValid: false, message: 'Invalid email format' };
                return { isValid: true, message: '' };

            case 'subject':
                if (!value) return { isValid: false, message: 'Subject is required' };
                if (value.length < 5) return { isValid: false, message: 'Subject must be at least 5 characters' };
                if (value.length > 200) return { isValid: false, message: 'Subject must not exceed 200 characters' };
                return { isValid: true, message: '' };

            case 'message':
                if (!value) return { isValid: false, message: 'Message is required' };
                if (value.length < 10) return { isValid: false, message: 'Message must be at least 10 characters' };
                if (value.length > 1000) return { isValid: false, message: 'Message must not exceed 1000 characters' };
                return { isValid: true, message: '' };

            case 'phone':
                if (value && !phoneRegex.test(value)) return { isValid: false, message: 'Invalid phone number (9-10 digits)' };
                return { isValid: true, message: '' };

            case 'company':
                if (value && value.length > 100) return { isValid: false, message: 'Company must not exceed 100 characters' };
                return { isValid: true, message: '' };

            case 'rating':
                const rating = parseInt(value);
                if (!value || isNaN(rating)) return { isValid: false, message: 'Rating is required' };
                if (rating < 1 || rating > 5) return { isValid: false, message: 'Rating must be between 1 and 5' };
                return { isValid: true, message: '' };

            case 'comment':
                if (!value) return { isValid: false, message: 'Comment is required' };
                if (value.length < 5) return { isValid: false, message: 'Comment must be at least 5 characters' };
                if (value.length > 500) return { isValid: false, message: 'Comment must not exceed 500 characters' };
                return { isValid: true, message: '' };

            default:
                return { isValid: true, message: '' };
        }
    }

    async function submitContactForm() {
        if (isSubmitting) return;
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            isSubmitting = true;
            updateSubmitButton('contactSubmit', 'กำลังส่ง...', true);
            
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showStatusMessage('✅ ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็ว', 'success');
                contactForm.reset();
            } else {
                showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, 'error');
                if (result.errors) {
                    displayValidationErrors(result.errors);
                }
            }
        } catch (error) {
            showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
            console.error('Error:', error);
        } finally {
            isSubmitting = false;
            updateSubmitButton('contactSubmit', 'ส่งข้อความ', false);
        }
    }

    async function submitFeedbackForm() {
        if (isSubmitting) return;
        
        const formData = new FormData(feedbackForm);
        const data = Object.fromEntries(formData.entries());
        data.rating = parseInt(data.rating);
        
        try {
            isSubmitting = true;
            updateSubmitButton('feedbackSubmit', 'กำลังส่ง...', true);
            
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showStatusMessage('✅ ส่งความคิดเห็นสำเร็จ! ขอบคุณสำหรับความคิดเห็น', 'success');
                feedbackForm.reset();
                ratingValue.textContent = '3'; // Reset rating display
            } else {
                showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, 'error');
                if (result.errors) {
                    displayValidationErrors(result.errors);
                }
            }
        } catch (error) {
            showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
            console.error('Error:', error);
        } finally {
            isSubmitting = false;
            updateSubmitButton('feedbackSubmit', 'ส่งความคิดเห็น', false);
        }
    }

    function showStatusMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `status-message ${type}`;
        messageDiv.textContent = message;
        
        statusMessages.appendChild(messageDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    function updateSubmitButton(buttonId, text, disabled) {
        const button = document.getElementById(buttonId);
        button.textContent = text;
        button.disabled = disabled;
    }

    function displayValidationErrors(errors) {
        errors.forEach(error => {
            showStatusMessage(`🔸 ${error}`, 'error');
        });
    }

    async function loadContacts() {
        try {
            apiResults.textContent = 'Loading contacts...';
            const response = await fetch('/api/contact?page=1&limit=10');
            const result = await response.json();
            
            if (result.success) {
                apiResults.textContent = JSON.stringify(result.data, null, 2);
            } else {
                apiResults.textContent = `Error: ${result.message}`;
            }
        } catch (error) {
            apiResults.textContent = 'Error loading contacts: ' + error.message;
        }
    }

    async function loadFeedbackStats() {
        try {
            apiResults.textContent = 'Loading feedback stats...';
            const response = await fetch('/api/feedback/stats');
            const result = await response.json();
            
            if (result.success) {
                apiResults.textContent = JSON.stringify(result.stats, null, 2);
            } else {
                apiResults.textContent = `Error: ${result.message}`;
            }
        } catch (error) {
            apiResults.textContent = 'Error loading feedback stats: ' + error.message;
        }
    }

    async function loadAPIStatus() {
        try {
            apiResults.textContent = 'Loading API status...';
            const response = await fetch('/api/status');
            const result = await response.json();
            
            if (result.success) {
                apiResults.textContent = JSON.stringify(result, null, 2);
            } else {
                apiResults.textContent = `Error: ${result.message}`;
            }
        } catch (error) {
            apiResults.textContent = 'Error loading API status: ' + error.message;
        }
    }

    async function loadAPIDocs() {
        try {
            apiResults.textContent = 'Loading API docs...';
            const response = await fetch('/api/docs');
            const data = await response.json();
            apiResults.textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            apiResults.textContent = 'Error loading API docs: ' + error.message;
        }
    }
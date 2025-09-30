// Contact functionality
function initializeContact() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        setupContactForm(contactForm);
    }
    
    setupLiveChat();
}

function setupContactForm(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateContactForm(form)) {
            const submitBtn = form.querySelector('#submit-contact');
            const submitText = form.querySelector('#submit-text');
            const submitSpinner = form.querySelector('#submit-spinner');
            
            setLoadingState(submitBtn, submitText, submitSpinner, true);
            
            try {
                await submitContactForm(form);
                showSuccessMessage(form);
                form.reset();
            } catch (error) {
                showAlert(form, 'Failed to send message. Please try again.', 'error');
            } finally {
                setLoadingState(submitBtn, submitText, submitSpinner, false);
            }
        }
    });
}

function setupLiveChat() {
    const liveChatBtn = document.getElementById('live-chat-btn');
    const liveChatWidget = document.getElementById('live-chat-widget');
    
    if (liveChatBtn && liveChatWidget) {
        liveChatBtn.addEventListener('click', () => {
            liveChatWidget.classList.toggle('hidden');
        });
    }
}

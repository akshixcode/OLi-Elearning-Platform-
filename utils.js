// Utility functions
function setLoadingState(button, textElement, spinnerElement, isLoading) {
    if (isLoading) {
        button.disabled = true;
        textElement.textContent = 'Loading...';
        spinnerElement.classList.remove('hidden');
    } else {
        button.disabled = false;
        textElement.textContent = 'Submit';
        spinnerElement.classList.add('hidden');
    }
}

function showAlert(form, message, type) {
    let alertElement = form.querySelector('.alert');
    if (!alertElement) {
        alertElement = document.createElement('div');
        alertElement.className = `alert alert-${type}`;
        form.insertBefore(alertElement, form.firstChild);
    }
    
    alertElement.textContent = message;
    alertElement.classList.remove('hidden');
    
    setTimeout(() => {
        alertElement.classList.add('hidden');
    }, 5000);
}

function showSuccessMessage(form) {
    const successElement = form.querySelector('.success-message');
    if (successElement) {
        successElement.textContent = 'Message sent successfully!';
        successElement.style.display = 'block';
        
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 5000);
    }
}

function validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showInputError(input, 'Email is required');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showInputError(input, 'Please enter a valid email address');
        return false;
    }
    
    clearInputError(input);
    return true;
}

function showInputError(input, message) {
    input.classList.add('input-error');
    
    let errorElement = input.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearInputError(input) {
    input.classList.remove('input-error');
    
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// LocalStorage utilities
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },
    
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
};

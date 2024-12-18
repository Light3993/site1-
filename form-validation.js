// Validation du formulaire
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    // Règles de validation
    const validationRules = {
        nom: {
            pattern: /^[a-zA-ZÀ-ÿ\s]{2,}$/,
            message: 'Le nom doit contenir au moins 2 caractères et uniquement des lettres'
        },
        prenoms: {
            pattern: /^[a-zA-ZÀ-ÿ\s]{2,}$/,
            message: 'Les prénoms doivent contenir au moins 2 caractères et uniquement des lettres'
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Veuillez entrer une adresse email valide'
        },
        telephone: {
            pattern: /^\+?[\d\s-]{8,}$/,
            message: 'Veuillez entrer un numéro de téléphone valide'
        }
    };

    // Validation en temps réel
    Object.keys(validationRules).forEach(fieldName => {
        const input = form.querySelector(`#${fieldName}`);
        if (input) {
            input.addEventListener('input', () => {
                validateField(input, validationRules[fieldName]);
            });
        }
    });

    // Validation d'un champ
    function validateField(input, rule) {
        const isValid = rule.pattern.test(input.value);
        const errorElement = input.parentElement.querySelector('.error-message');
        
        if (!isValid) {
            if (!errorElement) {
                const error = document.createElement('span');
                error.className = 'error-message';
                error.textContent = rule.message;
                input.parentElement.appendChild(error);
            }
            input.classList.add('invalid');
        } else {
            if (errorElement) {
                errorElement.remove();
            }
            input.classList.remove('invalid');
        }
        
        return isValid;
    }

    // Soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validation de tous les champs
        Object.keys(validationRules).forEach(fieldName => {
            const input = form.querySelector(`#${fieldName}`);
            if (input) {
                if (!validateField(input, validationRules[fieldName])) {
                    isValid = false;
                }
            }
        });

        // Validation de la photo
        const photoInput = document.getElementById('photo');
        if (!photoInput.files || !photoInput.files[0]) {
            showToast('Veuillez sélectionner une photo', 'error');
            isValid = false;
        }

        if (isValid) {
            // Simulation d'envoi du formulaire
            showToast('Inscription réussie !', 'success');
            
            // Réinitialisation du formulaire après 2 secondes
            setTimeout(() => {
                form.reset();
                document.getElementById('previewImage').src = 'assets/placeholder.png';
            }, 2000);
        }
    });
});
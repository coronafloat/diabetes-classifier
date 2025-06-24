import Swal from 'sweetalert2';

// Success notification
export const showSuccessAlert = (title, message, options = {}) => {
    return Swal.fire({
        title,
        text: message,
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 2000,
        showConfirmButton: true,
        confirmButtonColor: '#10B981',
        ...options
    });
};

// Error notification
export const showErrorAlert = (title, message, options = {}) => {
    return Swal.fire({
        title,
        text: message,
        icon: 'error',
        confirmButtonText: 'Coba Lagi',
        confirmButtonColor: '#EF4444',
        ...options
    });
};

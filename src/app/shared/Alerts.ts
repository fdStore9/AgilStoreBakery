import Swal, { SweetAlertIcon } from 'sweetalert2';
export class SweetAlert {
    showAlert(title: string, icon: SweetAlertIcon, text: string) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            timer: 2000
        });
    }
}
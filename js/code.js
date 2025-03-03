const link_project = document.querySelectorAll('.link_project')

function CreateModal() {
    Swal.fire({
        title: 'En proceso',
        text: 'El diseño aún está en proceso',
        icon: 'info',
        confirmButtonColor: '#009ed0',
        background: '#161922',
        color: '#fff',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: {
            popup: 'custom-alert',
            title: 'custom-title',
            content: 'custom-content',
            timerProgressBar: 'custom-progress'
        }
    });
}

link_project.forEach(link => {
    link.addEventListener('click', () => { CreateModal() })
})

// MODAL
document.addEventListener('DOMContentLoaded', () => {
    const show_modal_vendex = document.getElementById('show-modal-vendex')
    const modal_vendex = document.getElementById('modal-vendex')

    show_modal_vendex.addEventListener('click', () => {
        modal_vendex.style.display = 'block'
    })

    setTimeout(() => {
        modal_vendex.style = 'display: none'
    }, 30000)

    // Alert para los content_name_slogan
    const projectContents = document.querySelectorAll('.content_name_slogan')
    projectContents.forEach(content => {
        content.addEventListener('click', () => {
            CreateModal()
        })
    })

    // Alert para los events-none
    const eventsNoneButtons = document.querySelectorAll('.events-none')
    eventsNoneButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            CreateModal()
        })
    })
})
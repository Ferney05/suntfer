
const psyco = document.getElementById('psyco')
const enrollnow = document.getElementById('enrollnow')
const vendex = document.getElementById('vendex')

const alert_psyco = document.getElementById('alert-psicorientation')
const alert_enrollnow = document.getElementById('alert-enrollnow')
const alert_vendex = document.getElementById('alert-vendex')


function CreateModal(text_alert){
    text_alert.innerText = 'El diseño está en proceso'

    setTimeout(() => {
        text_alert.style = 'display: none'
    }, 5000)
}

vendex.addEventListener('click', () => { CreateModal(alert_vendex) })
psyco.addEventListener('click', () => { CreateModal(alert_psyco) })
enrollnow.addEventListener('click', () => { CreateModal(alert_enrollnow) })



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
})
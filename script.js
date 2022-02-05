let counterInterval;
const MAX_SECONDS = 20;

const modal = {
    id: 'modal',
    active: false,
    text: '<p id="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde vitae asperiores aspernatur blanditiis animi natus officiis sit nihil ratione incidunt.</p>',
    toggleState() {
        this.active = !this.active;
    }
}

const drawItems = (parent, children) => {
    children.forEach(x => parent.appendChild(x))
}

const createButton = (id, text) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.dataset.id=id;
    return button;
}

const createModal = (modal) => {
    const element = document.createElement('div');
    element.dataset.id = 'modal-wrapper';
    const modalHolder = document.createElement('div');
    modalHolder.dataset.id = modal.id;
    const hr = document.createElement('hr');
    const destroyText = document.createElement('p');
    destroyText.innerHTML = 'This will destroy itself in <span id="number">'+MAX_SECONDS+'</span> seconds.';
    modalHolder.innerHTML = modal.text;
    const closeBtn = createButton('close', 'X');
    drawItems(modalHolder, [hr, destroyText, closeBtn]);
    element.appendChild(modalHolder);
    return [element];
}

function startCountdown(modal, seconds) {
    let counter = seconds;
      
    counterInterval = setInterval(() => {
        let myModal = document.querySelector('[data-id='+modal.id+']');
        let number = myModal.querySelector('#number');
        console.log(counter);
        number.innerText = --counter;
        if(counter === 0) {
            removeModal(modal);
        }
    }, 1000);
}

const openModal = (modal) => {
    modal.toggleState();
    if(modal.active) {
        drawItems(root, createModal(modal));
        startCountdown(modal, MAX_SECONDS);
    }
}

const removeModal = (modal) => {
    modal.toggleState();
    clearInterval(counterInterval);
    document.querySelector("[data-id="+modal.id+"]").parentElement.remove();
    
}

const eventMapping = {
    "open": openModal,
    "close": removeModal,
    "modal-wrapper": removeModal
}

const main = () => {
    const root = document.getElementById('root');
    drawItems(root, [createButton('open', 'Open Modal')]);

    root.addEventListener('click', (event) => {
        event.preventDefault();

        if(typeof eventMapping[event.target.dataset.id] === "function") {
            eventMapping[event.target.dataset.id](modal);
        }        
    });
}

window.addEventListener("load", main);
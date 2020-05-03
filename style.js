function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var txtArr = [
    "Hello,",
    "Linwen Huang is a",
    "Software Engineer,",
    "Rock Climber &",
    "all-around "
];

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.multiLineWord = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.finishedMultiLine = false;
        this.line = '';
        this.type();
        
    }

    type() {
        if (this.finishedMultiLine){
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];
        
            if(this.isDeleting && this.wordIndex != this.words.length - 1 ) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else if( !this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
            
            this.txtElement.innerHTML = `<span class="txt">${this.line}${this.txt}</span>`;
        
            let typeSpeed = 200;
        
            if(this.isDeleting) {
                typeSpeed /= 2;
            }
        
            if(!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if(this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }
            // TODO we want to make this stop after length of the array
            if (this.wordIndex != this.words.length){
                setTimeout(() => this.type(), typeSpeed);
            }
        } else {
            const index = this.multiLineWord % txtArr.length;
            const currStr = txtArr[index];
            this.txt = currStr.substring(0, this.txt.length + 1);
            
            if (this.txt.length == 1){
                let newDiv = document.createElement("div");
                newDiv.classList.add("cursor");
                newDiv.innerHTML =`${this.txt}`;
                insertAfter(newDiv, this.txtElement);
                this.txtElement = newDiv;
            } else {
                this.txtElement.innerHTML = `${this.txt}`;
            }

            if (this.txt === currStr){
                this.multiLineWord ++;
                this.txt = '';
                this.txtElement.classList.remove("cursor");
            }

            if (this.multiLineWord < txtArr.length) {
                // this.multiLineWord ++;
                setTimeout(() => this.type(), 150);
            } else {
                this.finishedMultiLine = true;
                this.line = currStr;
                this.txtElement.classList.add("cursor");
                setTimeout(() => this.type(), 100);
            }

        }
    }
}


// Init on Dom Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait);

}



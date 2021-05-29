(function () {
    function View() {
        this.DOMElements = {
            itemQuantity: document.querySelector('#quantity'),
            itemPrice: document.querySelector('#item-price'),
            headerNavigation: document.querySelector("#navbar"),
            navigationButtons: document.querySelectorAll(".nav-item"),
            confirmButton: document.querySelector('#confirm'),
            confirmContent: document.querySelector('#CONFIRMATION'),
            contentBlocks: document.querySelectorAll('.info'),
            prevStepBtn: document.querySelector("#prev-step-btn"),
            nextStepBtn: document.querySelector("#next-step-btn"),
            cardNameField: document.querySelector('#card-name-field'),
            cardNumberField: document.querySelector('#card-number-field'),
            cardDataField: document.querySelector('#card-date'),
            cardCVVField: document.querySelector('#card-cvv'),
            allCardInputs: document.querySelectorAll('.card-field'),
            nameOnCard: document.querySelector('#name'),
            numberOnCard: document.querySelector('#number'),
            dataOnCard: document.querySelector('#data'),
            visa: document.querySelector('#visa'),
            mastercard: document.querySelector('#mastercard'),
            payButton: document.querySelector('#pay-btn'),
            selectCountry: document.querySelector('#select-country'),
            allInputs: document.querySelectorAll('.myInput'),
            confirmUserName: document.querySelector('.user-confirm'),
            cityParent: document.querySelector('#city'),
            cityField: document.querySelector('#city-field'),
            cityAutocomplete: document.querySelector('#autocomplete')
        };
        this.counter = 0;
        this.navigationItem = '';
        this.price = 180;
        this.userName = '';
    }

    View.prototype = {
        setItemPrice: function (number) {
            this.DOMElements.itemPrice.innerHTML = this.price * number;
        },

        isStepsVisisble: function () {
            const prevStepBtn = this.DOMElements.prevStepBtn.classList;
            const nextStepBtn = this.DOMElements.nextStepBtn.classList;
            switch (this.counter) {
                case 0:
                    prevStepBtn.add('hidden');
                    nextStepBtn.remove('hidden');
                    break;
                case 1:
                    prevStepBtn.remove('hidden');
                    nextStepBtn.remove('hidden');
                    break;
                case 2:
                    prevStepBtn.remove('hidden');
                    nextStepBtn.add('hidden');
                    break;
                default:
                    break;
            }
        },

        removeActiveClass: function () {
            const elements = this.DOMElements;
            for (let i = 0; i < elements.navigationButtons.length; i++) {
                elements.navigationButtons[i].classList.remove('light');
                elements.contentBlocks[i].classList.remove('active');
            }
        },

        removeConfirmClasses: function () {
            const payButton = this.DOMElements.payButton;
            const elements = this.DOMElements;
            payButton.innerHTML = 'PAY';
            payButton.classList.remove('green-btn');
            payButton.disabled = false;
            elements.confirmButton.classList.remove('green');
        },

        showActiveContent: function () {
            const elements = this.DOMElements;
            this.removeActiveClass();
            elements.navigationButtons[this.counter].classList.add('light');
            elements.contentBlocks[this.counter].classList.add('active');
        },

        addCountriesToSelect: function (countries) {
            countries.forEach(country => {
                let option = document.createElement('option');
                option.text = country;
                option.value = country;
                this.DOMElements.selectCountry.appendChild(option);
            })
        },

        setActiveNavigationItem: function () {
            const navigationButtons = this.DOMElements.navigationButtons;
            const contentBlocks = this.DOMElements.contentBlocks;
            for (let i = 0; i < navigationButtons.length; i++) {
                navigationButtons[i].classList.remove('light');
                contentBlocks[i].classList.remove('active');
                if (this.navigationItem === navigationButtons[i].innerHTML) {
                    navigationButtons[i].classList.add('light');
                    this.counter = i;
                }
                if (this.navigationItem === contentBlocks[i].id) {
                    contentBlocks[this.counter].classList.add('active');
                }
            }
        },

        changeCityForm: function (country) {
            const parent = this.DOMElements.cityParent;
            const cityField = this.DOMElements.cityField;
            const cityAutocomplete = this.DOMElements.cityAutocomplete;
            if (country === 'Ukraine') {
                parent.replaceChild(cityAutocomplete, cityField);
                cityAutocomplete.hidden = false;
            } else {
                parent.replaceChild(cityField, cityAutocomplete);
                cityAutocomplete.hidden = true;
            }
        },

        isVisa: function (value) {
            const cardType = value.slice(0, 1);
            if (cardType == '4') {
                return visa;
            } else if (cardType == '5') {
                return mastercard;
            }
        },

        setVisibleCard: function (cardType) {
            cardType.classList.remove('card-none');
        },

        writeDataOnCard: function (item) {
            const elements = this.DOMElements;
            const value = item.value;

            (!value)
                ? item.classList.add('required')
                : item.classList.remove('required');

            switch (item.id) {
                case 'card-name-field':
                    elements.cardNameField.value = value.slice(0, 15);
                    elements.nameOnCard.innerHTML = value.toUpperCase().substring(0, 15);
                    this.userName = value;
                    break;
                case 'card-number-field':
                    elements.numberOnCard.innerHTML = value.replace(/\d{4}(?=.)/g, '$& ').substring(0, 19);
                    elements.cardNumberField.value = value.substring(0, 16);
                    if (!value) {
                        elements.numberOnCard.innerHTML = '&nbsp;';
                        visa.classList.add('card-none');
                        mastercard.classList.add('card-none');
                    }
                    const card = this.isVisa(value);
                    card && this.setVisibleCard(card);
                    break;
                case 'card-date':
                    elements.dataOnCard.innerHTML = value.replace(/\d{2}(?=.)/g, '$&/').substring(0, 5);
                    elements.cardDataField.value = value.substring(0, 4);
                    break;
                case 'card-cvv':
                    elements.cardCVVField.value = value.substring(0, 3);
                    break;
                default:
                    break;
            }
        },

        confirmUser: function () {
            const payButton = this.DOMElements.payButton;
            const elements = this.DOMElements;
            payButton.innerHTML = 'Please wait...';
            payButton.classList.add('green-btn');
            payButton.disabled = true;
            setTimeout(() => {
                this.removeActiveClass();
                elements.prevStepBtn.classList.add('hidden');
                elements.confirmButton.classList.add('green');
                elements.confirmContent.classList.add('active');
                elements.confirmUserName.innerHTML += this.userName;
            }, 3000);
        }
    }

    window.app = window.app || {};
    window.app.View = View;

}())


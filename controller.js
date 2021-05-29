(function () {
    function Controller(model, view) {
        this.model = model,
        this.view = view
    }

    Controller.prototype = {
        bindEvents: function () {
            const viewElements = this.view.DOMElements;
            const view = this.view;

            viewElements.itemQuantity.addEventListener('input', (e) => {
                view.setItemPrice(e.target.value);
            });

            viewElements.nextStepBtn.addEventListener('click', (e) => {
                if (view.counter < 2) {
                    view.counter++;
                }
                view.showActiveContent();
                view.isStepsVisisble();
                view.removeConfirmClasses();
            });

            viewElements.prevStepBtn.addEventListener('click', () => {
                if (view.counter > 0) {
                    view.counter--;
                }
                view.showActiveContent();
                view.isStepsVisisble();
                view.removeConfirmClasses();
            });

            viewElements.headerNavigation.addEventListener('click', (e) => {
                if (e.target.innerHTML !== 'CONFIRMATION') {
                    view.navigationItem = e.target.innerHTML;
                    view.setActiveNavigationItem();
                    view.isStepsVisisble();
                    view.removeConfirmClasses();
                }
            });

            viewElements.selectCountry.addEventListener('change', (e) => {
                view.changeCityForm(e.target.value);
            });

            viewElements.allInputs.forEach(item => item.addEventListener('input', (e) => {
                view.writeDataOnCard(e.target);
            }));

            viewElements.payButton.addEventListener('click', () => {
                view.confirmUser();
            });
        },

        initCountries: function () {
            const countries = this.model.getAllCountries();
            this.view.addCountriesToSelect(countries);
        },

        init: function () {
            this.bindEvents();
            this.model.fetchCountries();
            this.initCountries();
        }
    }

    window.app = window.app || {};
    window.app.Controller = Controller;

}())
(function () {

    function Model() {
        this.countries = [];
    }

    Model.prototype = {
        fetchCountries: function () {
            this.countries = window.countriesAll;
        },

        getAllCountries: function () {
            return this.countries;
        }
    }

    window.app = window.app || {};
    window.app.Model = Model;

}())

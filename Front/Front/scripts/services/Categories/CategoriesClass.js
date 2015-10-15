var JudoShirt;
(function (JudoShirt) {
    var Services;
    (function (Services) {
        var CategoriesClass;
        (function (CategoriesClass) {
            var GetCategoriesResponse = (function () {
                function GetCategoriesResponse() {
                    this.categories = Services.Entity.Category[];
                }
                return GetCategoriesResponse;
            })();
            CategoriesClass.GetCategoriesResponse = GetCategoriesResponse;
        })(CategoriesClass = Services.CategoriesClass || (Services.CategoriesClass = {}));
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

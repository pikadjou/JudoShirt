module MartialShirt
{
    'use strict';

    export class C_Article extends MartialShirt.Init.AbstractModule
    {

        public prefixImage = "";
        public articleid: number = 0;
        public article: Services.Entity.Article = null;
        public design: Services.Entity.Design = null;

        public sizes: Services.Entity.Size[] = null;
        public SelectedSize: Services.Entity.Size = null;

        public measures: Services.Entity.Measure[] = null;

        public appearances: Services.Entity.Appearance[] = null;
        public SelectedAppearance: Services.Entity.Appearance = null;

        public views: Services.Entity.View[] = null;
        public SelectedView: Services.Entity.View = null;

        public errorMessage = "";

        public showAppearance = false;
        public showSize = false;
        public sce = null;
        public static $inject = [
            '$scope',
            '$sce',
            Services.ArticlesRequestHandler.Name
        ];
        constructor(
            private $scope: any,
            private $sce: any,
            private RH: Services.ArticlesRequestHandler
        )
        {
            super();

            this._sce = $sce;
            this.init($scope);

            this.RH.GetArticleReceived.add(this.onPacketRecieved, this);

            this.launchService();

        }

        public launchService()
        {

            this.loader = true;
            this.RH.GetArticle([this.articleid]);

        }

        public onPacketRecieved(response: any)
        {

            this.loader = false;

            this.article = response.article;
            this.design = response.article.design;

            this.sizes = response.article.sizes;
            this.appearances = response.article.appearances;
            this.views = response.article.views;

            this._setMeasures(response.article.measures);

            this._setDefaultValues();

            Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.SelectedDesign, this.design);

        }

        private _setDefaultValues()
        {

            var imagePath = this.article.thumbnail;

            var explode = imagePath.split('/');

            for (var i = 0, l = explode.length; i < l; i++)
            {

                if (explode[i] === "views")
                {
                    break;
                }
                this.prefixImage += explode[i] + "/";
            }

            if (this.article.extra)
            {
                var explode = this.article.extra.split("-");

                for (var i = 0, l = explode.length, value = null; i < l; i++)
                {

                    value = explode[i].split(":");

                    switch (value[0])
                    {
                        case "view":
                            this.SelectedView = this._getViewByShopId(value[1]);
                            break;
                        case "appearance":
                            this.SelectedAppearance = this._getAppearanceByShopId(value[1]);
                            break;
                    }
                }
            }
        }

        public getHeaderMeasure(): string[]
        {

            var measureHeader = [];
            for (let measure of this.measures)
            {
                if (measureHeader.indexOf(measure.name) > -1)
                {
                    continue;
                }

                measureHeader.push(measure.name);
            }
            return measureHeader;

        }

        public findMeasuresBySizeIndex($sizeIndex: number): number[]
        {
            let headers = this.getHeaderMeasure();

            var measures = [];
            for (let header of headers)
            {
                let collection = this.measures.filter(x => x.name === header);

                if (!collection)
                {
                    continue;
                }
                if (collection.length < $sizeIndex)
                {
                    continue;
                }

                measures.push(collection[$sizeIndex]);
            }
            return measures;
        }

        private _setMeasures(measures: Services.Entity.Measure[])
        {
            this.measures = measures;

        }
        private _getViewByShopId(shopId: number): Services.Entity.View
        {

            for (var i = 0, l = this.views.length; i < l; i++)
            {
                if (this.views[i].shopId == shopId)
                {
                    return this.views[i];
                }
            }

            return null;
        }
        private _getAppearanceByShopId(shopId: number): Services.Entity.Appearance
        {

            for (var i = 0, l = this.appearances.length; i < l; i++)
            {
                if (this.appearances[i].shopId == shopId)
                {
                    return this.appearances[i];
                }
            }

            return null;
        }

        public changeSelectedView(view: Services.Entity.View)
        {
            this.SelectedView = view;
        }
        public changeSelectedAppearance(appearance: Services.Entity.Appearance)
        {
            this.SelectedAppearance = appearance;
            this.showAppearance = false;

        }
        public changeSelectedSize(size: Services.Entity.Size)
        {
            this.SelectedSize = size;
            this.showSize = false;
        }

        public isDefaultSize(size: Services.Entity.Size): boolean
        {
            if (!this.SelectedSize)
            {
                return false;
            }
            if (this.SelectedSize === size)
            {
                return true;
            }
            return false;
        }
        public isDefaultAppearance(appearance: Services.Entity.Appearance): boolean
        {
            if (!this.SelectedAppearance)
            {
                return false;
            }
            if (this.SelectedAppearance === appearance)
            {
                return true;
            }
            return false;
        }
        public isDefaultView(view: Services.Entity.View): boolean
        {
            if (!this.SelectedView)
            {
                return false;
            }
            if (this.SelectedView === view)
            {
                return true;
            }
            return false;
        }

        public getImageUrl(view: number, appearance: number): string
        {

            if (view === 0)
            {
                view = (this.SelectedView !== null) ? this.SelectedView.shopId : 0;
            }
            if (appearance === 0)
            {
                appearance = (this.SelectedAppearance !== null) ? this.SelectedAppearance.shopId : 0;
            }
            return this.prefixImage + "views/" + view + ",appearanceId=" + appearance + ",width=500,height=500";
        }

        public addToBasket()
        {
            if (!this.SelectedSize)
            {
                this.errorMessage = "Merci de selectionner une taille pour votre produit";
                return;
            }
            if (!this.SelectedAppearance)
            {
                this.errorMessage = "Merci de selectionner une couleur pour votre produit";
                return;
            }

            var article: Services.Entity.Article = this.article;
            article.sizes = [this.SelectedSize];
            article.appearances = [this.SelectedAppearance];

            this._signal.askAddArticle.dispatch(article);
            this.errorMessage = "";
        }
    }

    export class Article implements ng.IDirective
    {
        public templateUrl = "/scripts/app/modules/article/article.html";
        public restrict = "E";
        public replace = true;
        public scope = {
            articleid: '@'
        };

        public static Name = "Article".toLocaleLowerCase();

        public static $inject = [];
        constructor() { }

        public controller = C_Article;
    }
    MartialShirt.Init.Application.MartialShirtApp.directive(Article.Name, MartialShirtApp.Application.GetDirectiveFactory<Article>(Article));
}
function Model() {
    this._productsList = [];
    this._suppliersList = [];
    this._getProduct;
    this._getSupplier;
    this._pushSupplier;
    this._supplierUnique;
    this._filter;
    this._removeProduct;
    this._currentFilter = 'nofilter';
}

Model.prototype = new EventEmitter();

Model.prototype._filter = function(context) {
    var context = context;
    context._productsList.forEach(function(product) {
        context._activeFilter(product);
    });
}

Model.prototype._getProduct = function(idarticle) {
    var product;
    this._productsList.forEach(function(prod) {
        if (prod.idarticle == idarticle) { product = prod };
    })
    return product;
}

Model.prototype._getQty = function(idarticle) {
    return this._getProduct(idarticle).quantitearticle;
}

Model.prototype._setQty = function(productId, newQty) {
    product = this._getProduct(productId);
    product.quantitearticle = newQty;
    //this._activeFilter(product);

    this.emit("updatedQty", {
        idarticle: productId,
        qtearticle: newQty
    });

}

Model.prototype._getSupplier = function(id) {
    var currentModel = this;
    var product;
    var supplier;

    currentModel._productsList.forEach(function(prod) {
        if (prod.idarticle == id) { product = prod };
    })
    currentModel._suppliersList.forEach(function(supp) {
        if (supp.idfournisseur == product.clefournisseur.idfournisseur) { supplier = supp };
    });
    return supplier;
}

Model.prototype._pushSupplier = function(product) {
    var currentModel = this;
    if (currentModel._supplierUnique(currentModel, product)) {
        currentModel._suppliersList.push(product.clefournisseur);
    }
}

Model.prototype._supplierUnique = function(currentModel, product) {
    var unique = true;
    currentModel._suppliersList.forEach(function(supplier) {
        if (supplier.idfournisseur === product.clefournisseur.idfournisseur) {
            unique = false;
        };
    });
    return unique;
};

Model.prototype._removeProduct = function(data) {
    var productId = data;
    var index = this._productsList.indexOf(this._getProduct(productId));
    this._productsList.splice(index, 1);
    this.emit('productDeleted', { idarticle: productId })
};

Model.prototype._addProduct = function(product) {
    this._productsList.push(product);
    this._activeFilter(product);
}

Model.prototype._activeFilter = function(product) {
    if ((this._currentFilter == 'deffective' && product.etatarticle == 'Défectueux') || (this._currentFilter == 'stockOut' && product.quantitearticle == 0) || (this._currentFilter == 'nofilter')) {
        this.emit('addedProduct', { product: product });
    }

}

Model.prototype._resetDatas = function() {
    this._productsList = [];
    this._suppliersList = [];
    this._currentFilter = 'nofilter';
}

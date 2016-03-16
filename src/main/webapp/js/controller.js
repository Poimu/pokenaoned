function Controller(model, view) {
    this._model = model;
    this._view = view;
    this._tryLogin();
    this._deleteProduct();
    this._updateQuantity();
    this._sendProductForm();
    //this._TESTreturnBoard();

};

Controller.prototype._tryLogin = function() {
    var context = this;
    context._view.on('tryLogin', function() {
        var name = $('#loginName').val();
        var password = $('#loginPass').val();
        $.post({
            url: "trylogin",
            data: {
                utilisateur: name,
                motdepasse: password
            }
        }).done(function(data) {
            console.log('SERVER RESPONSE: Successfully authentified.');
            var success = function(param1, param2) {
        	param1();
        	param2(context._view);
            }
            success(function() {
        	data.productsList.forEach(function(product) {
        	    context._model._pushSupplier(product);
        	    context._model._productsList.push(product);
        	});
        	console.log('CONTROLLER : productsList loaded into the model.');
            }, context._view._loginSuccess);



        }).fail(function(jqXHR, textStatus) {
            console.log("SERVER RESPONSE: Wrong name/password.");
            context._view._loginFail('Nom/Mot de passe invalide');
        });
    });
};

Controller.prototype._TESTreturnBoard = function() {
    var context = this;
    $.post({
        url: "trylogin",
    }).done(function(data) {
        context._view._drawBoard();
        data.productsList.forEach(function(product) {
            context._model._pushSupplier(product);
            context._model._addProduct(product);
        });

    }).fail(function(jqXHR, textStatus) {
        console.log("Login Refusé : " + textStatus);
    });
};


Controller.prototype._deleteProduct = function() {
    var context = this;
    context._view.on('deleteProduct', function(deleteData) {
        $.post({
            url: "deleteProduct",
            data: {
                idarticle: deleteData.idarticle
            }
        }).done(function(data) {
            console.log("SERVER RESPONSE: Removed product(id:" + data.idarticle + ") from database");
            context._model._removeProduct(data.idarticle);
        }).fail(function(jqXHR, textStatus) {
            console.log("product not deleted");
        });
    });
};

Controller.prototype._updateQuantity = function() {
    var context = this;
    context._view.on('editQty', function(data) {
        var newQty = data.quantity + data.stockValue;
        $.post({
            url: "editQty", //URL à laquelle la requête AJAX est envoyée. L'action Login est mappée avec cette URL.
            data: { //Données envoyées.
                updatedQty: newQty,
                idarticle: data.idarticle
            }
        }).done(function(data) { //Si la requête reçoit un success.
            console.log("SERVER RESPONSE : Product(id: " + data.idarticle + ") edited in database with new quantity : " + newQty);
            context._model._setQty(data.idarticle, newQty);
        }).fail(function(jqXHR, textStatus) { //Si la requête ne reçoit pas un success.
            console.log("Product not edited");
        });
    });
};

Controller.prototype._sendProductForm = function() {
    var context = this;
    context._view.on('sendProductForm', function() {
        var form = $('#addProductForm');
        var formdata = new FormData(form[0]);
        var data = (formdata !== null) ? formdata : form.serialize();
        $.post({
            url: 'addProduct',
            contentType: false,
            processData: false,
            data: data,
        }).done(function(data) {
            console.log("SERVER RESPONSE: Product(id:" + data.article.idarticle + ") added to the database.");
            context._model._addProduct(data.article);
            context._model._pushSupplier(data.article);
        }).fail(function() {
            console.log("Pas envoyé");
        });
    });
};

function View(model) {
    this._model = model;
    this._drawLogin();
    this._checkLogin;
    this._drawBoard;
    this._loginSuccess;
    this._updateQty();
    this._updateAddProductBoard();
    this._removeProduct();
}

View.prototype = new EventEmitter();

View.prototype._drawLogin = function() {
    var loginDiv 	= '<div id="login"></div>';
    var nameField 	= '<input class="loginField" id="loginName" type="text" placeholder="Utilisateur">';
    var passField 	= '<input class="loginField" id="loginPass" type="password" placeholder="Mot de passe">';
    var submitButton 	= '<span id="lockIcon" class="ui-icon ui-icon-locked"></span>';
    var logo            = '<div id="logo">Pokenantes</div>';
    var loginMsg        = '<div id="loginMsg">Authentification</div>';
    

    $('body').append(logo);
    $('body').append(loginMsg);
    $('body').append(loginDiv);
    $('#login').append(nameField);
    $('#login').append(passField);
    $('#login').append(submitButton);

    $('#lockIcon').hover(
        function() { $(this).attr('class', 'ui-icon ui-icon-unlocked') },
        function() { $(this).attr('class', 'ui-icon ui-icon-locked') }
    );
    
    $('#lockIcon').click(this._checkLogin.bind(this));
}

View.prototype._checkLogin = function() {
    if ($('#loginName').val().length <= 0 || $('#loginPass').val().length <= 0) {
        this._loginFail('Complétez tous les champs');
    }
    else this.emit('tryLogin');
}

View.prototype._loginFail = function(errorMessage) {
    var errorLogin = '<div id="errorLogin">' + errorMessage + '</div>';
    $('#errorLogin').remove();
    $('#login').append(errorLogin);
    $('#errorLogin').fadeOut(2000);
}

/* Si le login est validé: affichage du tableau de bord */
View.prototype._loginSuccess = function(context) {
    var context = context;
    var deconnectButton = '<div id="reloginArea"><button id="relogin" type="button" name="deconnexion">Déconnexion</button></div>';
    var logoArea = '<div id="logoLine"><div id="logoCorner">Pokenantes</div></div>';
    var display = function(drawBoard, drawProducts) {
	    drawBoard(context);
	    console.log('VIEW: Board successfully drawn.');
	    drawProducts(context._model);
	}
    $('#lockIcon').css({
	'border-color': 'green',
	'border-width' : '2px'
    });
    $('#login, #loginMsg, #logo').fadeOut('fast', function() {
	$('body').empty();
	$('body').append(deconnectButton);
	$('body').append(logoArea);
	$('#relogin').click(function() {
	    context._model._resetDatas();
	    $('#board, #selectFilterTypo, #reloginArea, #addProductButton').fadeOut('fast', function() {
		$('body').empty();
		context._drawLogin();
	    })

	});
	display(context._drawBoard, context._model._filter);
    });
    
}

/* Affichage du header du tableau */
View.prototype._drawBoard = function(context) {
    var context = context;
    var selectFilter 		= '<div id="selectFilterLine"></div>';
    var selectFilterTypo 	= '<div id="selectFilterTypo"></div>';
    var selectFilterOpt 	= '<select id="selectFilter"></select>'
    var anchorAddProduct        = '<div id="anchorAddProduct">Aller à : Ajouter un produit</div>';
    var board 			= '<div id="board"></div>';
    var boardHeader 		= '<div id="boardHeader"></div>';
    var boardProducts 		= '<div id="boardProducts"></div>';
    var addProductButton 	= '<div id="flex-button"><div id="addProductButton">Ajouter un produit</div></div>';

    var productForm 		= '<div id="productForm"></div>';

    //Les variables du header.
    var headerId 		= '<div id="headerId" class="headerField">Identifiant</div>';
    var headerName 		= '<div id="headerName" class="headerField">Nom</div>';
    var headerStock 		= '<div id="headerStock" class="headerField">Stock</div>';
    var headerCondition 	= '<div id="headerCondition" class="headerField">État</div>';
    var headerOrigin 		= '<div id="headerOrigin" class="headerField">Provenance</div>';
    var headerColor 		= '<div id="headerColor"  class="headerField">Couleur</div>';
    var headerSize 		= '<div id="headerSize" class="headerField">Taille</div>';
    var headerKind 		= '<div id="headerKind" class="headerField">Type</div>';
    var headerPic 		= '<div id="headerPic" class="headerField">Photo</div>';
    var headerDelete 		= '<div class="deleteButtonHeader"></div>';

    /* Les filtres possibles */
    $('body').append(selectFilter);
    $('#selectFilterLine').append(selectFilterTypo);
    $('#selectFilterLine').append(anchorAddProduct);
    $('#anchorAddProduct').click(function() {
	$('html, body').animate({ scrollTop: $(document).height() }, 'fast');
    })
    
    $('#selectFilterTypo').append(selectFilterOpt);
    $('#selectFilter').append('<option value="nofilter">Afficher tous les articles</option>');
    $('#selectFilter').append('<option value="deffective">Afficher les articles défectueux</option>');
    $('#selectFilter').append('<option value="stockOut">Afficher les articles en rupture de stock</option>');
    /* Appel de la fonction de tri */
    $('#selectFilter').niceSelect();
    $('#selectFilter').change(function() {
        $('#boardProducts').empty();
        context._model._currentFilter = $('#selectFilter').val();
        context._model._filter(context._model);
    })

    $('body').append(board);
    $('#board').append(boardHeader);
    $('#boardHeader').append(headerId);
    $('#boardHeader').append(headerName);
    $('#boardHeader').append(headerStock);
    $('#boardHeader').append(headerCondition);
    $('#boardHeader').append(headerOrigin);
    $('#boardHeader').append(headerColor);
    $('#boardHeader').append(headerSize);
    $('#boardHeader').append(headerKind);
    $('#boardHeader').append(headerPic);
    $('#boardHeader').append(headerDelete);
    $('#board').append(boardProducts);
    $('body').append(productForm);

    $('body').append(addProductButton);
    $('#addProductButton').click(function() {
        if ($('#addProductButton').html() == 'Envoyer le formulaire') {
            if (context._formIsComplete()) {
                context.emit('sendProductForm');
                $('#productForm').empty();
                $('#addProductButton').html('Ajouter un produit')
            }
        } else {
            $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
            $('#addProductButton').html('Envoyer le formulaire');
            context._drawAddSupplier(context);
        }
    })
}

/* Formulaire d'ajout de produit : partie fournisseur */
View.prototype._drawAddSupplier = function(context) {
    var suppliers = context._model._suppliersList;
    var addProductForm 		= '<form id="addProductForm" method="post" enctype="multipart/form-data"></form>';
    var closeForm 		= '<div id="closeForm" class="addProductLine"><div id="formTitle">Formulaire : Ajout de produit</div><div id="closeCross" class="ui-icon ui-icon-close"></div></div>';
    var addProductLine 		= '<div class="addProductLine"><div class="addProductTypo"></div></div>';
    var addSupplier 		= '<div id="addSupplier"></div>'
    var selectSupplier 		= '<select id="selectSupplier" class="addSelect" name="idfournisseur"></select>';
    var addSupplierName 	= '<input id="addSupplierName" class="addInput" name="nomfournisseur" type="text" placeholder="Nom fournisseur"></input>';
    var addSupplierType 	= '<div id="addSupplierType"></div>';
    var supplierTypePro 	= '<div class="addSupplierRadio"><input name="typefournisseur" type="radio" value="Professionnel"><div class="supplierRadioTypo">Professionnel</div></div>';
    var supplierTypeCas 	= '<div class="addSupplierRadio"><input name="typefournisseur" type="radio" value="Particulier" checked="checked"><div class="supplierRadioTypo">Particulier</div></div>';
    var addSupplierAddress 	= '<input id="addSupplierAddress" class="addInput" name="nomadressefournisseur" type="text" placeholder="Adresse fournisseur"></input>';
    var addSupplierPhone 	= '<input id="addSupplierPhone" class="addInput" name="numtelfournisseur" type="text" placeholder="Téléphone fournisseur"></input>';

    $('#productForm').append(addProductForm);
    $('#addProductForm').append(closeForm);
    $('#closeCross').click(function() {
        $('#productForm').empty();
        $('#addProductButton').html('Ajouter un produit');
    })

    $('#addProductForm').append(addProductLine);
    $('.addProductTypo:last').append('Sélectionnez un fournisseur');
    $('.addProductLine:last').append(selectSupplier);
    $('#selectSupplier').append('<option value="none">Sélectionnez un fournisseur</option>')
    suppliers.forEach(function(supplier) {
        var option = '<option value="' + supplier.idfournisseur + '">' + supplier.nomfournisseur + '</option>';
        $('#selectSupplier').append(option);
    });
    $('#selectSupplier').append('<option value="0"> Nouveau fournisseur </option>');
    $('#selectSupplier').niceSelect();
    $('.addSelect').click(function() {
	$('html, body').animate({ scrollTop: $(document).height() }, 'fast');
    })
    $('#selectSupplier').change(function() {
        $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
        if ($(this).val() == "none") {
            $('#addProduct').remove();
            $('#addSupplier').remove();
        } else if ($(this).val() == "0") {
            $('#addSupplier').remove();
            $('#addProduct').remove();
            $('#addProductForm').append(addSupplier);

            $('#addSupplier').append(addProductLine);
            $('.addProductTypo:last').append('Nom du fournisseur');
            $('.addProductLine:last').append(addSupplierName);

            $('#addSupplier').append(addProductLine);
            $('.addProductTypo:last').append('Type de fournisseur');
            $('.addProductLine:last').append(addSupplierType);
            $('#addSupplierType').append(supplierTypePro);
            $('#addSupplierType').append(supplierTypeCas);

            $('#addSupplier').append(addProductLine);
            $('.addProductTypo:last').append('Adresse du fournisseur');
            $('.addProductLine:last').append(addSupplierAddress);

            $('#addSupplier').append(addProductLine);
            $('.addProductTypo:last').append('Téléphone du fournisseur');
            $('.addProductLine:last').append(addSupplierPhone);

            context._drawAddProduct(context, addProductLine);
        } else {
            $('#addSupplier').remove();
            $('#addProduct').remove();
            context._drawAddProduct(context, addProductLine);
        }
    })
}

/* Formulaire d'ajout de produit : partie produit */
View.prototype._drawAddProduct = function(context, addProductLine) {
    var productTypesList 	= ['Vêtement', 'High-Tech', 'Culturel', 'Figurine', 'Carte', 'Autre'];
    var addProduct 		= '<div id="addProduct"></div>';
    var addProductName 		= '<input id="addProductName" class="addInput" name="nomarticle" type="text" placeholder="Nom produit"></input>';
    var addProductCode 		= '<input id="addProductCode" class="addInput" name="codearticle" type="text" placeholder="Code produit"></input>';
    var addProductStock 	= '<input id="addProductStock" class="addInput" name="quantitearticle" type="text" placeholder="Stock initial"></input>';
    var addProductCondition 	= '<div id="addProductCondition"></div>';
    var conditionRadioBroken 	= '<div class="productConditionRadio"><input name="etatarticle" type="radio" value="Commercialisable" checked="checked"><div class="supplierRadioTypo">Commercialisable</div></div>';
    var conditionRadioFine 	= '<div class="productConditionRadio"><input name="etatarticle" type="radio" value="Défectueux"><div class="supplierRadioTypo">Défectueux</div></div>';
    var addProductOrigin 	= '<input id="addProductOrigin" class="addInput" name="provenancearticle" type="text" placeholder="Provenance">';
    var addProductColor 	= '<input id="addProductColor" class="addInput" name="couleurarticle" type="text" placeholder="Couleur produit">';
    var addProductSize 		= '<input id="addProductSize" class="addInput" name="taillearticle" type="text" placeholder="Taille produit">';
    var selectProductType 	= '<select id="selectProductType" class="addSelect" name="typearticle"></supplier>';
    var addProductPic 		= '<input id="addProductPic" name="photoarticle" type="file" accept="image/*" placeholder="Photographie produit">';

    $('#addProductForm').append(addProduct);

    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Nom article');
    $('.addProductLine:last').append(addProductName);

    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Code article');
    $('.addProductLine:last').append(addProductCode);

    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Stock initial');
    $('.addProductLine:last').append(addProductStock);

    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Etat du produit');
    $('.addProductLine:last').append(addProductCondition);
    $('#addProductCondition').append(conditionRadioBroken);
    $('#addProductCondition').append(conditionRadioFine);

    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Provenance du produit');
    $('.addProductLine:last').append(addProductOrigin);

    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Couleur produit');
    $('.addProductLine:last').append(addProductColor);

    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Taille produit');
    $('.addProductLine:last').append(addProductSize);

    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Type article');
    $('.addProductLine:last').append(selectProductType);
    productTypesList.forEach(function(type) {
        var option = '<option value="' + type + '">' + type + '</option>';
        $('#selectProductType').append(option);
    });
    $('#selectProductType').niceSelect();
    $('.addSelect').click(function() {
	$('html, body').animate({ scrollTop: $(document).height() }, 'fast');
    })

    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Photo article');
    $('.addProductLine:last').append(addProductPic);

}

/* Edition de la quantité affichée */
View.prototype._updateQty = function() {
    var context = this;
    context._model.on('updatedQty', function(data) {
        var currentBlock = $('[data-id="' + data.idarticle + '"]');
        var stockValue = currentBlock.find($('.stockValue'))
        stockValue.html(data.qtearticle);
        if (data.qtearticle <= 0) stockValue.attr('class', 'stockValue error');
        else if (data.qtearticle > 0 && $('#selectFilter').val() == 'stockOut') {
            stockValue.attr('class', 'stockValue');
            currentBlock.fadeOut('slow', function() {
                currentBlock.remove();
            });
        } else {
            stockValue.attr('class', 'stockValue');
        }
    })
};

/* Affichage d'un produit sur le tableau de bord */
View.prototype._updateAddProductBoard = function() {
    var context = this;
    this._model.on('addedProduct', function(data) {
        var product = data.product;
        var currentBlock 	= '[data-id="' + product.idarticle + '"]';
        var productLine 	= '<div class="productLine"></div>';
        var productCode 	= '<div class="productCode blockField"></div>';
        var productName 	= '<div class="productName blockField"></div>';
        var productStock 	= '<div class="productStock blockField"></div>';
        var stockValue 		= '<div class="stockValue"></div>';
        var stockInput 		= '<input type="text" class="stockInput" placeholder="Quantité">';
        var stockButtons 	= '<div class="stockButtons"></div>'
        var stockAdd 		= '<div class="stockAdd ui-icon ui-icon-plus"></div>';
        var stockRemove 	= '<div class="stockRemove ui-icon ui-icon-minus"></div>';
        var productCondition 	= '<div class="productCondition blockField"></div>';
        var productOrigin 	= '<div class="productOrigin blockField"></div>';
        var productColor 	= '<div class="productColor blockField"></div>';
        var productSize 	= '<div class="productSize blockField"></div>';
        var productKind 	= '<div class="productKind blockField"></div>';
        var productPic 		= '<div class="productPic blockField"></div>';
        var productDelete 	= '<div class="deleteProduct ui-icon ui-icon-trash">deleteProduct</div>'
            //Les variables pour chaque fournisseur.
        var supplierLine 	= '<div class="supplierLine" style="display: none;"></div>';
        var supplierName 	= '<div class="supplierName supplierField"><b>Nom du fournisseur :&nbsp</b></div>';
        var supplierType 	= '<div class="supplierType supplierField"><b>Type de fournisseur :&nbsp</b></div>';
        var supplierPhone 	= '<div class="supplierPhone supplierField"><b>Téléphone du fournisseur :&nbsp</b></div>';
        var supplierAddress 	= '<div class="supplierAddress supplierField"><b>Adresse du fournisseur :&nbsp</b></div>';

        var productBlock 	= '<div data-id="' + product.idarticle + '" class="productBlock"></div>';
        var currentProductDiv 	= '.productLine:last';
        var currentSupplierDiv 	= '.supplierLine:last';
        var picUrl 		= '<img src="css/uploadedImages/' + product.photoarticle + '" />';

        $('#boardProducts').append(productBlock);
        $(currentBlock).append(productLine);
        $(currentProductDiv).append(productCode);
        $('.productCode:last').append(product.codearticle);
        $(currentProductDiv).append(productName);
        $('.productName:last').append(product.nomarticle);

        $(currentProductDiv).append(productStock);
        $('.productStock:last').append(stockValue);
        $('.stockValue:last').append(product.quantitearticle);
        if (product.quantitearticle <= 0) $('.stockValue:last').addClass('error');
        $('.productStock:last').append(stockInput);
        $('.productStock:last').append(stockButtons);
        $('.stockButtons:last').append(stockAdd);
        $('.stockButtons:last').append(stockRemove);

        $(currentProductDiv).append(productCondition);
        $('.productCondition:last').append(product.etatarticle);
        $(currentProductDiv).append(productOrigin);
        $('.productOrigin:last').append(product.provenancearticle);
        $(currentProductDiv).append(productColor);
        $('.productColor:last').append(product.couleurarticle);
        $(currentProductDiv).append(productSize);
        $('.productSize:last').append(product.taillearticle);
        $(currentProductDiv).append(productKind);
        $('.productKind:last').append(product.typearticle);
        $(currentProductDiv).append(productPic);
        $('.productPic:last').append(product.photoarticle);
        $(currentProductDiv).append(productDelete);

        /* Ajout d'un tooltip sur l'image */
        $('.productPic:last').qtip({
            content: {
                text: picUrl
            },
            position: {
                target: 'mouse',
                adjust: { x: -200, y: -75 },
            },
            style: {
                tip: {
                    corner: 'right center'
                },
                classes: 'productImageBox'
            }
        });

        /* Gestion des clicks sur le tableau de bord */
        $(currentBlock).click(function(event) {
            var supplier = context._model._getSupplier(product.idarticle);
            var productId = product.idarticle;

            /* Click sur l'input de quantité */
            if ($(event.target).is('.stockInput')) return

            /* Click sur la corbeille */
            if ($(event.target).is('.deleteProduct')) {
                context.emit('deleteProduct', { idarticle: productId });
                return
            }

            /* Click sur le bouton de retrait de quantité */
            if ($(event.target).is('.stockRemove')) {
                var quantity = $(this).find($('.stockInput')).val() * (-1);
                var stockValue = $(this).find($('.stockValue')).html() * (1);
                if (!(stockValue < -quantity)) {
                    context.emit('editQty', {
                        idarticle: productId,
                        quantity: quantity,
                        stockValue: stockValue
                    })
                }
                return
            }

            /* Click sur le bouton d'ajout de quantité */
            if ($(event.target).is('.stockAdd')) {
                var quantity = ($(this).find($('.stockInput')).val() * 1);
                var stockValue = $(this).find($('.stockValue')).html() * 1;
                context.emit('editQty', {
                    idarticle: productId,
                    quantity: quantity,
                    stockValue: stockValue
                })
                return
            }

            /* Click pour afficher les détails du fournisseur */
            if ($(this).find('.supplierLine').length) $('.supplierLine').remove();
            else {
                $('.supplierLine').remove();
                $(this).append(supplierLine);
                $(currentSupplierDiv).append(supplierName);
                $('.supplierName:last').append(supplier.nomfournisseur);
                $(currentSupplierDiv).append(supplierType);
                $('.supplierType:last').append(supplier.typefournisseur);
                $(currentSupplierDiv).append(supplierPhone);
                $('.supplierPhone:last').append(supplier.numtelfournisseur);
                $(currentSupplierDiv).append(supplierAddress);
                $('.supplierAddress:last').append(supplier.nomadressefournisseur);
                $(currentSupplierDiv).show();
                $(currentSupplierDiv).addClass('animate animated zoomIn')
            }
        });
    });
};

/* Suppression d'un bloc produit */
View.prototype._removeProduct = function() {
    this._model.on('productDeleted', function(data) {
        var blockToDelete = $('[data-id="' + data.idarticle + '"]');
        blockToDelete.hide('slow', function() {
            blockToDelete.remove();
        })
    })
}

/* Vérification que les champs sont complétés */
View.prototype._formIsComplete = function() {
    var isComplete = true;
    var errorTypo = '<div class="errorTypo">&nbsp Incomplet.</div>';
    $('.errorTypo').remove();
    if ($('#addSupplierName').length && $('#addSupplierName').val().length < 1) {
        var nameTypo = $('#addSupplierName').parent().find('.addProductTypo');
        nameTypo.append(errorTypo);
        isComplete = false;
    }
    if ($('#addSupplierAddress').length && $('#addSupplierAddress').val().length < 1) {
        var addressTypo = $('#addSupplierAddress').parent().find('.addProductTypo');
        addressTypo.append(errorTypo);
        isComplete = false;
    }
    if ($('#addSupplierPhone').length && $('#addSupplierPhone').val().length < 1) {
        var phoneTypo = $('#addSupplierPhone').parent().find('.addProductTypo');
        phoneTypo.append(errorTypo);
        isComplete = false;
    }
    if ($('#addProductName').length && $('#addProductName').val().length < 1) {
        var productNameTypo = $('#addProductName').parent().find('.addProductTypo');
        productNameTypo.append(errorTypo);
        isComplete = false;
    }
    if ($('#addProductCode').length && $('#addProductCode').val().length < 1) {
        var codeTypo = $('#addProductCode').parent().find('.addProductTypo');
        codeTypo.append(errorTypo);
        isComplete = false;
    }
    if (($('#addProductStock').length && $('#addProductStock').val().length < 1) || isNaN($('#addProductStock').val())) {
        var stockTypo = $('#addProductStock').parent().find('.addProductTypo');
        stockTypo.append(errorTypo);
        $('.errorTypo:last').html('&nbspEntrez un nombre.');
        isComplete = false;
    }
    if ($('#addProductOrigin').length && $('#addProductOrigin').val().length < 1) {
        var originTypo = $('#addProductOrigin').parent().find('.addProductTypo');
        originTypo.append(errorTypo);
        isComplete = false;
    }
    $('.errorTypo').fadeOut(2000);
    return isComplete;
}

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>pokenantes</title>
    <link rel="stylesheet" href="css/jquery-ui.css">
    <link rel="stylesheet" href="css/jquery.qtip.css">
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/nice-select.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

</body>

<script src="js/plugins/jquery.js" type="text/javascript"></script>
<script src="js/plugins/eventEmitter.js" type="text/javascript"></script>
<script src="js/plugins/jquery-ui.js" type="text/javascript"></script>
<script src="js/plugins/jquery.qtip.js" type="text/javascript"></script>
<script src="js/plugins/jquery.nice-select.js" type="text/javascript"></script>
<script src="js/model.js" type="text/javascript"></script>
<script src="js/view.js" type="text/javascript"></script>
<script src="js/controller.js" type="text/javascript"></script>

<script>

var model;
var view;
var controller;

$(document).ready(function() {
    function createMVC(createModel, createView, createController) {
	createModel();
	createView();
	createController();
	}
	function createModel() {
		model = new Model();
	}
	function createView() {
		view = new View(model);
	}
	function createController() {
		controller = new Controller(model, view);
	}
	
	/* CALLBACK : On instancie le model puis la vue puis le controlleur */
	createMVC(createModel, createView, createController);
})



</script>

</html>
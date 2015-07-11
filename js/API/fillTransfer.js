//TRANSFERIR ARCHIVOS

var ft = {
	win : function (r) {
	    if(r.response == 1){
	    	navigator.notification.alert("Registrado correctamente",
	    		function(){
	    			navigator.vibrate(2000);
	    			navigator.notification.beep(1);
	    			window.location.href = "#home";
	    		}, "Bienvenido", "Finalizar");
	    }else{
	    	alert("Error al subir la foto");
	    }
	},

	fail : function (error) {
	    alert("An error has occurred: Code = " + error.code);
	},

	start: function(path){
		var options = new FileUploadOptions();
		options.fileKey = "foto";
		options.fileName = "Ismael";
		options.mimeType = "image/jpeg";

		var ft2 = new FileTransfer();
		ft2.upload(path, encodeURI("http://carlos.igitsoft.com/apps/test.php"), ft.win, ft.fail, options);		
	}


};
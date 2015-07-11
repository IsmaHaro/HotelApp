//Funcionalidades principales
var fn = {
    init: function(){
        if(!fn.estaRegistrado())
            window.location.href = "#reg";
        
        $('#reg ul[data-role = listview] a').click(mc.start);
        $("#reg div[data-role = footer] a").click(fn.registrarClick);
    },
    deviceready: function(){
        document.addEventListener("deviceready", fn.init, false);
    },
    estaRegistrado: function(){
        return false;
    },
    registrarClick: function(){
        var nom = $('#regNom').val();
        var mai = $('#regMail').val();
        var tel = $('#regTel').val();
        var foto = $('#fotoTomada').attr("rel");
        
        if(nom != '' && mai != '' && tel != '' && foto != undefined && foto != ''){
            fn.enviarRegistro(nom,mai,tel,foto);
            alert("Registro enviado");
        }
        else
            navigator.notification.alert("Todos los campos son requeridos", null, "Registro", "Aceptar");
    },

    enviarRegistro: function(nom,mai,tel,foto){
        $.ajax({
            method: "POST",
            url: "http://carlos.igitsoft.com/apps/test.php",
            data: { nom: nom, mail: mai, tel: tel},
            error: function(){
                alert("Ajax connection failed");
            }
        })
            .done(function( msg ) {
                if(msg == 1){
                     //subir foto
                     alert("Datos registrados... subiendo la foto"+msg);
                     ft.start(foto);
                }else{
                    //METODO ALERT DE PHONEGAP
                    navigator.notification.alert("Error al enviar los datos", null, "Enviar Datos", "Aceptar");
                }
        });
    }
};

$(fn.deviceready);
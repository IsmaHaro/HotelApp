//Funcionalidades principales
var fn = {
    init: function(){
        if(!fn.estaRegistrado())
            window.location.href = "#reg";
        
        $('#reg ul[data-role = listview] a').tap(mc.start);
        $("#reg div[data-role = footer] a").tap(fn.registrarClick);
        $('#nr1 ul[data-role = listview] a').tap(fn.seleccionarTipo);
        $('#nr1 div[data-role = navbar] li').tap(fn.nr1Siguiente);
        $('#resSend').tap(fn.nr2Send);
    },
    deviceready: function(){
        document.addEventListener("deviceready", fn.init, false);
    },
    estaRegistrado: function(){
        if(window.localStorage.getItem('uuid') != undefined){
            return true;
        }
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
    },
    seleccionarTipo: function(){
        $(this).parents("ul").find("a").css("background-color","");
        $('#nr1').attr('th',$(this).text());
        $(this).css("background-color","#50BB50");
    },
    nr1Siguiente: function(){
        if($(this).index() == 1 && $('#nr1').attr('th') != undefined){
            window.location.href = "#nr2";
        }else{
            if($(this).index() != 0){
                alert("Es necesario seleccionar un tipo de habitacion");
            }
        }
    },
    nr2Send: function(){
        var th = $('#nr1').attr('th');
        var pr = $('#resPer').val();
        var ha = $('#resHab').val();
        var di = $('#resDia').val();
        
        // Detectar si esta conectado a internet
            //Enviar reserva al servidor
        // sino
            //Guardar datos en el dispositivo

        alert(th + ' - '+pr+' - '+ha+' - '+ha+' - '+di);
        almacen.guardarReserva(th,pr,ha,di);
    }
};

$(fn.deviceready);
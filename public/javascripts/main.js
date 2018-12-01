$(document).ready(function(){
    console.log("Estoy ready");
    //getbancos();

    $('table').on('click','atcualizar',function(){
        var row = $(this).closest('tr');
        $('#nombre').val(row.find('.nombre').text());
        $('#cadena').val(row.find('.cadena').text());
        $('#anioFuncion').val(row.find('.anioFuncion').text());
        $('#id').val($(this.attr('data-id')));
    });

    $('table').on('click','eliminar',function(){
        eliminarbanco($(this).attr('data-id'));
    });

    $('#guardar').click(function(){
        if($("#id").val() == " "){
            crearbanco();
        }else{
            actualizarbanco();
        }
    });



});

function getbancos(){
    var  bancos = "";
    $.ajax({
        url: '/bancos',
        type: 'GET',
        dataType: 'json',
        error: function(){
            console.log("Hubo un error en la peticion getbancos");
        },
        success: function(response){
            response.banco.forEach((banco)=>{
                bancos +=   `<tr>
                                <td class="nombre">${banco.nombre}</td>
                                <td class="cadena">${banco.cadena}</td>
                                <td class="anioFuncion">${banco.anioFuncion}</td>
                                <td><button type="button" class="actualizar" data-id="${banco._id}">Actualizar</button></td>
                                <td><button type="button" class="eliminar" data-id="${banco._id}">Eliminar</button></td>
                            </tr>`
            });
        $('#t-body').html(bancos);
        }
    });
};

function crearbanco(){
    $.ajax({
        url: "/create",
        type: "POST",
        dataType: "json",
        data: {nombre: $("#nombre").val(), cadena: $("#cadena").val(), anioFuncion: $("#anioFuncion").val()},
        error: function(){
            console.log("Hubo un error en la peticion crearbanco");
        },
        success: function(response){
               var banco =  `<tr>
                                <td class="nombre">${response.banco.nombre}</td>
                                <td class="cadena">${response.banco.cadena}</td>
                                <td class="anioFuncion">${response.banco.anioFuncion}</td>
                                <td><button type="button" class="actualizar" data-id="${response.banco._id}">Actualizar</button></td>
                                <td><button type="button" class="eliminar" data-id="${response.banco._id}">Eliminar</button></td>
                            </tr>`
                $('#t-body').append(banco);
        }
    });
};

function actualizarbanco(){
    var id = $('#id').val();
    $.ajax({
        url: "/update"+id,
        type: "PUT",
        dataType: "json",
        data: {nombre: $("#nombre").val(), cadena: $("#cadena").val(), anioFuncion: $("#anioFuncion").val()},
        error: function(){
            console.log("Hubo un erro en la peticion actualizarbanco");
        },
        success: function(response){
            getbancos();
            $("#id").val(" ")
            $("#nombre").val(" ");
            $("#cadena").val(" ");
            $("#anioFuncion").val(" ");
        }

    });
};

function eliminarbanco(id){
    $.ajax({
        url: "/delete/"+id,
        type: "DELETE",
        dataType: "json",
        error: function(){
            console.log("Hubo un error en la peticion eliminarbanco")
        },
        success: function(response){
            getbancos();
        }
    });
};
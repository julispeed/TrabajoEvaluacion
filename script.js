/*-----------------------------------------------------------VARIABLES--------------------------------------------------------------------*/
var Clientes=[];//Arreglo Original de eventos
document.querySelector('.error').style.display='none';

var ClientesTabla=Clientes; //Arreglo a evaluar, su funcinaldiad es representar la tabla actual que se esta mostrando al usuario
var backcliente=null;//Objeto de respaldo en caso de que el cliente cancele la edicion, ya que una vez puesto editar, se crea un arreglo sin el mismo para insertar el editado


var actualizar= document.getElementById("boton-actualizar");// Boton Actualizar


var NumeroClientes=
(
    function()
    {
        let numero=0;
        return function()
        {
            numero++;
            return numero
        }
    }
)();

const tabla = document.getElementById("informacion");//Nuestra tabla en html





/*----------------------------------------------------------FIN VARIABLES---------------------------------------------------------------------*/



/*-----------------------------------------------------------FUNCIONES--------------------------------------------------------------------*/

function Eliminar(rs)
{
    if (rs!=null)
        {   
            if(confirm(`Desea eliminar el cliente ${rs}?`))
            {
                
                if (backcliente!=null)
                    {
                        Clientes.push(backcliente);                        
                    }   
                Clientes=Clientes.filter(c=>c.RazonSocial!=rs);                                
                actualizar.disabled=true;
                document.getElementById('boton-enviar').disabled=false;
                document.getElementById('Fclientes').reset();
                document.getElementById('boton-cancelar').style.display="none";
                tabla.innerHTML="";
                ListarTabla(Clientes);
            }
        }
    
}

function Insertar(event)
{
    document.getElementById('tclientes-razonsocial').style.border='';
    document.getElementsByClassName("radios")[0].style.border='';
    document.getElementById('cliente-fecha').style.border='';
    document.getElementById('cliente-numero').style.border= '';         
    document.getElementById('cbCategoriaIVA').style.border='';
    document.getElementById('tcliente-direccion').style.border='';


    
    event.preventDefault();//evita el recargo de la pagina al usar actualizar y enviar
    const expnum= new RegExp("^\\d+$");//expresion de telefono, donde solo aceptamos numeros
    const direccionRegex = new RegExp("^[A-Za-z]+\\s\\d+$"); // expresion de direccion, donde al principio aceptamos letras unicamentes y separado de un espacio numeros

  

    //relleno de campos
    const ClienteRazonSocial=document.getElementById('tclientes-razonsocial').value;
    const ClienteCondicionVenta=document.querySelector('input[name="CondicionVenta"]:checked');
    const ClienteFecha=document.getElementById('cliente-fecha').value;
    const ClienteDireccion=document.getElementById('tcliente-direccion').value;
    const ClienteCatIva=document.getElementById('cbCategoriaIVA').value;
    const Activo=document.getElementById('chactivo').checked;
    const ClientePuntuacion=document.getElementById('racliente-puntacion').value;
    const NumeroTel=document.getElementById('cliente-numero').value;        
    //validaciones , retornamos un cartel por cada campo que lo requiera
    if (!ClienteRazonSocial)
    {   
            document.getElementById('tclientes-razonsocial').style.border='2px solid red';
            document.querySelector('.error').style.display='block';
            document.getElementById('mensajeerror').textContent="Razón social inválida";
            return;
    }
    else if (!ClienteCondicionVenta)
        {
            document.getElementsByClassName("radios")[0].style.border=' 2px solid red';
            document.querySelector('.error').style.display='block';
            document.getElementById('mensajeerror').textContent="Seleccione una condicion de venta"; //caso imposible
            return;
        }
    else if (!ClienteCatIva)
    {
        document.getElementById('cbCategoriaIVA').style.border=' 2px solid red';
        document.querySelector('.error').style.display='block';
        document.getElementById('mensajeerror').textContent="Categoria IVA inválida"; //caso imposible
        return;
    }
    else if (!ClienteFecha || new Date(ClienteFecha)> Date.now())

    {
        document.getElementById('cliente-fecha').style.border=' 2px solid red';
        document.querySelector('.error').style.display='block';
        document.getElementById('mensajeerror').textContent="Fecha inválida o es mayor a la fecha actual";
        return;
    }
    else if (!direccionRegex.test(ClienteDireccion))
    {
        document.getElementById('tcliente-direccion').style.border=' 2px solid red';
        document.querySelector('.error').style.display='block';
        document.getElementById('mensajeerror').textContent="Dirección Inválida, debe colocarse el nombre de la calle primero y luego el numero, separados por un espacio.";
        return;
    }
    else if ( (!expnum.test(NumeroTel)) || (NumeroTel.length!=11))
    {      
        document.getElementById('cliente-numero').style.border= ' 2px solid red';         
        document.querySelector('.error').style.display='block';
        document.getElementById('mensajeerror').textContent="El numero no es un numero de telefono";
        return;
    }
    else if (Clientes.some(c=> c.RazonSocial.toLowerCase() === ClienteRazonSocial.toLowerCase()))
    {
        document.getElementById('tclientes-razonsocial').style.border='2px solid red';
        document.querySelector('.error').style.display='block';
        document.getElementById('mensajeerror').textContent="razon social ya ingresda";
            return;
    }
    document.querySelector('.error').style.display='none';
    document.getElementById('mensajeerror').textContent="";
    //objeto a crear
    const Cliente =
    {
        numero:NumeroClientes(),
        RazonSocial:ClienteRazonSocial,
        CondicionVenta:ClienteCondicionVenta.value,
        fecha:ClienteFecha,
        direccion:ClienteDireccion,
        CatIVA:ClienteCatIva,        
        activo:Activo,
        Puntuacion:ClientePuntuacion,
        numerotelefonico:NumeroTel
    }


    if (Cliente!=null)
    {
            Clientes.push(Cliente);
            console.log(
            
                `
                Cliente: ${Cliente.RazonSocial}\n
                Detelles:\n
                Numero:${Cliente.numero}\n
                Fecha:${Cliente.fecha}\n                
                Condicion de venta:${Cliente.CondicionVenta}\n
                Categoria IVA:${Cliente.CatIVA}\n
                Activo:${Cliente.activo}\n
                Puntuacion:${Cliente.Puntuacion}\n
                Numero: ${Cliente.numerotelefonico}
                `
            );
            alert(
                `
                Cliente: ${Cliente.RazonSocial}\n
                Detelles:\n
                Numero:${Cliente.numero}\n
                Fecha:${Cliente.fecha}\n                
                Condicion de venta:${Cliente.CondicionVenta}\n
                CategoriaIVA:${Cliente.CatIVA}\n
                Activo:${Cliente.activo}\n
                Puntuacion:${Cliente.Puntuacion}\n
                Numero: ${Cliente.numerotelefonico}
                `
            );
    }  
    //limpiamos formulario
    document.getElementById('Fclientes').reset();
    //limpiamos la tabla
    tabla.innerHTML="";
    //actualizamos
    ListarTabla(Clientes);

    document.getElementById('tclientes-razonsocial').style.border='';
    document.getElementsByClassName("radios")[0].style.border='';
    document.getElementById('cliente-fecha').style.border='';
    document.getElementById('cliente-numero').style.border= '';         
    document.getElementById('cbCategoriaIVA').style.border='';
    document.getElementById('tcliente-direccion').style.border='';
}

function ListarTabla(arregloClientes) {
    if (arregloClientes!=null || arregloClientes.length!=0)
    {
            arregloClientes.forEach((ElementCliente)=> 
                {    

                const fila = document.createElement("tr");
                const razonsocial=document.createElement("td");
                const condicionventa=document.createElement("td");
                const activo=document.createElement("td");
                const fecha=document.createElement("td");
                const editar=document.createElement("td");
                const eliminar=document.createElement("td");

                const imagenEditar = document.createElement("img");
                const imagenEliminar = document.createElement("img");
                /*
                fila.innerHTML=
                `
                    <td>${ElementCliente.RazonSocial}</td>
                    <td>${ElementCliente.CondicionVenta}</td>
                    <td>${ElementCliente.activo}</td>
                    <td>${ElementCliente.fecha}</td>
                    <td><img src="/Imagenes/Editar.png" alt="Editar" onclick="EditarCliente('${ElementCliente.RazonSocial}')"></td>
                    <td><img src="/Imagenes/Eliminar.png" alt="Eliminar" onclick="Eliminar('${ElementCliente.RazonSocial}')" id="delete" "></td>
                `;    
                */
                
                razonsocial.textContent=ElementCliente.RazonSocial;
                condicionventa.textContent=ElementCliente.CondicionVenta;
                activo.textContent=ElementCliente.activo;                
                fecha.textContent=ElementCliente.fecha;
                eliminar.id="delete";
                imagenEditar.src = "/Imagenes/Editar.png";  
                imagenEliminar.src = "/Imagenes/Eliminar.png";  
                imagenEditar.alt = "Editar";  
                imagenEliminar.alt = "Eliminar";  

                imagenEditar.onclick=function(){EditarCliente(ElementCliente.RazonSocial)};                
                imagenEliminar.onclick=function(){Eliminar(ElementCliente.RazonSocial)};                

                editar.appendChild(imagenEditar);                
                eliminar.appendChild(imagenEliminar);

                fila.appendChild(razonsocial);
                fila.appendChild(condicionventa);
                fila.appendChild(activo);
                fila.appendChild(fecha);
                fila.appendChild(editar);
                fila.appendChild(eliminar);

                tabla.appendChild(fila);
            });
            ClientesTabla=arregloClientes;
    }
    else
    {
        console.log('ocurrio un error en ListarTabla(arregloClientes)');
    }    
}

function EditarCliente(RazonSocial)
{    
    console.log(RazonSocial);
    let objeto=Clientes.find(c =>c.RazonSocial===RazonSocial);
    if (objeto!=null)
    {
        document.getElementById('boton-enviar').disabled = true;    
        document.getElementById('tclientes-razonsocial').value=objeto.RazonSocial;              
        document.querySelector(`input[id="${objeto.CondicionVenta}"]`).checked = true;
        document.getElementById('cliente-fecha').value=objeto.fecha;
        document.getElementById('tcliente-direccion').value=objeto.direccion;                
        document.getElementById('cbCategoriaIVA').value=objeto.CatIVA;
        document.getElementById('chactivo').checked=objeto.activo;
        document.getElementById('racliente-puntacion').value=objeto.Puntuacion;   
        document.getElementById('cliente-numero').value=objeto.numerotelefonico;
        actualizar.disabled=false;
        document.getElementById('boton-enviar').disabled=true;
        backcliente=Clientes.find(c=>c.RazonSocial===RazonSocial)
        Clientes=Clientes.filter(e=>e.RazonSocial!=RazonSocial);        //mirar aca
        document.getElementById('boton-cancelar').style.display='block';
        document.getElementById('delete').disabled=true;
    }
    else
    {
        console.log(`el objeto ${objeto} es nulo, se re pudria.`);
    }

}

/*-----------------------------------------------------------FIN FUNCIONES--------------------------------------------------------------------*/






/*-------------------------------------------------------LISTENER Y ELEMENTOS-----------------------------------------------------------------*/

document.getElementById('boton-cancelar').addEventListener('click',function(event)
{
    event.preventDefault();
    if (backcliente!=null)
        {
            Clientes.push(backcliente);
        }
    backcliente=null;
    actualizar.disabled=true;
    document.getElementById('boton-enviar').disabled=false;    
    document.getElementById('boton-cancelar').style.display='none';
    document.getElementById('Fclientes').reset();
    tabla.innerHTML="";
    ListarTabla(Clientes); 
    

})

actualizar.addEventListener('click',function(event)//Listener de ACTUALIZAR
{  
    
    Insertar(event);// importante el parametro EVENT para el listener como para insertar, evitara que se reinicie la pagina y perdamos los datos
    actualizar.disabled=true;
    backcliente=null;
    document.getElementById('boton-enviar').disabled = false;    
    document.getElementById('boton-cancelar').style.display='none';
    document.getElementById('Fclientes').reset();    
})                                    

//BOTON CARGAR DATO

document.getElementById('boton-enviar').addEventListener('click',Insertar);// llamamos a insertar unicamente

// FIN BOTON CARGAR DATOS




// barra responsive
            const variacionp=document.getElementById('puntuacion');
            const valor=document.getElementById('racliente-puntacion');

            
            valor.addEventListener('input',function()
            {
                variacionp.textContent=valor.value;
            }
            );
//fin barra responsive

document.getElementById('boton-reset').addEventListener('click', function(){document.querySelector('.error').style.display='none';})


/*-------------------------------------------------------FIN LISTENER Y ELEMENTOS-----------------------------------------------------------------*/


//---------------FIN--------------//
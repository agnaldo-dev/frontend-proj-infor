
class Pedido {
 
    createPedido(){

        let pedido = {items:[]};
        
        (new GuardaLocal).setData('pedido_cursos',pedido);
        
        return pedido; 
    }

    getPedido(){
        
        let pedido = (new GuardaLocal).getData('pedido_cursos');
    //alert(cart);    
        if ( pedido == null ) {
            return this.createPedido();
        }

        return pedido;
    }
 
    addPedido(pedido_cursos) {

        let pedido = this.getPedido();

        pedido.items.push(pedido_cursos);
        
        (new GuardaLocal).setData('pedido_cursos',pedido);
        
        return pedido;
    }

    removeCurso(curso_id){

        let pedido = this.getPedido();
        let position = pedido.items.findIndex(x => x.id == curso_id);
        if ( position != -1) {
           pedido.items.splice(position,1);
        }
        (new GuardaLocal).setData('pedido_cursos',pedido);
        return pedido;
    }
    
    total(pedido){
        let sum = 0;
        var valor = 0;
        for (let i = 0; i < pedido.items.length; i++) {
            valor = parseFloat(pedido.items[i].valor);
            sum += valor;
            
        }
        return sum;
    }
}

class GuardaLocal{

    getData(item){
        let data = localStorage.getItem(item);
       
        if ( data == '' ) {
            return null;

        }else{
     //     alert('data = '+data);
            data = atob(data);
            
            return JSON.parse(data);
        
        }
    }

    setData(item,dados) {
        if (dados == null) {
            localStorage.removeItem(item);
        }
        else {
            dados = JSON.stringify(dados);
            dados = btoa(dados);
         //   alert(dados);
            localStorage.setItem(item, dados);
        }
    }
    
}

class Login {
    
    getLogin(){

       var token = (new GuardaLocal).getData('token');
      
       if(token=='' || token==null){
          return true;
       }

       return false;
    }

}

class Curso {
 
    constructor(id,nome,valor){
        this.id = id;
        this.nome = nome;
        this.valor = valor;
    }
 
}

class Request {
 
    getBuscar(rota,item){
        
        this.login();

        $.ajax({
        type:"GET",
        url: rota,
        dataType:'json',
        success : function(data)
        {
            (new GuardaLocal).setData(item,data);
        }
        });
    }

    postSalvar(rota,dados){
        
        this.login();
    
        $.ajax({
        type:"POST",
        url: rota,
        data:dados,
        dataType:'json',
        success : function(data)
        {
            var data =  JSON.stringify(data);
        }
        });
    }

    buscaLogin(rota,user){
    
        $.ajax({
        type: "POST",
        url: rota,
        processData: false, 
        dataType:'json',
        data: JSON.stringify(user),
        cache: false,
        timeout: 600000,

        success: function (data) 
        {
            var data = JSON.parse(data.Authenticate);
            (new GuardaLocal).setData('token',data.Token);
            alert('sucess');   
        },
        error: function () {
            (new GuardaLocal).setData('token','');
        alert('error');
        }
        });

    }
    
    login(){
    
        if((new Login).getLogin()){

            window.location.href = 'login.html';

        }
    }

}

class Page{

    listar(){

        var div = document.getElementById("painel-li");
            
        var lista_cursos = (new GuardaLocal).getData('lista');

        var texto = "";
        $.each(lista_cursos.cursos, function( index, curso ) {
         
            texto +=`<li><div class="painel-curso">
            <img src="img/${ curso.url_img }" alt="Curso de ${ curso.nome }" 
            width="230" height="200">
            <div class="descricao-cursos">
            <p>${curso.nome}</p>
            <p>${curso.valor}</p>
            <button type="button" class="btn btn-primary" id="btn_${curso.id}" 
            data-toggle="modal" data-target="#detalheModal" data-id="${curso.id}">Detalhe</button>
            </div></div>
            </li>`;
                    
        });

        div.innerHTML = texto;

    }
    
    listarCompras(){

        var div = document.getElementById("painel-pagamento");
            
        var compras = (new GuardaLocal).getData('pedido_cursos');
    
        console.log(compras);

        var total = (new Pedido).total(compras);
        if(total==0){
            return false;
        }
        if(compras==null){
           return false;
        }
            var texto = `<div class="form-group">
            <ul class="lista-compras">`;

        $.each(compras.items, function( index, curso ) {
         
            texto +=`
            <li><p>Nome: ${curso.nome}
            Valor: ${curso.valor}
            <button type="button" class="btn btn-primary" id="btn_${curso.id}" onclick="removerItem(${curso.id})">Remover</button>
            </p></li>`;
                    
        });

        
        texto += `<li><p class="valor">Valor Total R$: ${total}</p></li><ul></div>`;

        div.innerHTML = texto;

    }

    listarPedido(){

        var div = document.getElementById("painel-pedidos-cusos");
            
        var compras = (new GuardaLocal).getData('pedido_cursos');
        if(compras==null){
          return false;
        }
        var texto = `<div class="painel-pedidos-curso"><ul>`;
        $.each(compras.items, function( index, curso ) {
        //console.log(curso.nome);
            texto +=`<li>
            Nome Curso: ${curso.nome}</li>
            <li>Valor: R$: ${curso.valor}</li>
            </li>`;
                    
        });

        var total = (new Pedido).total(compras);
        
        texto += `<li><p class="valor">Valor Total R$: ${total}</p></li><ul></div>`;
            
        div.innerHTML = texto;

    }

    mostrarDetelhe(){
    
        var div = document.getElementById("painel-detalhe-modal");
        
        var curso = (new GuardaLocal).getData('detalhe');
           
        var texto =`<div class="painel-descricao"><img src="img/${curso.url_img}" 
            alt="Curos de composer" width="230" height="200">
            <input type="hidden" name="id_curso" id="id_curso" value="${curso.id}">
            
            <div class="descricao-cursos">
            <p>
            <input type="text" name="nome_curso" id="nome_curso" 
            value="${curso.nome}" style="background: #f2f2f2;border:none"  size="12">
            </p>
            <p style="display: inline;">Valor R$.
            <input type="text" name="valor_curso" id="valor_curso" 
            value="${curso.valor}" style="background: #f2f2f2;border:none"  size="12">
            </p>
            </div></div>`;
    
            div.innerHTML = texto;
            
    }

    home(){
        var local = new GuardaLocal;
        var token = local.getData('token');
        var page = 'index.html';

     alert('teste = '+token);
           if(token == '' || token==null){

            page = 'login.html';

        }
 
        window.location.href = page;
    }
 
}
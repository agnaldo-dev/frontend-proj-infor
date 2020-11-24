/*** Fucoes para ser chamados nos botoes 
 * as clases entao no classes.js 
*/
function addCarrinho(obj){

    var form = document.querySelector("#form-detalhe");

    var form = new FormData(form);

    var pedido_cursos = {
        id:form.get('id_curso'),
        nome:form.get('nome_curso'),
        valor:form.get('valor_curso')
        };
    
    var pedido = new Pedido;
    
    pedido.addPedido(pedido_cursos);

    window.location.href = 'index.html';
    
}

function removerItem(id){

    var pedido = new Pedido;

    pedido.removeCurso(id);
    
    (new Page).listarCompras(); 

}


function fecharModal(){

    window.location.href = 'index.html';

}

function valorCompra(){

    var pedido = new Pedido;

    return pedido.total();

}

function fazerPagamento(){
    var forma = $("#forma-pagamento").val();
    var page = "index.html";

     if(forma==1){
         page = "pagamento-cartao.html";

     }
     if(forma==2){
         page = "pagamento-boleto.html"; 

     }
    
    window.location.href = page;

}

/** variavei global para inicializar valoes da pagina */
var res = new Request;
res.getBuscar('http://localhost:8000/cursos','lista');

var pagina = new Page;

pagina.listar();

pagina.listarPedido();

/** carregamento de conteudo de modal */
$('#detalheModal').on('shown.bs.modal', function (event) {

    var button = $(event.relatedTarget) // Button that triggered the modal
    var id = button.data('id');
    
    (new Request).getBuscar('http://localhost:8000/cursos/'+id,'detalhe');

    (new Page).mostrarDetelhe();
        
});

$('#verCartModal').on('shown.bs.modal', function (event) {
    
    (new Page).listarCompras();

});

var user = {
	"email":"agnaldo@sts.com",
	"senha":"12345"
};

res.buscaLogin('http://localhost:8000/login');
//res.getBuscar('http://localhost:8000/login','token');
var login = (new GuardaLocal).getData('token');
console.log(login);
alert('login = '+login);



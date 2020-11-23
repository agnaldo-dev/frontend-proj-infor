
function addCarrinho() {
    
    var add_valor_compra = $("#valor_compra").val();
    
    var valor_curso = $("#valor_curso").val();
    
    add_valor_compra = parseFloat(valor_curso)+parseFloat(add_valor_compra);

    localStorage.setItem('valor_compra', add_valor_compra);
    var l = localStorage.getItem('valor_compra');

//    alert('teste'+l);
    window.location = 'index.html';
    
}

function comprar() {
    alert('comprar');
}

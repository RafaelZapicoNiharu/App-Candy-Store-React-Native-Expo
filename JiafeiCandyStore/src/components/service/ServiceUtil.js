const buscaDoces = ( pesq = '') => {
    return fetch("http://localhost:3000/doces")
    .then((resp)=>{
        //console.log(resp);
        return resp.json()
    }).then((json)=>{
        const lista = json.filter((u) => pesq === '' || u.nome.includes(pesq))
        const uLista = lista.map((u)=>{
            return {id: u.id, nome: u.nome, preco: u.preco, quantidade: u.quantidade}
        })
        return uLista
    }).catch(()=>{
        return []
    })
}

export { buscaDoces}

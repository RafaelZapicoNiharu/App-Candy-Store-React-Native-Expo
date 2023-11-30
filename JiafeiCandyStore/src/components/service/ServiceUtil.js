const buscaCEP2 = async (cep) => {
    const sincrono = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((resp) => {
            console.log(resp)
            return resp.json();
        })
        .then((json) => {
            console.log(json)
            return json
        })
    return sincrono
}

const buscaDoces = (pesq = '') => {
    return fetch("http://ec2-52-200-79-59.compute-1.amazonaws.com:3000/doces", { headers: { "Content-Type": "application/json; charset=utf-8", "Accept": "/" } }, 5000)
        .then((resp) => {
            return resp.json()
        }).then((json) => {
            const lista = json.filter((i) => (pesq === '' || i.tipoDoce.toLowerCase().includes(pesq.toLowerCase())))
            const iLista = lista.map((i) => {
                return { id: i.id, tipoDoce: i.tipoDoce, preco: i.preco, quantidade: i.quantidade }
            })
            return iLista;
        }).catch((error) => {
            console.log(error);
            return []
        })
}

const buscaEncomendas = (pesq = '') => {
    return fetch("http://ec2-52-200-79-59.compute-1.amazonaws.com:3000/encomendas", { headers: { "Content-Type": "application/json; charset=utf-8", "Accept": "/" } }, 5000)
        .then((resp) => {
            return resp.json()
        }).then((json) => {
            const lista = json.filter((u) => pesq === '' || u.nome.toLowerCase().includes(pesq.toLowerCase()));
            const uLista = lista.map((u) => {
                return { id: u.id, nome: u.nome, tipoDoce: u.tipoDoce, quantidade: u.quantidade }
            })
            return uLista
        }).catch(() => {
            return []
        })
}

export { buscaCEP2, buscaDoces, buscaEncomendas }

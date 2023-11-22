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

export {  buscaCEP2 }

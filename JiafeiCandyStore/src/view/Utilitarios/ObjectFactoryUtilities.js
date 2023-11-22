
class ObjectFactoryUtilities {

    static async createUser(nome, email, password, cep, logradouro, bairro, cidade, estado, numero, complemento) {
        return new Promise((resolve) => {
            const newUser = {
                nome: nome,
                email: email,
                password: password,
                cep: cep,
                estado: estado,
                logradouro: logradouro,
                cidade: cidade,
                bairro: bairro,
                numero: numero,
                complemento: complemento,
                profile: 'cliente',
            };
            return resolve(newUser);
        });
    }

    static async createDoce(preco, quantidade, tipoDoce) {
        return new Promise((resolve) => {
            const newDoce = {
                preco: preco,
                quantidade: quantidade,
                tipoDoce: tipoDoce,
            };
            return resolve(newDoce);
        });
    }

    static async createEncomenda(idUser, nome, tipoDoce, quantidade, dataEntrega) {
        return new Promise((resolve) => {
            const newEncomenda = {
                idUser: idUser,
                nome: nome,
                tipoDoce: tipoDoce,
                quantidade: quantidade,
                dataEntrega: dataEntrega,
            };
            return resolve(newEncomenda);
        });
    }

    static async createUserSession(response) {
        return new Promise((resolve) => {
            const novoUser = {
                token: response.data.token,
                id: response.data.id,
                nome: response.data.nome,
                email: response.data.email,
                login: response.data.login,
                password: response.data.password,
                cep: response.data.cep,
                estado: response.data.estado,
                logradouro: response.data.logradouro,
                cidade: response.data.cidade,
                numero: response.data.numero,
                complemento: response.data.complemento,
                profile: response.data.profile,
            };
            setTimeout(() => {
                console.log(response.data);
            }, 1000);
            return resolve(novoUser);
        });
    }

    static async createUserEdit(id, nome, email, password, cep, logradouro, bairro, cidade, estado, numero, complemento) {
        return new Promise((resolve) => {
            const novoUser = {
                id: id,
                nome: nome,
                email: email,
                password: password,
                cep: cep,
                estado: estado,
                logradouro: logradouro,
                cidade: cidade,
                bairro: bairro,
                numero: numero,
                complemento: complemento,
                // profile: profile,
            };
            setTimeout(() => {
                console.log(novoUser);
            }, 1000);
            return resolve(novoUser);
        });
    }

    static async createSimpleUser(email, password) {
        return new Promise((resolve) => {
            const novoSimpleUser = {
                email,
                password,
            };
            return resolve(novoSimpleUser);
        });
    }
}

export default ObjectFactoryUtilities;
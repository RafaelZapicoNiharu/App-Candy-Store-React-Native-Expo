class ValidaterUtilities {
  static validacaoNome = (nome) => {
    if (!nome || nome.length < 3) {
      return "Por favor, insira um nome válido (mínimo de 3 caracteres)";
    }
    return "";
  };

  static validacaoEmail = (email) => {
    if (!email || !email.includes("@") || email.length < 3) {
      return "Por favor, insira um e-mail válido (contendo @)";
    }
    return "";
  };

  static validacaoPassword = (password) => {
    if (!password || password.length < 3) {
      return "Por favor, insira uma senha válida (mínimo de 3 caracteres).";
    }
    return "";
  };

  static validacaoCep = (cep) => {
    if (!cep || cep.length < 3) {
      return "Por favor, insira um CEP";
    }
    return "";
  };

  static validacaoLogradouro = (logradouro) => {
    if (!logradouro || logradouro.length < 1) {
      return "Por favor, insira um logradouro";
    }
    return "";
  };

  static validacaoBairro = (bairro) => {
    if (!bairro || bairro.length < 1) {
      return "Por favor, insira um bairro";
    }
    return "";
  };

  static validacaoCidade = (cidade) => {
    if (!cidade || cidade.length < 1) {
      return "Por favor, insira uma cidade ";
    }
    return "";
  };

  static validacaoEstado = (estado) => {
    if (!estado || estado.length !== 2) {
      return "Por favor, insira um estado válido (2 caracteres).";
    }
    return "";
  };

  static validacaoNumero = (numero) => {
    if (!numero || numero.length < 1) {
      return "Por favor, insira um número";
    }
    return "";
  };

  static userValid(nome, email, password, cep, logradouro, bairro, cidade, estado, numero) {
    let nomeError = this.validacaoNome(nome);
    let emailError = this.validacaoEmail(email);
    let passwordError = this.validacaoPassword(password);
    let cepError = this.validacaoCep(cep);
    let logradouroError = this.validacaoLogradouro(logradouro);
    let bairroError = this.validacaoBairro(bairro);
    let cidadeError = this.validacaoCidade(cidade);
    let estadoError = this.validacaoEstado(estado);
    let numeroError = this.validacaoNumero(numero);

    if (nomeError || emailError || passwordError || cepError || logradouroError || bairroError || cidadeError || estadoError || numeroError) {
      setErrorVisible(true);
      setErrorMessage(nomeError || emailError || passwordError || cepError || logradouroError || bairroError || cidadeError || estadoError || numeroError);
      return false;
    }
    return true;
  }
}

export default ValidaterUtilities;
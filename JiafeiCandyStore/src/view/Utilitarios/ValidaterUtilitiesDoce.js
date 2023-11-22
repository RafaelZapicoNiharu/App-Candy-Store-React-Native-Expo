class ValidaterUtilitiesDoce {
  static validacaoTipoDoce = (tipoDoce) => {
    if (!tipoDoce || tipoDoce.length <= 1) {
      return "Por favor, selecione um doce";
    }
    return "";
  };

  static validacaoPreco = (preco) => {
    const regexPreco = /^\d+(,\d{1,2})?$/;// Verifica se o preço é um número válido, seja inteiro ou com centavos
    if (!preco || !regexPreco.test(preco)) {
      return "Por favor, preencha o preço";
    }
    return "";
  };

  static validacaoQuantidade = (quantidade) => {
    if (!quantidade || quantidade.length <= 1) {
      return "Por favor, preencha a quantidade";
    }
    return "";
  };

  static doceValid(tipoDoce, preco, quantidade) {
    const tipoDoceError = this.validacaoTipoDoce(tipoDoce);
    const precoError = this.validacaoPreco(preco);
    const quantidadeError = this.validacaoQuantidade(quantidade);

    if (tipoDoceError || precoError || quantidadeError) {
      setErrorVisible(true);
      setErrorMessage(tipoDoceError || precoError || quantidadeError);
      return false;
    }
    return true;
  }
}

export default ValidaterUtilitiesDoce;
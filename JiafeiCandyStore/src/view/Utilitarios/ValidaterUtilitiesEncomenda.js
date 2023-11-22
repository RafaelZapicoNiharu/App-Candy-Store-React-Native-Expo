class ValidaterUtilitiesEncomenda {

  static validacaoTipoDoce = (tipoDoce) => {
    if (!tipoDoce || tipoDoce.length <= 1) {
      return "Por favor, selecione doce";
    }
    return "";
  };

  static validacaoQuantidade = (quantidade) => {
    if (!quantidade || quantidade.length <= 1) {
      return "Por favor, preencha a quantidade";
    }
    return "";
  };

  static validacaoDataEntrega = (dataEntrega) => {
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!dataEntrega || !regexData.test(dataEntrega)) {
      return "Por favor, preencha uma data de entrega válida no formato DD/MM/YYYY";
    }

    const hoje = new Date();
    const dataSelecionada = new Date(dataEntrega.split('/').reverse().join('-'));

    if (isNaN(dataSelecionada.getTime()) || dataSelecionada < hoje) {
      return "A data de entrega deve ser maior à data atual.";
    }

    return "";
  };

  static encomendaValid(tipoDoce, quantidade, dataEntrega) {
    let tipoDoceError = this.validacaoTipoDoce(tipoDoce);
    let quantidadeError = this.validacaoQuantidade(quantidade);
    let dataEntregaError = this.validacaoDataEntrega(dataEntrega);

    if (tipoDoceError || quantidadeError || dataEntregaError) {
      setErrorVisible(true);
      setErrorMessage(tipoDoceError || quantidadeError || dataEntregaError);
      return false;
    }
    return true;
  }
}

export default ValidaterUtilitiesEncomenda;
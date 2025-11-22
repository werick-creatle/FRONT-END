export interface ItemPedidoDTO{
    jogoId: number;
    nomeJogo: string;
    quantidade: number;
    precoUnitario: number;
}
export interface PedidoViewDTO{
    pedidoId: number;
    dataDoPedido: string;
    valorTotal: number;
    itens: ItemPedidoDTO[];
}

package br.com.uisa.externalrepair.application.util;

public class Constants {

    public static final String CREATE_REPAIR_TAG = "Solicitação Inicial";
    public static final String CREATE_REPAIR_DESCRIPTION =
            "Realiza a criação dos dados para a solicitação inicial";

    public static final String EQUIPMENT_RECEIPT_TAG = "Sinaliza o Recebimento da NF-e";
    public static final String EQUIPMENT_RECEIPT_DESCRIPTION =
            "Realiza a sinalização do recebimento da NF-e";

    public static final String RECEIPT_ITEM_TAG = "Sinaliza o Recebimento do Item";
    public static final String RECEIPT_ITEM_DESCRIPTION =
            "Realiza a sinalização do recebimento do item de reparo";

    public static final String NEGOTIATION_REPAIR_TAG = "Negociação de Reparo";
    public static final String NEGOTIATION_REPAIR_DESCRIPTION =
            "Realiza o retorno da negociação do reparo na plataforma IBID";

    public static final String LOGIN_TAG = "Login";
    public static final String LOGIN_DESCRIPTION = "Realiza o login do usuário na plataforma";

    public static final String HOME_TAG = "Home";
    public static final String HOME_DESCRIPTION = "Retorna os dados da tela inicial do usuário";

    public static final String HISTORY_TAG = "Histórico";
    public static final String HISTORY_DESCRIPTION = "Retorna o histórico de solicitações do usuário";

    public static final String RECEIPT_REPAIR_LIST_TAG = "Lista de NF-e para recebimento";
    public static final String RECEIPT_REPAIR_LIST_DESCRIPTION =
            "Retorna a lista de NF-e para recebimento";

    public static final String RECEIPT_ITEM_LIST_TAG = "Lista de Itens de Recebimento";
    public static final String RECEIPT_ITEM_LIST_DESCRIPTION =
            "Retorna a lista de itens de recebimento de reparos";

    private Constants() {
        // Prevent instantiation
    }
}

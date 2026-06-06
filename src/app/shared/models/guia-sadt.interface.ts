export interface Procedimento {
  codigo_tuss?: string;
  descricao?: string;
  quantidade?: number;
  unidade_medida?: string;
}

export interface DadosOperadora {
  registro_ans?: string;
  nome_operadora?: string;
}

export interface DadosBeneficiario {
  numero_carteira?: string;
  nome?: string;
  data_nascimento?: string;
  cns?: string;
  atendimento_rn?: boolean;
}

export interface DadosSolicitante {
  nome_contratado?: string;
  cnes_solicitante?: string;
  nome_profissional?: string;
  conselho?: string;
  numero_conselho?: string;
  uf_conselho?: string;
  cbo?: string;
  assinatura_data?: string;
}

export interface DadosExecutante {
  nome_contratado?: string;
  cnes_executante?: string;
  codigo_na_operadora?: string;
}

export interface GuiaSADT {
  numero_guia?: string;
  numero_guia_prestador?: string;
  data_solicitacao?: string;
  data_autorizacao?: string;
  senha_autorizacao?: string;
  data_validade_senha?: string;
  tipo_guia?: string;
  operadora?: DadosOperadora;
  beneficiario?: DadosBeneficiario;
  solicitante?: DadosSolicitante;
  executante?: DadosExecutante;
  indicacao_clinica?: string;
  cid_principal?: string;
  cid_secundario?: string;
  carater_atendimento?: string;
  tipo_atendimento?: string;
  procedimentos: Procedimento[];
  confianca_extracao?: number;
  metodo_extracao?: string;
  campos_pendentes: string[];
}

import { Component, inject, signal } from '@angular/core';
import { GuiaSADT, Procedimento } from '../../shared/models/guia-sadt.interface';
import { form, FormField, max } from '@angular/forms/signals';
import { FileService } from '../../core/services/FileService/file-service';
@Component({
  selector: 'app-guia',
  imports: [FormField],
  templateUrl: './guia.html',
  styleUrl: './guia.css',
})
export class Guia {
  private fileService = inject(FileService);
  protected guiaResult = this.fileService.guiaResult();

  toDateInput(valor: string | Date | undefined): string {
    if (!valor) return '';
    const v = new Date(valor);
    return v.toDateString();
  }

  constructor() {
    console.log(this.guiaResult);
  }
  guiaModel = signal<GuiaSADT>({
    numero_guia: this.guiaResult?.numero_guia || '',
    numero_guia_prestador: this.guiaResult?.numero_guia_prestador || '',
    data_solicitacao: this.toDateInput(this.guiaResult?.data_solicitacao) || '',
    data_autorizacao: this.toDateInput(this.guiaResult?.data_autorizacao) || '',
    senha_autorizacao: this.guiaResult?.senha_autorizacao || '',
    data_validade_senha: this.toDateInput(this.guiaResult?.data_validade_senha),
    tipo_guia: this.guiaResult?.tipo_guia || '',
    operadora: {
      registro_ans: this.guiaResult?.operadora?.registro_ans || '',
      nome_operadora: this.guiaResult?.operadora?.nome_operadora || '',
    },
    beneficiario: {
      numero_carteira: this.guiaResult?.beneficiario?.numero_carteira || '',
      nome: this.guiaResult?.beneficiario?.nome || '',
      data_nascimento: this.guiaResult?.beneficiario?.data_nascimento,
      cns: this.guiaResult?.beneficiario?.cns || '',
      atendimento_rn: this.guiaResult?.beneficiario?.atendimento_rn || false,
    },
    solicitante: {
      nome_contratado: this.guiaResult?.solicitante?.nome_contratado || '',
      cnes_solicitante: this.guiaResult?.solicitante?.cnes_solicitante || '',
      nome_profissional: this.guiaResult?.solicitante?.nome_profissional || '',
      conselho: this.guiaResult?.solicitante?.conselho || '',
      numero_conselho: this.guiaResult?.solicitante?.numero_conselho || '',
      uf_conselho: this.guiaResult?.solicitante?.uf_conselho || '',
      cbo: this.guiaResult?.solicitante?.cbo || '',
      assinatura_data: this.guiaResult?.solicitante?.assinatura_data,
    },
    executante: {
      nome_contratado: this.guiaResult?.executante?.nome_contratado || '',
      cnes_executante: this.guiaResult?.executante?.cnes_executante || '',
      codigo_na_operadora: this.guiaResult?.executante?.codigo_na_operadora || '',
    },
    indicacao_clinica: this.guiaResult?.indicacao_clinica || '',
    cid_principal: this.guiaResult?.cid_principal || '',
    cid_secundario: this.guiaResult?.cid_secundario || '',
    carater_atendimento: this.guiaResult?.carater_atendimento || '',
    tipo_atendimento: this.guiaResult?.tipo_atendimento || '',
    procedimentos: [],
    confianca_extracao: this.guiaResult?.confianca_extracao || 0,
    metodo_extracao: this.guiaResult?.metodo_extracao || '',
    campos_pendentes: [],
  });

  guiaForm = form(this.guiaModel, (schemaPath) => {
    max(schemaPath.operadora!.registro_ans!, 6); // 1
    max(schemaPath.numero_guia_prestador!, 20); // 2
    // FALTA 3
    max(schemaPath.beneficiario!.numero_carteira!!, 20); // 4
    max(schemaPath.senha_autorizacao!, 20); //5
    // 6 FEITO
    // 7 FEITO
    // FALTA 8
    // 9 FEITO
    max(schemaPath.beneficiario!.nome!, 70); // 10
    max(schemaPath.beneficiario!.cns!, 15); // 11
    max(schemaPath.executante!.codigo_na_operadora!, 14); // 12, 19
    max(schemaPath.solicitante!.nome_contratado!, 70); // 13, 20
    max(schemaPath.solicitante!.nome_profissional!, 70); // 14
    max(schemaPath.solicitante!.conselho!, 2); // 15
    max(schemaPath.solicitante!.numero_conselho!, 15); // 16
    max(schemaPath.solicitante!.uf_conselho!, 2); // 17
    max(schemaPath.solicitante!.cbo!, 6); // 18
    // FALTA 21
    // 22 FEITO
    // FALTA 23
    // FALTA 24
    // FALTA 25
    // FALTA 26
    // FALTA 27
    max(schemaPath.indicacao_clinica!, 500); //28
    max(schemaPath.cid_principal!, 4); // 29
    max(schemaPath.cid_principal!, 4); // 30
    // FALTA 31
    // FALTA 32
    // FALTA 33
    // 34 = IDX, 35= TUSS, 36 = DESC, 37 QTDE, 38QTDE MED
    // FALTA 39 ?
    // FALTA 40 ?
    // FALTA 41 ?
    // FALTA 42 schemaPath.executante!.codigo_na_operadora
    // FALTA 43 schemaPath.solicitante!.nome_contratado
    // FALTA 44 CNES
    // FALTA 45 ?
    // FALTA 46 ?
    // FALTA 47 NAO PRECISA ASSINATURA
    // FALTA 48 NAO PRECISA ASSINATURA
    // FALTA 49  NAO PRECISA ASSINATURA
  });
}

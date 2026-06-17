import { Component, inject, signal } from '@angular/core';
import { GuiaSADT } from '../../shared/models/guia-sadt.interface';
import { form, FormField, FormRoot, max, submit } from '@angular/forms/signals';
import { FileService } from '../../core/services/FileService/file-service';

@Component({
  selector: 'app-guia',
  imports: [FormField, FormRoot],
  templateUrl: './guia.html',
  styleUrl: './guia.css',
})
export class Guia {
  private fileService = inject(FileService);
  protected guiaResult = this.fileService.guiaResult();

  guiaModel!: ReturnType<typeof signal<GuiaSADT>>;
  guiaForm: any;

  toDateInputValue(data: string | null | undefined): string {
    if (!data) return '';
    if (data.includes('-')) return data;
    const [day, month, year] = data.split('/');
    if (!day || !month || !year) return '';
    return `${year}-${month}-${day}`;
  }

  constructor() {
    const g = this.guiaResult;

    this.guiaModel = signal({
      numero_guia: g?.numero_guia || '',
      numero_guia_prestador: g?.numero_guia_prestador || '',
      data_solicitacao: this.toDateInputValue(g?.data_solicitacao),
      data_autorizacao: this.toDateInputValue(g?.data_autorizacao),
      senha_autorizacao: g?.senha_autorizacao || '',
      data_validade_senha: this.toDateInputValue(g?.data_validade_senha),
      tipo_guia: g?.tipo_guia || '',
      operadora: {
        registro_ans: g?.operadora?.registro_ans || '',
        nome_operadora: g?.operadora?.nome_operadora || '',
      },
      beneficiario: {
        numero_carteira: g?.beneficiario?.numero_carteira || '',
        validade_carteira: '',
        nome: g?.beneficiario?.nome || '',
        data_nascimento: this.toDateInputValue(g?.beneficiario?.data_nascimento),
        cns: g?.beneficiario?.cns || '',
        atendimento_rn: g?.beneficiario?.atendimento_rn || false,
      },
      solicitante: {
        nome_contratado: g?.solicitante?.nome_contratado || '',
        cnes_solicitante: g?.solicitante?.cnes_solicitante || '',
        nome_profissional: g?.solicitante?.nome_profissional || '',
        conselho: g?.solicitante?.conselho || '',
        numero_conselho: g?.solicitante?.numero_conselho || '',
        uf_conselho: g?.solicitante?.uf_conselho || '',
        cbo: g?.solicitante?.cbo || '',
        assinatura_data: this.toDateInputValue(g?.solicitante?.assinatura_data),
      },
      executante: {
        nome_contratado: g?.executante?.nome_contratado || '',
        cnes_executante: g?.executante?.cnes_executante || '',
        codigo_na_operadora: g?.executante?.codigo_na_operadora || '',
      },
      indicacao_clinica: g?.indicacao_clinica || '',
      data_internacao: '',
      regime_internacao: '',
      qtde_diarias: '',
      uso_opme: '',
      uso_quimioterapico: '',
      cid_principal: g?.cid_principal || '',
      cid_secundario: g?.cid_secundario || '',
      cid_terciario: '',
      cid_quartenario: '',
      carater_atendimento: g?.carater_atendimento || '',
      tipo_atendimento: g?.tipo_atendimento || '',
      indicacao_acidente: '',
      procedimentos: [],
      data_adimissao: '',
      diarias_autorizada: '',
      acomodacao: '',
      observacoes: '',
      confianca_extracao: g?.confianca_extracao || 0,
      metodo_extracao: g?.metodo_extracao || '',
      campos_pendentes: [],
    });

    this.guiaForm = form(this.guiaModel, (schemaPath) => {
      max(schemaPath.operadora!.registro_ans!, 6);
      max(schemaPath.numero_guia_prestador!, 20);
      max(schemaPath.beneficiario!.numero_carteira!!, 20);
      max(schemaPath.senha_autorizacao!, 20);
      max(schemaPath.beneficiario!.nome!, 70);
      max(schemaPath.beneficiario!.cns!, 15);
      max(schemaPath.executante!.codigo_na_operadora!, 14);
      max(schemaPath.solicitante!.nome_contratado!, 70);
      max(schemaPath.solicitante!.nome_profissional!, 70);
      max(schemaPath.solicitante!.conselho!, 2);
      max(schemaPath.solicitante!.numero_conselho!, 15);
      max(schemaPath.solicitante!.uf_conselho!, 2);
      max(schemaPath.solicitante!.cbo!, 6);
      max(schemaPath.indicacao_clinica!, 500);
      max(schemaPath.cid_principal!, 4);
      max(schemaPath.cid_secundario!, 4);
    });
  }
  // cid 3 e 4
  baixarJSON(value = this.guiaModel()) {
    const json = JSON.stringify(value, null, 2);
    const blob = new Blob([json], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `guia-${value.beneficiario?.nome ?? 'sem-nome'}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

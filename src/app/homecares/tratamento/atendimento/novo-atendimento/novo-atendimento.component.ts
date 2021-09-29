import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { Estado } from 'src/app/classes/estado.class';
import { Grupo } from 'src/app/classes/grupo.class';
import { Modelo } from 'src/app/classes/modelo.class';
import { Profissional } from 'src/app/classes/profissional.class';
import { StatusAtendimento } from 'src/app/enums/status-atendimento.enum';
import { AtendimentoAdicionar } from 'src/app/homecares/classes/atendimento-adicionar.class';
import { AtendimentoEndereco } from 'src/app/homecares/classes/atendimento-endereco.class';
import { AtendimentoRecorrencia } from 'src/app/homecares/classes/atendimento-recorrencia.class';
import { Diaria } from 'src/app/homecares/classes/diaria.class';
import { SituacaoAtendimento } from 'src/app/homecares/classes/situacao-atendimento.class';
import { AtendimentoService } from 'src/app/homecares/services/atendimento.service';
import { TratamentoStorageService } from 'src/app/homecares/services/tratamento-storage.service';
import { DominioService } from 'src/app/services/dominio.service';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { ViaCepService } from 'src/app/services/via-cep.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-novo-atendimento',
  templateUrl: './novo-atendimento.component.html',
  styleUrls: ['./novo-atendimento.component.css']
})
export class NovoAtendimentoComponent implements OnInit {

  hideForm: boolean = true;

  atendimentoForm: FormGroup;

  profissional: Profissional;
  endereco: AtendimentoEndereco;
  atendimento: AtendimentoAdicionar;
  modelos: Modelo[];
  grupos: Grupo[];

  constructor(
    private formBuilder: FormBuilder,
    private validService: SharedValidService,
    private loading: SharedLoadingService,
    private tratamentoDadosService: TratamentoStorageService,
    private profissionalService: ProfissionalService,
    private viaCep: ViaCepService,
    private atendimentoService: AtendimentoService,
    private dominioService: DominioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.atendimentoForm = this.formBuilder.group({
      data: [null, [Validators.required]],
      hora: [null, [Validators.required]],
      profissionalCpf: [null, [Validators.required]],
      profissionalNome: [null, [Validators.required]],
      endereco: this.formBuilder.group({
        logradouro: [null, [Validators.required, Validators.maxLength(60)]],
        numero: [null, [Validators.required, Validators.maxLength(10)]],
        complemento: [null, [Validators.maxLength(60)]],
        bairro: [null],
        cidade: [null],
        cep: [null, [Validators.required, Validators.maxLength(8)]],
        estado: [null]
      }),
      valorAtendimentoHomecare: [null, [Validators.required]],
      valorAtendimentoCliente: [null, [Validators.required]],
      valorAtendimentoProfissional: [null, [Validators.required]],
      valorAjudaCusto: [null, [Validators.required]],
      observacao: [null, [Validators.required]],
      modelos: [null],
      grupos: [null]
    });
  }

  ngOnInit(): void {
    this.dominioService.getModelos().pipe(
      map((response) => {
        this.modelos = response.body;
      }),
      concatMap(() => this.dominioService.getGrupos().pipe(
        map(response => {
          this.grupos = response.body;
        }))
      )
    ).subscribe(() => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
        this.loading.emitChange(false);
      });
    });
    if (this.tratamentoDadosService?.tratamentoAberto) {
      this.endereco.logradouro = this.tratamentoDadosService?.tratamentoAberto?.paciente.endereco.logradouro;
      this.endereco.numero = this.tratamentoDadosService?.tratamentoAberto?.paciente.endereco.numero;
      this.endereco.complemento = this.tratamentoDadosService?.tratamentoAberto?.paciente.endereco.complemento;
      this.endereco.bairro = this.tratamentoDadosService?.tratamentoAberto?.paciente.endereco.bairro;
      this.endereco.cidade = this.tratamentoDadosService?.tratamentoAberto?.paciente.endereco.cidade;
      this.endereco.estado = this.tratamentoDadosService?.tratamentoAberto?.paciente.endereco.estado;
      this.endereco.cep = this.tratamentoDadosService?.tratamentoAberto?.paciente.endereco.cep;
      this.atendimentoForm.controls.endereco.patchValue(this.endereco, { onlySelf: true, emitEvent: true });

      this.inicializaDatepicker();
      this.inicializaTimepicker();
      this.hideForm = false;
    } else {
      this.router.navigate([`../`], { relativeTo: this.activatedRoute });
    }
  }

  onSubmit() {
    this.loading.emitChange(true);

    this.atendimento = this.construirObjetoAdicionarAtendimento();

    this.atendimentoService.adicionarTratamento(this.atendimento)
      .subscribe(() => {
        this.showSwal('info', 'Novo atendimento adicionado com sucesso!', true);
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error.status == 412) {
          this.showSwal('warning', errorResponse.error?.data.message, true);
        } else {
          this.showSwal('error', 'Falha ao tentar adicionar novo atendimento!', false);
        }
      }, () => this.loading.emitChange(false));
  }

  construirObjetoAdicionarAtendimento(): AtendimentoAdicionar {
    let atendimento = new AtendimentoAdicionar();
    atendimento.homeCareId = this.validService.getValid()?.id;
    atendimento.tratamentoId = this.tratamentoDadosService.tratamentoAberto.id;
    atendimento.profissionalId = this.profissional.id;
    atendimento.pacienteId = this.tratamentoDadosService.tratamentoAberto.paciente.id;
    atendimento.data = new Date(Number(this.atendimentoForm.controls.data.value.substring(6, 10)), Number(this.atendimentoForm.controls.data.value.substring(3, 5) - 1), Number(this.atendimentoForm.controls.data.value.substring(0, 2)));
    atendimento.hora = this.atendimentoForm.controls.hora.value;
    atendimento.endereco = this.construirObjetoAtendimentoEndereco();
    atendimento.valorHomeCare = this.atendimentoForm.controls.valorAtendimentoHomecare.value;
    atendimento.valorProfissional = this.atendimentoForm.controls.valorAtendimentoCliente.value;
    atendimento.valorPaciente = this.atendimentoForm.controls.valorAtendimentoProfissional.value;
    atendimento.valorAjudaCusto = this.atendimentoForm.controls.valorAjudaCusto.value;
    atendimento.observacao = this.atendimentoForm.controls.observacao.value;
    atendimento.situacao = new SituacaoAtendimento(null, new Date().toISOString(), StatusAtendimento.Agendado);
    atendimento.recorrencia = this.recorrenciaDefault();
    atendimento.grupos = this.atendimentoForm.controls.grupos.value;
    return atendimento;
  }

  construirObjetoAtendimentoEndereco(): AtendimentoEndereco {
    let endereco = new AtendimentoEndereco();
    endereco = this.endereco;
    endereco.numero = this.atendimentoForm.controls.endereco.get('numero').value;
    endereco.complemento = this.atendimentoForm.controls.endereco.get('complemento').value;
    return endereco;
  }

  dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function () {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }

  timeChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function () {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }

  inicializaDatepicker() {
    jQuery('.datepicker').datetimepicker({
      locale: 'pt-BR',
      format: 'L',
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });
  }

  inicializaTimepicker() {
    jQuery('.timepicker').datetimepicker({
      locale: 'pt-BR',
      format: 'LT',
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });
  }

  pesquisarProfissional(profissionalCpf: string) {
    this.loading.emitChange(true);
    this.profissionalService.pesquisarPorCpf(profissionalCpf)
      .subscribe((profissional: Profissional) => {
        this.profissional = profissional;
        if (profissional) {
          if (profissional) {
            this.atendimentoForm.controls?.profissionalCpf.setValue(profissionalCpf);
            this.atendimentoForm.controls?.profissionalNome.setValue(profissional.nome.concat(' ').concat(profissional.sobrenome));
          } else {
            this.showSwal('info', 'Profissional não localizado', false);
          }
        } else {
          this.showSwal('info', 'Profissional não localizado', false);
        }
      },
        (error: Error) => this.showSwal('error', error.message, false),
        () => this.loading.emitChange(false)
      );
  }

  pesquisarCep(cep: string) {
    this.loading.emitChange(true);
    this.viaCep.findViaCep(cep)
      .subscribe(response => {
        if (response.body?.erro) {
          this.showSwal('error', '400-CEP Não localizado!', false);
        } else {
          this.endereco = response.body;
          this.endereco.cep = response.body.cep.replace('-', '');
          this.endereco.cidade = response.body.localidade;
          this.dominioService.getEstados().subscribe(responseEstados => {
            this.endereco.estado = responseEstados.body.filter((value: Estado) => value.uf == response.body.uf)[0];
          }, null, null);
          this.atendimentoForm.controls.endereco.get('cep').setValue(this.endereco.cep);
          this.atendimentoForm.controls.endereco.get('logradouro').setValue(this.endereco.logradouro);
        }
        this.loading.emitChange(false);
      },
        (error: Error) => this.showSwal('error', error.message, false),
        () => this.loading.emitChange(false));
  }

  private showSwal(icon: any, title: string, navegar: boolean) {
    this.loading.emitChange(false);
    Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      showConfirmButton: true,
    }).then(() => {
      this.loading.emitChange(false);
      if (navegar) {
        this.router.navigate([`../`], {
          relativeTo: this.activatedRoute,
          state: {
            pacienteId: this.tratamentoDadosService.tratamentoAberto.paciente.id
          }
        });
      }
    });
  }

  private recorrenciaDefault(): AtendimentoRecorrencia {
    let recorrencia = new AtendimentoRecorrencia();
    recorrencia.diaria = new Diaria(new Date(), new Date(), 1);

    return recorrencia;
  }

  classificaGruposAPartirDaEscolhaDoModelo() {
    let nomeGrupos: Array<string> = Array<string>();
    let grupos: Array<Grupo> = Array<Grupo>();
    this.atendimentoForm.controls.modelos.value.forEach((descricao: string) => {
      this.modelos.filter((modelo: Modelo) => modelo.descricao.toUpperCase() == descricao)
        .map(modelo => {
          modelo.grupos.forEach((grupo: Grupo) => {
            nomeGrupos.push(grupo.descricao.toUpperCase());
            grupos.push(grupo);
          })
        });
    });
    this.atendimentoForm.controls.grupos.patchValue(grupos, { onlySelf: true, emitEvent: true });
    setTimeout(() => {
      jQuery('select[id=\'grupos\']').val(nomeGrupos);
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }

  classificaModelosAPartirDaEscolhaDoGrupo() {
    let nomeModelos: Array<string> = Array<string>();
    let nomeGrupos: Array<string> = Array<string>();
    let modelos: Array<Modelo> = Array<Modelo>();
    let grupos: Array<Grupo> = Array<Grupo>();
    this.atendimentoForm.controls.grupos.value.forEach((descricao: string) => {
      nomeGrupos.push(descricao.toUpperCase());
      grupos.push(this.grupos.filter(grupo => grupo.descricao.toUpperCase() == descricao)[0]);
      this.modelos.forEach((modelo: Modelo) => {
        modelo.grupos.forEach((grupo: Grupo) => {
          if (grupo.descricao.toUpperCase() == descricao) {
            nomeModelos.push(modelo.descricao.toUpperCase());
            modelos.push(modelo);
          }
        })
      });
    });
    this.atendimentoForm.controls.modelos.patchValue(modelos);
    this.atendimentoForm.controls.grupos.patchValue(grupos);
    setTimeout(() => {
      jQuery('select[id=\'modelos\']').val(nomeModelos);
      jQuery('select[id=\'grupos\']').val(nomeGrupos);
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }

}

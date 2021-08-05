import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { EnderecoPaciente } from '../../classes/endereco-paciente.class';
import { EnderecoService } from '../../services/endereco.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  public labelBotaoSubmit: string;
  public linkBotaoVoltar: string;
  public isCadastro = false;
  public onSubmitEvent = new EventEmitter<EnderecoPaciente>();

  constructor(private validService: SharedValidService,
    private loading: SharedLoadingService,
    private enderecoService: EnderecoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.linkBotaoVoltar = '../';
    this.labelBotaoSubmit = 'Alterar';
  }

  onSubmit(enderecoPaciente: EnderecoPaciente) {
    this.loading.emitChange(true);
    this.enderecoService.alterar(enderecoPaciente).subscribe(() => {
      setTimeout(() => {
        this.router.navigateByUrl(`pacientes/${this.validService.getValid().id}/dados`);
        this.loading.emitChange(false);
      });
    },
      () => {
        this.loading.emitChange(false);
        this.message();
      });
  }

  message() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar alterar os dados',
      showConfirmButton: true
    });
  }

}

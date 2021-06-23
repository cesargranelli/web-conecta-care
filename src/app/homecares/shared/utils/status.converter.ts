import { StatusAtendimento } from 'src/app/enums/status-atendimento.enum';
import { StatusColor } from 'src/app/enums/status-color.enum';

export class StatusConverter {

  toColor(status: string): string {
    switch (status) {
      case StatusAtendimento.Agendado:
        return StatusColor.Agendado;
      case StatusAtendimento.Deslocamento:
        return StatusColor.Deslocamento;
      case StatusAtendimento.DeslocamentoAtrasado:
        return StatusColor.DeslocamentoAtrasado;
      case StatusAtendimento.CheckIn:
        return StatusColor.CheckIn;
      case StatusAtendimento.CheckInAtrasado:
        return StatusColor.CheckInAtrasado;
      case StatusAtendimento.CheckInManual:
        return StatusColor.CheckInManual;
      case StatusAtendimento.CheckInManualAtrasado:
        return StatusColor.CheckInManualAtrasado;
      case StatusAtendimento.Atrasado:
        return StatusColor.Atrasado;
      case StatusAtendimento.CheckOut:
        return StatusColor.Checkout;
      case StatusAtendimento.Cancelado:
        return StatusColor.Cancelado;
      default:
        break;
    }
  }

}

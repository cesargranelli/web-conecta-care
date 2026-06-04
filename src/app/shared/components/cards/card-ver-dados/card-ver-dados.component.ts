import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-shared-card-ver-dados',
  templateUrl: './card-ver-dados.component.html',
  styleUrls: ['./card-ver-dados.component.css']
})
export class CardVerDadosComponent {
  @Input() icon: string;
  @Input() link: string;
  @Input() value: string;
  @Input() stats: string;
}

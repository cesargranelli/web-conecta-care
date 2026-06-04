import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe],
  selector: 'app-planos-saude-filial',
  templateUrl: './planos-saude-filial.component.html',
  styleUrls: ['./planos-saude-filial.component.css']
})
export class PlanosSaudeFilialComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}


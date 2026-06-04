import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe],
  selector: 'app-planos-saude',
  templateUrl: './planos-saude.component.html',
  styleUrls: ['./planos-saude.component.css']
})
export class PlanosSaudeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}


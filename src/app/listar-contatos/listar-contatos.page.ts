import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importar o HttpClientModule
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonButtons, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.page.html',
  styleUrls: ['./listar-contatos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonButtons,
    IonButton,
    IonFab,
    IonFabButton
  ]
})
export class ListarContatosPage implements OnInit {
  users: { name: string; email: string }[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUserDetails().subscribe(data => {
      this.users = data;
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline, mailOutline } from 'ionicons/icons';
import { FirebaseService } from '../service/firebase.service';

interface Contato {
  id?: string;
  nome: string;
  email?: string;
}

@Component({
  selector: 'app-listar-contatos-firebase',
  templateUrl: './listar-contatos-firebase.page.html',
  styleUrls: ['./listar-contatos-firebase.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    CommonModule
  ]
})
export class ListarContatosFirebasePage implements OnInit {
  contatos: Contato[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ addOutline, trashOutline, mailOutline });
  }

  ngOnInit() {
    this.carregarContatos();
  }

  ionViewWillEnter() {
    this.carregarContatos();
  }

  carregarContatos() {
    this.firebaseService.getCollection('contatos').subscribe({
      next: (data) => {
        this.contatos = data;
      },
      error: (error) => {
        console.error('Erro ao carregar contatos:', error);
        this.mostrarToast('Erro ao carregar contatos', 'danger');
      }
    });
  }

  adicionarContato() {
    this.router.navigate(['/adicionar-contato']);
  }

  async mostrarToast(mensagem: string, cor: string = 'success') {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor,
      position: 'top'
    });
    await toast.present();
  }
}

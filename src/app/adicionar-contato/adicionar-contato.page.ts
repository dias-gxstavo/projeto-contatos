import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, refreshOutline } from 'ionicons/icons';
import { FirebaseService } from '../service/firebase.service';

interface Contato {
  nome: string;
  email?: string;
}

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.page.html',
  styleUrls: ['./adicionar-contato.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule
  ]
})
export class AdicionarContatoPage implements OnInit {
  contato: Contato = {
    nome: '',
    email: '',
  };

  salvando = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ saveOutline, refreshOutline });
  }

  ngOnInit() {
    // Inicialização se necessário
  }

  async salvarContato() {
    if (!this.contato.nome) {
      await this.mostrarAlerta('Campos obrigatórios', 'Por favor, preencha corretamente.');
      return;
    }

    this.salvando = true;

    try {

      await this.firebaseService.addDocument('contatos', this.contato);

      await this.mostrarToast('Contato salvo com sucesso!', 'success');

      this.limparFormulario();

      this.router.navigate(['/listar-contatos-firebase']);
    } catch (error) {
      console.error('Erro ao salvar contato:', error);
      await this.mostrarAlerta('Erro', 'Não foi possível salvar o contato. Tente novamente.');
    } finally {
      this.salvando = false;
    }
  }

  limparFormulario() {
    this.contato = {
      nome: '',
      email: '',
    };
  }

  async mostrarAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
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
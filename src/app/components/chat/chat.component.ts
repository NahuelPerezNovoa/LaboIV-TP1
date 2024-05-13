import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/Message';
import { addDoc, collection, collectionData, Firestore } from  '@angular/fire/firestore';
import { Timestamp, orderBy, query } from 'firebase/firestore';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
 
  public chat: Message[] = [];
  newMessage: string = '';
  @Input() user: string = 'Usuario';
  dateOptions : Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  constructor(private firestore: Firestore){}

  ngOnInit(): void {
    this.getData();
  }

  sendMessage() {
    const message: Message = {
      text: this.newMessage,
      user: this.user,
      timestamp: Timestamp.fromDate(new Date)
    };
    let col = collection(this.firestore, 'chat');
    addDoc(col, message)
    this.newMessage = '';
  }

  getData(){
    let col = collection(this.firestore, 'chat');
      
      const orderQuery = query(col,orderBy('timestamp','asc'));

      const observable = collectionData(orderQuery);
  
      observable.subscribe((respuesta:any) => {

        this.chat = respuesta;
        console.log(respuesta);
      })
  }

  getLocaleString(date: Timestamp){
    return new Date(date.seconds*1000).toLocaleString('es-AR', this.dateOptions);
  }
}


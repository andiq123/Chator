import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { InputField } from 'src/app/shared/models/input-field.interface';
import { User } from 'src/app/shared/models/user.interface';
import { Message } from '../../models/message.interface';

@Component({
  selector: 'app-talk-section',
  templateUrl: './talk-section.component.html',
  styleUrls: ['./talk-section.component.scss'],
})
export class TalkSectionComponent implements OnInit {
  @Input() otherUser!: User;
  @Input() user!: User;
  fields!: InputField[];
  messages: Message[] = [];
  constructor() {}

  ngOnInit(): void {
    this.generateFields();
    this.generateMessages();
  }

  generateMessages() {
    this.messages = [
      {
        sender: this.user,
        reciever: this.otherUser,
        sent: new Date().toString(),
        message: 'salut frate',
      },
      {
        sender: this.otherUser,
        reciever: this.user,
        sent: new Date().toString(),
        message: 'salut salut!',
      },
    ];
  }

  generateFields() {
    this.fields = [
      {
        name: 'message',
        type: 'textarea',
        label: 'Message',
        value: '',
        placeholder: 'Type your message here',
        validators: [Validators.required],
      },
    ];
  }

  onSubmitForm(values: any) {
    const { message } = values;
    console.log(message);
  }
}

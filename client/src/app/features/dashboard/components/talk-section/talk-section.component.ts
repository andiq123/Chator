import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { InputField } from 'src/app/shared/models/input-field.interface';
import { User } from 'src/app/shared/models/user.interface';
import { messageToAddDto } from '../../Dtos/messageToAdd.interface';
import { Message } from '../../models/message.interface';
import { MessagesService } from '../../services/messages.service';

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
  constructor(private messageService: MessagesService) {}

  ngOnInit(): void {
    this.generateFields();
    this.loadMessages();
  }

  loadMessages() {
    this.messageService
      .getMessages(this.otherUser.id)
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      });
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
    const messageToAddDto: messageToAddDto = {
      text: message,
      recieverId: this.otherUser.id,
    };
    console.log(messageToAddDto);

    this.messageService
      .createMessage(messageToAddDto)
      .subscribe((message: Message) => {
        console.log(message);
      });
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/models/user.interface';
import { Message } from '../../models/message.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() user!: User;
  @Input() otherUser!: User;
  @Input() message!: Message;
  @Input() isSender: boolean = false;
  @Output() onDeleteMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  deleteMessage() {
    this.onDeleteMessage.emit(this.message.id);
  }
}

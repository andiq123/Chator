import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { InputField } from 'src/app/shared/models/input-field.interface';
import { User } from 'src/app/shared/models/user.interface';
import { MessageToAddDto } from '../../Dtos/messageToAdd.interface';
import { Message } from '../../models/message.interface';

@Component({
  selector: 'app-talk-section',
  templateUrl: './talk-section.component.html',
  styleUrls: ['./talk-section.component.scss'],
})
export class TalkSectionComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() otherUser!: User;
  @Input() user!: User;
  @Input() messages: Message[] = [];
  @Output() onMessageSent = new EventEmitter<MessageToAddDto>();
  @ViewChild('messageShower') messageContainer!: ElementRef;
  @Output() onDeleteMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEditMessage: EventEmitter<Message> = new EventEmitter<Message>();
  message: string = '';
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.messageContainer) return;
    this.scrollToBottom();
  }

  ngOnInit(): void {}

  onSubmitForm() {
    if (!this.message) return;
    const messageToAddDto: MessageToAddDto = {
      text: this.message,
      recieverId: this.otherUser.id,
    };
    this.onMessageSent.emit(messageToAddDto);
    this.message = '';
  }

  deleteMessage(id: string) {
    this.onDeleteMessage.emit(id);
  }

  editMessage(message: Message) {
    this.onEditMessage.next(message);
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout((): void => {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    }, 10);
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}
}

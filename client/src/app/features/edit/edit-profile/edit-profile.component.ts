import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LogginPersisterService } from 'src/app/core/services/loggin-persister.service';
import { InputField } from 'src/app/shared/models/input-field.interface';
import { User } from 'src/app/shared/models/user.interface';
import { UserToUpdateDto } from '../../dashboard/Dtos/userToUpdateDto.interface';
import { UsersService } from '../../dashboard/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public LoggedUser?: User;
  fields: InputField[] = [];
  constructor(
    private logginPersiter: LogginPersisterService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.logginPersiter.LoggedUser.subscribe((user: User | null) => {
      if (!user) return;
      this.LoggedUser = user;
      this.generateFields();
    });
  }

  generateFields() {
    if (!this.LoggedUser) return;
    this.fields.push({
      type: 'text',
      label: 'Username',
      name: 'username',
      value: this.LoggedUser.userName,
      placeholder: 'Enter your username',
      minLength: 3,
      maxLength: 10,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ],
    });
    this.fields.push({
      type: 'text',
      label: 'Description',
      name: 'description',
      value: this.LoggedUser.description,
      placeholder: 'Enter your description',
      minLength: 3,
      maxLength: 100,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
    });
  }

  onSubmit(values: any) {
    if (!this.LoggedUser) return;
    const { username, description } = values;
    const userToUpdate: UserToUpdateDto = {
      username,
      description,
    };
    this.usersService
      .updateUser(this.LoggedUser.id, userToUpdate)
      .subscribe((user: User) => {
        this.logginPersiter.setLoggedUser(user);
      });
  }
}

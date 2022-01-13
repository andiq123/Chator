import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { LogginPersisterService } from 'src/app/core/services/loggin-persister.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
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
  LoggedUser?: User;
  formGroup!: FormGroup;

  constructor(
    private logginPersiter: LogginPersisterService,
    private usersService: UsersService,
    private fb: FormBuilder,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.logginPersiter.LoggedUser$.subscribe((user: User | null) => {
      if (!user) return;
      this.LoggedUser = user;
      this.createForm();
    });
  }

  createForm() {
    // create the form to edit the user using form builder
    this.formGroup = this.fb.group({
      username: [
        this.LoggedUser.userName,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      description: [this.LoggedUser.description, Validators.required],
    });
  }

  photoFile?: object;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    return this.usersService.photoTest(file).subscribe({
      next: (user: User) => {
        this.logginPersiter.setLoggedUser(user);
        this.snackBar.success('Profile image updated successfully');
      },
      error: (e) => {
        this.snackBar.error(e.error.message);
      },
    });
  }

  onSubmit() {
    if (!this.LoggedUser) return;
    const { username, description } = this.formGroup.value;
    const userToUpdate: UserToUpdateDto = {
      username,
      description,
    };
    this.snackBar.info("Updating user's profile...");
    this.usersService.updateUser(this.LoggedUser.id, userToUpdate).subscribe({
      next: (user: User) => {
        this.logginPersiter.setLoggedUser(user);
        this.snackBar.success('Profile updated successfully');
      },
      error: (e) => {
        this.snackBar.error(e.error.message);
      },
    });
  }
}

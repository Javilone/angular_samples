import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MemberEntity } from '../../model';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit, OnChanges {
  @Input()
  member!: MemberEntity;

  @Output()
  updatedMemberEvent: EventEmitter<MemberEntity> = new EventEmitter();

  editForm!: FormGroup;
  idControl!: FormControl;
  loginControl!: FormControl;
  avatarControl!: FormControl;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createEditForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['member'].currentValue) {
      this.editForm.patchValue(this.member);
    }
  }

  // Creo las validaciones para los diferentes controles del formulario
  private createEditForm() {
    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      login: ['', [Validators.required, Validators.minLength(6)]],
      avatar_url: '',
    });

    this.idControl = this.editForm.get('id') as FormControl;
    this.loginControl = this.editForm.get('login') as FormControl;
    this.avatarControl = this.editForm.get('avatar_url') as FormControl;
  }

  handleFileInput($event: any) {
    const files = $event.target.files as FileList;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.avatarControl.setValue(reader.result);
    };
  }

  save() {
    if (this.editForm.valid) {
      const member = this.editForm.value;
      this.updatedMemberEvent.emit(member);
    }
  }
}

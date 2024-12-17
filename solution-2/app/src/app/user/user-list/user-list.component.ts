import { Component, inject, OnInit } from '@angular/core';
import { MemberEntity } from '../../model';
import { NgFor, NgIf } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight.directive';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms'; // FormBuilder es un servicio y hay que especificar a Angular que lo inyecte (inject)
import { SearchByLoginPipe } from '../../pipes/search-by-login.pipe';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgFor,
    HighlightDirective,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    SearchByLoginPipe,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  members: MemberEntity[] = [];
  newMember!: MemberEntity;

  memberSelected!: MemberEntity;

  editForm!: FormGroup;
  idControl!: FormControl;
  loginControl!: FormControl;
  avatarControl!: FormControl;

  constructor(
    private memberService: MembersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.memberService
      .getAll()
      .subscribe((members) => (this.members = members));
    this.newMember = this.newDefaultMember();

    this.createEditForm();
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

  add(): void {
    this.members.push(this.newMember);
    this.newMember = this.newDefaultMember();
  }

  private newDefaultMember() {
    return {
      id: '',
      login: '',
      avatar_url: '',
    };
  }

  handleFileChange($event: any) {
    const files = $event.target.files as FileList;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.newMember.avatar_url = reader.result as string;
    };
  }

  select(member: MemberEntity): void {
    this.memberSelected = { ...member }; // Trabaja por referencia
    this.editForm.patchValue(this.memberSelected); //Esto actualizará solo los datos que le entren
  }
}

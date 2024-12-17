import { Component, inject, OnInit } from '@angular/core';
import { MemberEntity } from '../../model';
import { NgFor, NgIf } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight.directive';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms'; // FormBuilder es un servicio y hay que especificar a Angular que lo inyecte (inject)
import { SearchByLoginPipe } from '../../pipes/search-by-login.pipe';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-user-list',
  standalone: true, // Esto lo agregué yo manualmente
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

  constructor(private memberService: MembersService, private fb: FormBuilder) {}
  // private memberService: MembersService = inject(MembersService); // Esta línea y la anterior son análogas

  ngOnInit(): void {
    // this.memberService.getAll().then((members) => (this.members = members));
    /*     fetch('https://api.github.com/orgs/lemoncode/members')
      .then((r) => r.json())
      .then((r) => console.log('fetch', r)); */
    this.memberService
      .getAll()
      .subscribe((members) => (this.members = members));
    this.newMember = this.newDefaultMember();
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
}

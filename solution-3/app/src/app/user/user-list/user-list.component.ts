import { Component, inject, OnInit } from '@angular/core';
import { MemberEntity } from '../../model';
import { NgFor, NgIf } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight.directive';
import { FormsModule } from '@angular/forms'; // FormBuilder es un servicio y hay que especificar a Angular que lo inyecte (inject)
import { SearchByLoginPipe } from '../../pipes/search-by-login.pipe';
import { MembersService } from '../../services/members.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgFor,
    HighlightDirective,
    FormsModule,
    NgIf,
    SearchByLoginPipe,
    UserEditComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  members: MemberEntity[] = [];
  newMember!: MemberEntity;

  memberSelected!: MemberEntity;

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
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

  select(member: MemberEntity): void {
    this.memberSelected = { ...member }; // Trabaja por referencia
    // this.editForm.patchValue(this.memberSelected); //Esto actualizará solo los datos que le entren
  }

  updatedMember($event: MemberEntity): void {
    this.members = this.members.map((member) => {
      if (member.id === $event.id) {
        return $event;
      }
      return member;
    });
  }
}

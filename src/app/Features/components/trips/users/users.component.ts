import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    SidebarComponent,
    TagModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string = '';
  selectedUser: any = null;
  showDetails = false;

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    // بيانات static مؤقتة
    this.users = [
      {
        _id: '1',
        firstName: 'Ahmed',
        lastName: 'Ali',
        email: 'ahmed@example.com',
        role: 'Admin',
        isActive: true,
        phone: '123456789',
      },
      {
        _id: '2',
        firstName: 'Sara',
        lastName: 'Mohamed',
        email: 'sara@example.com',
        role: 'User',
        isActive: false,
        phone: '123456789',

      },
      {
        _id: '3',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'User',
        isActive: true,
        phone: '123456789',
      },
    ];
    this.filteredUsers = [...this.users];
  }
  selectedRole: string | null = null;

  filterUsers() {
    const searchLower = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  }

  viewUser(user: any) {
    this.selectedUser = user;
    this.showDetails = true;
  }

  editUser(id: string) {
    console.log('Edit user:', id);
  }

  deleteUser(id: string) {
    this.filteredUsers = this.filteredUsers.filter((u) => u._id !== id);
  }
}

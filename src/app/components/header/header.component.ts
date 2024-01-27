import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {Person} from "../../interface/person";
import {PersonService} from "../../service/person.service";
import {AuthService} from "../../service/auth.service";
import {StorageService} from "../../service/storage.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, NgIf, RouterLink, MatMenuTrigger, MatMenu, MatMenuItem],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLogged: Boolean = false;
  person?: Person;


  constructor(private personService: PersonService,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.personService.getCurrentPerson()
      .subscribe({
        next: (data) => {
          this.person = data;
          this.isLogged = true;
        },
        error: () => {
          setTimeout(() => { location.reload() }, 1000);
          this.isLogged = false
        }
      })
  }

  logout() {
    this.storageService.logOut();
  }
}

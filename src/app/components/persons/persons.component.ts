import {Component, OnInit} from '@angular/core';
import {Person} from "../../interface/person";
import {PersonService} from "../../service/person.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [
    NgIf,
    MatLabel,
    NgForOf
  ],
  templateUrl: './persons.component.html',
  styleUrl: './person.component.css'
})
export class PersonsComponent implements OnInit{
 person?: Person;


  constructor(private personService: PersonService) {
  }

  ngOnInit(): void {
    this.personService.getCurrentPerson()
      .subscribe({
        next: (data) => this.person = data,
        error: () => setTimeout(() => { location.reload() }, 1000)
      })
  }
}

import { Component } from '@angular/core';
import { StudentgradinglistsComponent } from "../../pages/studentgradinglists/studentgradinglists.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StudentgradinglistsComponent],
  template: `
   <app-studentgradinglists></app-studentgradinglists>
  `,
  styles: ``
})
export class HomeComponent {

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened = false;

  constructor(private _router: Router) { }

  public toggleMenu(): void {
    this.opened = !this.opened;
  }

  public navigateTo(destination: string): void {
    this._router.navigate([destination]);
    this.opened = false;
  }
}

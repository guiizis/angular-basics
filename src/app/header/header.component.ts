import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private userSubs: Subscription
  isAuthenticate = false

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubs = this.authService.user.subscribe(user => {
      this.isAuthenticate = !user ? false : true
    })
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe()
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

}

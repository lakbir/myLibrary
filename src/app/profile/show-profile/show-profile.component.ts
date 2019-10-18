import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {User2} from '../../models/user2.model';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {

  userCurrent: User;
  user: User2;

  constructor(private userService: AuthService) { }

  ngOnInit() {
    this.userCurrent = this.userService.getCurrentUser();

  }

}

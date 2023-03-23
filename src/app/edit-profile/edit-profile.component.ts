import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  id!: number

  constructor(
    private authSrv: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  onSubmit(f: NgForm) {
    const bio = f.value.bio;
    const imgUrl = f.value.imgUrl
    this.authSrv.updateProfile(this.id, { bio: bio, imgUrl: imgUrl }).subscribe(data => console.log(data));
    this.router.navigate(['/profile/', this.id])
  }

}

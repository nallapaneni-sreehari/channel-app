import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { GlobalDataService } from 'src/shared/services/global/global-data.service';
import { UserService } from 'src/shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginValid = true;
  public username = '';
  public password = '';
  public checked = '';
  public passwordHide = true;

  public loginResponse =
    {
      loginLoading: false,
      loginErrors: ''
    };

  constructor
    (
      private _route: ActivatedRoute, private router: Router,
      private userService: UserService, private toastEvokeService: ToastEvokeService,
      private globalDataService: GlobalDataService
    ) { }


  public ngOnInit(): void {

    // var user = {};
    var user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(`User ::: `, user, user?.userToken);



    if (Object.keys(user)?.length > 0) {
      if (user?.userToken && user?.currentUser && user?.loginVerified) {
        console.log('Already Logged in as :: ', user?.currentUser);
        this.router.navigate(['/home']);
      }
    }
  }


  public onSubmit(form: any): void {

    this.loginResponse.loginErrors = '';

    this.loginValid = true;

    this.loginResponse.loginLoading = true;

    var { username, password, checked } = form?.form.value;

    this.userService.login({ email: username, password: password }).subscribe(data => {
      console.log("Login data response ::: ", data);
      if (data && data?.data?.length && data?.data[0]?.token) {
        console.log("Login Success");

        this.globalDataService.loginVerified = true;
        this.globalDataService.userToken = data?.data[0]?.token;
        this.globalDataService.currentUser = username;
        this.globalDataService.name = data?.data[0]?.name;
        this.globalDataService.userId = data?.data[0]?._id,
        this.globalDataService.profile = data?.data[0]?.profile,

        localStorage.clear();

        let store =
        {
          userId: data?.data[0]?._id,
          loginVerified: true,
          userToken: data?.data[0]?.token,
          currentUser: username,
          name: data?.data[0]?.name,
          profile: data?.data[0]?.profile
        }

        localStorage.setItem('user', JSON.stringify(store));

        
        setTimeout(() => {
          this.loginResponse.loginLoading = false;

          this.loginSuccessToast();
          
          this.router.navigate(['/home']);

        }, 3000);

      }
      else {
        this.loginResponse.loginLoading = false;
        this.loginResponse.loginErrors = data?.error_msg;
      }
    },
      err => {
        console.log(`Login Err response :: `, err);
        this.loginResponse.loginErrors = err.erros.message;
        this.loginResponse.loginLoading = false;
    });


    console.log("Form:: ", username, password, checked);
  }





  loginSuccessToast() {
    this.toastEvokeService.success('Login Successfull 👋', `You're now Logged in as ${this.globalDataService.name}`).subscribe();
  }




  public ngOnDestroy(): void {

  }

}
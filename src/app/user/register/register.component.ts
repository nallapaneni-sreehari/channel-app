import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { mobileCountryCodes } from 'src/shared/data/countries-data';
import { UserService } from 'src/shared/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public loginValid = true;
  public fullname = '' ;
  public username = '';
  public password = '';
  public gender = '';
  public checked = true;
  public mobileNumber = '';
  public mobilecode = '';
  public passwordHide = true;

  public registerLoading = false;

  public registerErrors:any = '';

  public mobilecodes = mobileCountryCodes;

  public mobilecodesBackup = this.mobilecodes;

  constructor(private userService: UserService, private router:Router, private toastEvokeService: ToastEvokeService){}

  public ngOnInit(): void {

  }


  public onSubmit(form:any): void {
    this.registerLoading = true;

    this.loginValid = true;

    console.log(`Form ::: `, form);
    
    let user =
    {
      name: form.value.fullname,
      email: form.value.username,
      password: form.value.password,
      mobile: form.value.mobileNumber,
      countryCode: form.value.mobilecode.dial_code,
      country: form.value.mobilecode.name,
      acceptTerms: form.value.checked
    };

    if(Object.values(user)?.length > 0)
    {
      this.userService.register(user).subscribe(data=>{
        console.log(`Registered :: `, data?.length, data, data?.data[0]?.id);

        if(data && data?.data?.length > 0 && data?.data[0]?.id)
        {
          console.log(`Am Logged in`);
          
          setTimeout(()=>{
            this.registerLoading = false;

            this.registerToast();
            setTimeout(()=>{
              this.router.navigate(['/login']);
            }, 5000);

          }, 2000);

        }
        else
        {
          this.registerLoading = false;
          this.registerErrors = data?.error_msg;
        }

      },
      err=>{
        console.log(`Regester Err :: `, err);
        this.registerLoading = false;
        this.registerErrors = err.error.message;
      })
    }

    console.log("Form:: ",user);
  }

  onCountryCodeSearch(key:any)
  {
    key = key?.toLowerCase();
    console.log(`Key::: `, key, typeof key);
    if(key == " " || key == undefined || key == "")
    {
      this.mobilecodesBackup = this.mobilecodes;
    }
    else
    {
      var newArray = [];

      for(let code of this.mobilecodes)
      {
        if(code.name.toLowerCase().includes(key))
        { 
          newArray.push(code);
        }
      }
      this.mobilecodesBackup = newArray;
    }
  }

  registerToast()
  {
    this.toastEvokeService.info('Registration Successfull 👋', 'You will now be redirected to login page').subscribe();
  }

}
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
@Injectable({
    providedIn:'root'
})
export class Guardservice implements CanActivate{

    constructor(private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.isLoggedIn()) { // determine if the user is logged in from this method.
            return true;
        }
        alert('You are not allowed to view this page. You are redirected to login Page');
        this.router.navigate(['/login']);
        return false;
    }
    isLoggedIn():boolean
    {
        let user= localStorage.getItem("token");
        if (user == null)
            return false;
        return true;

    }

}

import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

  public saveLoginInfo = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => {
          localStorage.setItem("user", JSON.stringify(action.user));
        })
      ),
    { dispatch: false }
  );

  public clearLoginInfo = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap((action) => {
          localStorage.removeItem("user");
          this.router.navigateByUrl("/login");
        })
      ),
    { dispatch: false }
  );
}

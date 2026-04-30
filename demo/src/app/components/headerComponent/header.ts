import { Component, computed, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth";

@Component({
    selector: "app-header",
    templateUrl: "./header.html",
    styleUrls: ["./header.css"],
    imports: [RouterLink]
})
export class header{ // implements OnInit {
    authService = inject(AuthService);
    router = inject(Router);

    displayName = computed(() => {
        const user = this.authService.currentUser();
        if (!user) {
            return "";
        }

        return user.username?.trim() || user.email;
    });

    logout(): void {
        this.authService.logout();
        this.router.navigate(["/login"]);
    }

    //  counter: number = 0;
    // ngOnInit(): void {
    //     setInterval(() => {
    //         this.counter++;
    //     }, 1000);
    // }

}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, InputComponent } from '@front-lucca-test/storybook/nova';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStateModule, injectAuthFeature } from '@front-lucca-test/states/auth';

@Component({
	selector: 'front-lucca-test-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent, AuthStateModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	readonly authFeature = injectAuthFeature();

	public emailControl: FormControl = new FormControl('', Validators.required);
	public passwordControl: FormControl = new FormControl('', Validators.required);

	public form: FormGroup = new FormGroup({
		email: this.emailControl,
		password: this.passwordControl,
	});

	public onSubmit(): void {
		// todo check if empty
		this.authFeature.signIn({ email: this.form.controls?.['email'].value, password: this.form.controls?.['password'].value });
	}

	public onSubmitLogout(): void {
		this.authFeature.signOut();
	}
}

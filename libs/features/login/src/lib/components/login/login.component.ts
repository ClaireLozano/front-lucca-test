import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, InputComponent } from '@front-lucca-test/storybook/nova';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'front-lucca-test-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	public emailControl: FormControl = new FormControl('', Validators.required);
	public passwordControl: FormControl = new FormControl('', Validators.required);

	public form: FormGroup = new FormGroup({
		email: this.emailControl,
		password: this.passwordControl,
	});

	public onSubmit(): void {
		throw new Error('Method not implemented.');
	}
}

import { moduleMetadata, type Meta, type StoryFn } from '@storybook/angular';
import { InputComponent } from './input.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

export default {
	title: 'InputComponent',
	component: InputComponent,
	decorators: [
		moduleMetadata({
			imports: [ReactiveFormsModule],
		}),
	],
	argTypes: {
		type: {
			options: ['text', 'number', 'date'],
			control: { type: 'radio' },
		},
		control: { table: { disable: true } },
	},
} as Meta;

const Template: StoryFn<InputComponent> = (args: InputComponent) => ({
	component: InputComponent,
	props: args,
});

export const Default = Template.bind({});
Default.args = {
	control: new FormControl(''),
	label: 'Label',
	type: 'text',
	name: 'name',
	isRequired: false,
};

export const WithValue = Template.bind({});
WithValue.args = {
	...Default.args,
	control: new FormControl('value'),
};

export const Required = Template.bind({});
Required.args = {
	...Default.args,
	isRequired: true,
	control: new FormControl(''),
};

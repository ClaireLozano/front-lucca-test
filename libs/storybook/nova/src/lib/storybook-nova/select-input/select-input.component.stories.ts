import { moduleMetadata, type Meta, type StoryFn } from '@storybook/angular';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SelectInputComponent } from './select-input.component';

export default {
	title: 'SelectInputComponent',
	component: SelectInputComponent,
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
		options: { table: { disable: true } },
	},
} as Meta;

const Template: StoryFn<SelectInputComponent> = (args: SelectInputComponent) => ({
	component: SelectInputComponent,
	props: args,
});

export const Default = Template.bind({});
Default.args = {
	control: new FormControl(''),
	label: 'Label',
	isRequired: false,
	isDisabled: false,
	options: [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' },
	],
};

export const WithValue = Template.bind({});
WithValue.args = {
	...Default.args,
	control: new FormControl('option1'),
};

export const Required = Template.bind({});
Required.args = {
	...Default.args,
	isRequired: true,
	control: new FormControl(''),
};

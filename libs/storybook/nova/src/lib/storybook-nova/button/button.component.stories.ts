import type { StoryFn } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
	component: ButtonComponent,
	title: 'ButtonComponent',
	argTypes: {
		type: {
			options: ['button', 'submit'],
			control: { type: 'radio' },
		},
	},
};

const Template: StoryFn<ButtonComponent> = (args: ButtonComponent) => ({
	component: ButtonComponent,
	props: args,
});

export const Default = Template.bind({});
Default.args = {
	label: 'label',
	type: 'button',
	pressed: false,
};

export const PressedButton = Template.bind({});
PressedButton.args = {
	...Default.args,
	pressed: true,
};

export const SubmitButton = Template.bind({});
SubmitButton.args = {
	...Default.args,
	type: 'submit',
};

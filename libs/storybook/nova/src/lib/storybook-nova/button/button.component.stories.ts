import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
	component: ButtonComponent,
	title: 'ButtonComponent',
	argTypes: {
		type: {
			options: ['button', 'submit'],
			control: { type: 'radio' },
		},
	},
};
export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
	args: {
		label: 'Button',
		type: 'button',
	},
};

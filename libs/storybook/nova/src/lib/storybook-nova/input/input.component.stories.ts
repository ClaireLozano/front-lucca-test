import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
	component: InputComponent,
	title: 'InputComponent',
	argTypes: {
		type: {
			options: ['text', 'number', 'date'],
			control: { type: 'radio' },
		},
	},
};
export default meta;
type Story = StoryObj<InputComponent>;

export const Primary: Story = {
	args: {
		type: 'text',
		label: 'Label',
		isRequired: false,
	},
};

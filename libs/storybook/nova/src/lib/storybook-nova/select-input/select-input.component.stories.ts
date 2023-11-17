import type { Meta, StoryObj } from '@storybook/angular';
import { SelectInputComponent } from './select-input.component';

const meta: Meta<SelectInputComponent> = {
	component: SelectInputComponent,
	title: 'SelectInputComponent',
};
export default meta;
type Story = StoryObj<SelectInputComponent>;

export const Primary: Story = {
	args: {
		label: 'Label',
		isRequired: false,
		isDisabled: false,
	},
};

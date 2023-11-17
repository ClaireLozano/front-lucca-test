import type { Meta, StoryObj } from '@storybook/angular';
import { TextAreaComponent } from './textarea.component';

const meta: Meta<TextAreaComponent> = {
	component: TextAreaComponent,
	title: 'TextAreaComponent',
};
export default meta;
type Story = StoryObj<TextAreaComponent>;

export const Primary: Story = {
	args: {
		label: 'Label',
		isRequired: false,
	},
};

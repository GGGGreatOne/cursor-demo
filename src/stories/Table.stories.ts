import { StoryObj } from '@storybook/react'
import Table from '../components/Table'

const meta = {
  title: 'Table',
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  }
  // args: {
  //   fontSize: '22px',
  //   header: ['just a test', 'test'],
  //   rows: [
  //     ['15', '16', '17'],
  //     ['18', '19', '20']
  //   ]
  // }
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    header: ['just a test', 'test'],
    rows: [
      ['15', '16', '17'],
      ['18', '19', '20']
    ]
  }
}

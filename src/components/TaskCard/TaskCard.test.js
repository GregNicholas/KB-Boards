import {render, screen} from '@testing-library/react'
import TaskCard from './TaskCard'

test('on initial render, forward button appears', () => {
    render(<TaskCard />);

    screen.debug()
})
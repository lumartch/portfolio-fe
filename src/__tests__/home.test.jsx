import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';
// import mockRouter from 'next-router-mock';
jest.mock('next/router', () => require('next-router-mock'));


describe('Home page', () => {
  
  it("Should render developer's name", () => {
    render(<Home name="Luis Martínez"/>);

    const heading = screen.getByRole('heading', {
      name: /Luis Martínez/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("Should render developer's summary", () => {
    render(<Home summary="Hello World"/>);

    const heading = screen.getByText("Hello World");

    expect(heading).toBeInTheDocument();
  });
});
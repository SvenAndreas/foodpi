import "@testing-library/jest-dom"
import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux"
import store from "./redux/store/index"
import {BrowserRouter} from "react-router-dom"



describe("Landing page",()=>{
  
  beforeEach(()=>{
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
       </BrowserRouter>
      </Provider> );
  })

  it('Render text "Food App" in landing page', () => {
    const linkElement = screen.getByText("Food App");
    expect(linkElement).toBeInTheDocument();
  });
  
  it("Should render one <Link to='/home'",()=>{
    const link = document.querySelector("a[href='/home']")
    expect(!link).toBeFalsy()
  })

})



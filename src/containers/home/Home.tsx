import * as React from "react"


import EntryType from "../../components/entry_type/EntryType"
import HomeController from "./HomeController"


export default class Home extends HomeController{



  /**
   * The render is responsible  by render the html
   * is native method from react
   * @see {https://reactjs.org/docs/render-props.html}
   * @returns {JSX.Element}
   * @memberof Home
   */
  public render() : JSX.Element{
    return(
      <div>
        <h1>Hola Home</h1>
        <EntryType />
      </div>
    )
  }
}
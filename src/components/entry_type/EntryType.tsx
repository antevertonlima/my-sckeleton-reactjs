import * as React from "react"

import EntryTypeController from "./EntryTypeController"


export default class EntryType extends EntryTypeController{


  /**
   *
   * @returns {JSX.Element}
   * @memberof EntryType
   */
  public render() : JSX.Element{
    return(
      <div>
        <input type="text"/>
      </div>
    )
  }
} 
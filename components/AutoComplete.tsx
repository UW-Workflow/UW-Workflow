import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function AutoComplete(props) {
  const items = props.items
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    if (props.handleOnSearch){
      return props.handleOnSearch(string,results)
    }
  }

  const handleOnHover = (result) => {
    // the item hovered
    if (props.handleOnHover){
      return props.handleOnHover(result)
    }
  }

  const handleOnSelect = (item) => {
    // the item selected
    if(props.handleOnSelect){
      return props.handleOnSelect(item)
    }
  }

  const handleOnFocus = () => {
    if(props.handleOnFocus){
      return props.handleOnFocus()
    }
  }

  const formatResult = (item) => {
    if(props.formatResult){
      return props.formatResult(item)
    }
    return item;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  )
}

export default AutoComplete